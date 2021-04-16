export default {
  wrangle: function () {
    this.config.yMax = Math.ceil(
      Math.max.apply(
        Math,
        this.randomData.map(function (o) {
          return o.value;
        })
      )
    );

    this.update();
  },
};
