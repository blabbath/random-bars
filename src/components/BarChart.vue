<template>
  <div class="chart-container">
    <div class="controls">
      <p><cds-icon shape="plus" size="28" @click="addLetter"></cds-icon></p>
      <p>
        <cds-icon shape="minus" size="28" @click="removeLetter"></cds-icon>
      </p>
      <p>
        <cds-icon shape="play" size="28" @click="generateRandomData"></cds-icon>
      </p>
      <p>
        <cds-icon shape="pause" size="28" @click="stopGenerate"></cds-icon>
      </p>
    </div>
    <div :id="id"></div>
  </div>
</template>

<script>
import init from "../charts/init";
import wrangle from "../charts/wrangle";
import update from "../charts/update";

export default {
  data() {
    let margin = 60;
    let duration = 1500;
    return {
      randomData: [],
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      entries: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
      interval: null,
      duration: duration,
      id: "chartHorizontal",
      config: {
        margin: margin,
        width: 800 - 2 * margin,
        height: 700 - 2 * margin,
        yMax: null,
      },
      axis: {
        x: { scale: null, axisCall: null, axis: null },
        y: { scale: null, axisCall: null, axis: null },
      },
      svg: null,
      g: null,
    };
  },
  created() {
    this.generateRandomData();
    this.init = init.init.bind(this);
    this.wrangle = wrangle.wrangle.bind(this);
    this.update = update.update.bind(this);
  },

  mounted() {
    this.init();
  },

  methods: {
    generateRandomData() {
      this.fillArrayRandomly();
      this.interval = setInterval(() => {
        if (this.randomData) {
          this.randomData.length = 0;
        }
        this.fillArrayRandomly();
        if (this.randomData) this.wrangle();
      }, this.duration);
    },

    fillArrayRandomly() {
      this.entries.forEach((e) => {
        this.randomData.push({ name: e, value: Math.random() * 10 });
      });
    },

    stopGenerate() {
      clearInterval(this.interval);
    },

    removeLetter() {
      this.entries.pop();
    },

    addLetter() {
      if (this.entries.length < this.alphabet.length) {
        let lastLetter = this.entries[this.entries.length - 1];
        let index = this.alphabet.indexOf(lastLetter);
        this.entries.push(this.alphabet[index + 1]);
      }
    },
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 0;
  border-radius: 0px;
}

@media only screen and (min-width: 768px) {
  .chart-container {
    align-items: flex-end;
  }
}

#chartHorizontal {
  max-width: 100%;
  margin-bottom: 2rem;
}

@media only screen and (min-width: 768px) {
  #chartHorizontal {
    margin-bottom: 0;
  }
}

@media only screen and (min-width: 768px) {
  .content-container {
    align-items: flex-end;
  }
}

.controls {
  display: flex;
  align-items: center;
  margin: 0 0 1rem;
}

@media only screen and (min-width: 768px) {
  .controls {
    margin: 0;
  }
}

p {
  cursor: pointer;
  margin: 0 1rem;
}
</style>
