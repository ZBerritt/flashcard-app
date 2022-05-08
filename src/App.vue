<script setup lang="ts">
import { useFlashcardStore } from "./store";
import FlashCardContainerVue from './components/FlashCardContainer.vue';

const flashCards = useFlashcardStore();
</script>

<template>
  <FlashCardContainerVue />
  <br />
  <button hidden @click="flashCards.reset()">Reset (Testing)</button>
  <br />
  <button @click="$refs.importFile.click()">Import</button>
  <input type="file" ref="importFile" @change="flashCards.importJson" hidden>
  <button @click="flashCards.exportJson()">Export</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
