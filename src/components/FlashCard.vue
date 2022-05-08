<script setup lang="ts">
import { ref } from "vue";
import Flashcard from "../Flashcard";

defineProps<{ card: Flashcard | null }>();
defineEmits(["correct", "incorrect"]);
const showAnswer = ref(false);
</script>

<template>
  <h2 v-show="!showAnswer" id="question">{{ card?.question }}</h2>
  <h2 v-if="showAnswer" id="answer">{{ card?.answer }}</h2>

  <button v-if="!showAnswer" type="button" @click="showAnswer = true">See Answer</button>
  <button v-if="showAnswer" type="button" @click="() => { $emit('correct'); showAnswer = false }">Correct :)</button>
  <button v-if="showAnswer" type="button" @click="() => { $emit('incorrect'); showAnswer = false }">Incorrect :(</button>
</template>

<style scoped>
</style>