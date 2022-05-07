<script setup lang="ts">
import FlashCard from './FlashCard.vue';
import { ref, computed } from "vue";
import { useStore } from "../store";

const flashcards = useStore();
const cardQueue = ref(flashcards.getFlashcardQueue());
const correct = ref(0);
const incorrect = ref(0);
const ended = ref(false) 
const card = cardQueue.value.shift();
const currentCard = ref(card);


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

</script>

<template>
  <FlashCard v-if="!ended" :card="currentCard" 
  @correct="correctAnswer()"
  @incorrect="incorrectAnswer()"
  />
  <div v-else>
    You're All Done!
    <br /><br />
    Correct: {{ correct }}
    <br />
    Incorrect: {{ incorrect }}
    <br />
    Percent Correct: {{ (correct / (incorrect + correct))*100}}%
  </div>
</template>

<style scoped>
</style>