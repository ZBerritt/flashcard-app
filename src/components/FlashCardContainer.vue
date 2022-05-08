<script setup lang="ts">
import FlashCard from './FlashCard.vue';
import { ref, computed } from "vue";
import { useFlashcardStore, useSessionStore, GameStatus } from "../store";

// Init game session
const flashcards = useFlashcardStore();
const gameSession = useSessionStore();
const currentCard = computed(() => {
  return gameSession.getCurrentCard;
});

</script>

<template>
  <FlashCard v-if="gameSession.getState === GameStatus.IN_PROGRESS" :card="currentCard" 
  @correct="gameSession.correctAnswer()"
  @incorrect="gameSession.incorrectAnswer()"
  />
  <div v-else-if="gameSession.getState == GameStatus.NOT_STARTED">
  <h1>Flashcard App</h1>
  <button @click="gameSession.start(flashcards.getFlashcardData())">Start</button>
  </div>
  <div v-else>
    You're All Done!
    <br /><br />
    Correct: {{ gameSession.getCorrect }}
    <br />
    Incorrect: {{ gameSession.getIncorrect }}
    <br />
    Percent Correct: {{ gameSession.getPercentCorrect }}
    <br />
      <button @click="gameSession.reset()">Restart</button>
  </div>
</template>

<style scoped>
</style>