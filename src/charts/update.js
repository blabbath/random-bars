import * as d3 from "d3";

export default {
  update: function () {
    this.axis.x.scale.domain(this.entries);
    this.axis.y.scale.domain([0, 10]);

    this.axis.x.axis
      .transition()
      .duration(this.duration)
      .call(this.axis.x.axisCall)
      .selectAll("text")
      .style("font-size", "16px");

    this.axis.y.axis
      .transition()
      .duration(this.duration)
      .call(this.axis.y.axisCall.ticks())
      .selectAll("text")
      .style("font-size", "16px");

    this.barChart = this.g
      .selectAll("g.bars")
      .selectAll("rect")
      .data(this.randomData);

    this.barChart.join(
      (enter) =>
        enter
          .append("rect")
          .attr("fill", "#f58634")
          .attr("x", (d) => this.axis.x.scale(d.name))
          .attr("width", this.axis.x.scale.bandwidth())
          .attr("y", () => this.axis.y.scale(0))
          .attr("height", 0)
          .call((enter) =>
            enter
              .transition()
              .duration(this.duration)
              .delay(this.duration)
              .ease(d3.easePolyOut)
              .attr("y", (d) => this.axis.y.scale(d.value))
              .attr(
                "height",
                (d) => this.axis.y.scale(0) - this.axis.y.scale(d.value)
              )
          ),
      (update) =>
        update.call((update) =>
          update
            .transition()
            .duration(this.duration)
            .ease(d3.easePolyInOut.exponent(4))
            .attr("x", (d) => this.axis.x.scale(d.name))
            .attr("width", this.axis.x.scale.bandwidth())
            .attr("y", (d) => this.axis.y.scale(d.value))
            .attr(
              "height",
              (d) => this.axis.y.scale(0) - this.axis.y.scale(d.value)
            )
        ),
      (exit) =>
        exit
          .transition()
          .duration(this.duration / 3.33)
          .ease(d3.easePolyInOut.exponent(4))
          .attr("y", () => this.axis.y.scale(0))
          .attr("height", 0)
          .remove()
    );

    this.barLabels = this.g
      .selectAll("g.bar-labels")
      .selectAll("text")
      .data(this.randomData);

    this.barLabels.join(
      (enter) =>
        enter
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", -10)
          .attr(
            "x",
            (d) => this.axis.x.scale(d.name) + this.axis.x.scale.bandwidth() / 2
          )
          .attr("y", () => this.axis.y.scale(0))
          .call((enter) =>
            enter
              .transition()
              .duration(this.duration)
              .delay(this.duration)
              .ease(d3.easePolyOut)
              .text((d) => d.value.toFixed(2))
              .style("fill-opacity", 1)
              .attr("y", (d) => this.axis.y.scale(d.value))
          ),
      (update) =>
        update.call((update) =>
          update
            .transition()
            .duration(this.duration)
            .ease(d3.easePolyInOut.exponent(4))
            .text((d) => d.value.toFixed(2))
            .attr(
              "x",
              (d) =>
                this.axis.x.scale(d.name) + this.axis.x.scale.bandwidth() / 2
            )
            .attr("y", (d) => this.axis.y.scale(d.value))
        ),
      (exit) =>
        exit
          .transition()
          .duration(this.duration / 3.33)
          .ease(d3.easePolyInOut.exponent(4))
          .style("fill-opacity", 0)
          .remove()
    );
  },
};
