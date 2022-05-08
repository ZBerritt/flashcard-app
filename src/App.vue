<script setup lang="ts">
import { useFlashcardStore, useSessionStore, GameStatus } from "./store";
import FlashCardContainerVue from './components/FlashCardContainer.vue';
import { ref } from "vue";
import ManageFlashcards from "./components/ManageFlashcards.vue";

const flashCards = useFlashcardStore();
const gameSession = useSessionStore();
const manage = ref(false);
</script>

<template>
  <ManageFlashcards @close="manage = false" v-if="manage" />
  <FlashCardContainerVue v-else />
  <br />
  <button :hidden="gameSession.getState !== GameStatus.NOT_STARTED" v-if="!manage" @click="manage = true">Manage Flashcards</button>
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
