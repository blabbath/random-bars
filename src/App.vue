<template>
  <div class="main-container">
    <Title />
    <BarChart />
  </div>
</template>

<script>
import "@cds/core/icon/register.js";

import {
  ClarityIcons,
  playIcon,
  pauseIcon,
  plusIcon,
  minusIcon,
} from "@cds/core/icon";
ClarityIcons.addIcons(playIcon);
ClarityIcons.addIcons(pauseIcon);
ClarityIcons.addIcons(plusIcon);
ClarityIcons.addIcons(minusIcon);

import BarChart from "./components/BarChart.vue";
import Title from "./components/Title.vue";

export default {
  name: "App",
  components: {
    BarChart,
    Title,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
