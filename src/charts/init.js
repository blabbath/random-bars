import * as d3 from "d3";

export default {
  init: function () {
    this.svg = d3
      .select(`#${this.id}`)
      .append("svg")
      .attr("width", window.innerWidth < 768 ? "100%" : this.config.width)
      .attr("height", "100%")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr(
        "viewBox",
        `0 0 ${this.config.width + this.config.margin * 2} ${
          this.config.height + this.config.margin * 2
        }`
      )
      .classed("svg-content-responsive", true);

    this.g = this.svg
      .append("g")
      .attr(
        "transform",
        `translate(${this.config.margin}, ${this.config.margin})`
      );

    this.g.append("g").attr("class", "bars");
    this.g.append("g").attr("class", "bar-labels");

    this.axis.x.scale = d3
      .scaleBand()
      .range([0, this.config.width])
      .padding(0.2);
    this.axis.y.scale = d3.scaleLinear().range([this.config.height, 0]);

    this.axis.x.axisCall = d3.axisBottom(this.axis.x.scale);
    this.axis.y.axisCall = d3.axisLeft(this.axis.y.scale);

    this.axis.x.axis = this.g
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${this.config.height})`);

    this.axis.y.axis = this.g.append("g").attr("class", "y-axis");

    this.wrangle();
  },
};
