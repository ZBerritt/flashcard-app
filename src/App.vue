<script setup lang="ts">
import { useSessionStore, GameStatus, useSettingsStore } from "./store";
import FlashCardContainerVue from './components/FlashCardContainer.vue';
import { ref } from "vue";
import ManageFlashcards from "./components/ManageFlashcards.vue";
import SettingsComponent from "./components/Settings.vue";

const gameSession = useSessionStore();
const settings = useSettingsStore();
const manage = ref(false);
const changingSettings = ref(false);
</script>

<template>
  <ManageFlashcards @close="manage = false" v-if="manage" />
  <SettingsComponent @exit="changingSettings = false" @save="(workingSettings) => { settings.settings = workingSettings; changingSettings = false }" v-else-if="changingSettings" />
  <FlashCardContainerVue v-else />
  <br />
  <button :hidden="gameSession.getState !== GameStatus.NOT_STARTED" v-if="!changingSettings && !manage" @click="manage = true">Manage Flashcards</button>
  <button :hidden="gameSession.getState !== GameStatus.NOT_STARTED" v-if="!changingSettings && !manage" @click="changingSettings = true">Settings</button>
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
