<script setup lang="ts">
import { ref } from "vue";
import Flashcard from "../Flashcard";

defineProps<{ card: Flashcard | null, jeopardy: Boolean }>();
defineEmits(["correct", "incorrect"]);
const showAnswer = ref(false);
</script>

<template>
  <h2 v-show="!showAnswer" id="question">{{ jeopardy ? card?.answer : card?.question }}</h2>
  <h2 v-if="showAnswer" id="answer">{{ jeopardy ? card?.question : card?.answer }}</h2>

  <button v-if="!showAnswer" type="button" @click="showAnswer = true">See {{ jeopardy ? "Question" : "Answer" }}</button>
  <button v-if="showAnswer" type="button" @click="() => { $emit('correct'); showAnswer = false }">Correct :)</button>
  <button v-if="showAnswer" type="button" @click="() => { $emit('incorrect'); showAnswer = false }">Incorrect :(</button>
</template>

<style scoped>
</style>