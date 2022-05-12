<script setup lang="ts">
import Settings from '../Settings';
import { useSettingsStore } from '../store';

const settingsStore = useSettingsStore();
const workingSettings = Object.assign(new Settings(), settingsStore.getSettings);

defineEmits(["save", "exit"]);
</script>

<template>
    <h1>Settings</h1>
    <label for="jeopardy">Jeopardy Mode</label><input v-model="workingSettings.jeopardy" id="jeopardy" type="checkbox" />
    <br />
    <button @click="() => { $emit('save', workingSettings) }">Save & Exit</button>
    <button @click="() => { $emit('exit') }">Exit Without Saving</button>
</template>

<style scoped>
</style>