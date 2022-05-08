<script setup lang="ts">
import FlashCard from './FlashCard.vue';
import { ref } from "vue";
import { useStore } from "../store";
import Flashcard from '../Flashcard';

// Init with empty refs
const flashcards = useStore();
const cardQueue = ref(new Array<Flashcard>());
const correct = ref(0);
const incorrect = ref(0);
const started = ref(false);
const ended = ref(false)
const currentCard = ref();

function start() {
  started.value = true;
  ended.value = false; // Avoid bugs before they appear :D
  cardQueue.value = flashcards.getFlashcardQueue();
  currentCard.value = cardQueue.value.shift();
}

function correctAnswer() {
  correct.value++;
  nextCard();
}

function incorrectAnswer() {
  incorrect.value++;
  nextCard();
}

function nextCard() {
  console.log(cardQueue.value.length <= 0)
  if (cardQueue.value.length <= 0) {
    return done();
    }
      currentCard.value = cardQueue.value.shift();
}

function done() {
  ended.value = true;
  console.log("You're Done!");
}

function restart() {
  ended.value = false;
  cardQueue.value = flashcards.getFlashcardQueue();
  currentCard.value = cardQueue.value.shift();
  correct.value = 0;
  incorrect.value = 0;
}

</script>

<template>
  <FlashCard v-if="started && !ended" :card="currentCard" 
  @correct="correctAnswer()"
  @incorrect="incorrectAnswer()"
  />
  <div v-else-if="!started">
  <button @click="start()">Start</button>
  </div>
  <div v-else>
    You're All Done!
    <br /><br />
    Correct: {{ correct }}
    <br />
    Incorrect: {{ incorrect }}
    <br />
    Percent Correct: {{ (correct / (incorrect + correct))*100}}%
    <br />
      <button @click="restart()">Restart</button>
  </div>
</template>

<style scoped>
</style>