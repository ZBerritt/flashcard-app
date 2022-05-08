<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFlashcardStore } from '../store';
import FlashCardListItem from './FlashCardListItem.vue';


const flashcards = useFlashcardStore();
const cards = computed(() => {
    return flashcards.getFlashcardData();
})
defineEmits(["close"]);
const question = ref("");
const answer = ref("");
function addCard() {
    if (question.value.length <= 0 || answer.value.length <= 0) {
        return alert("Please fill out both the question AND the answer!"); // Make this cooler
    }
    flashcards.addFlashcard({question: question.value, answer: answer.value});
    question.value = "";
    answer.value = "";
}
</script>

<template>
    <h1>Manage Flashcards</h1>
    <br />
    <ul>
        <FlashCardListItem @delete="(crd) => flashcards.removeFlashcard(flashcards.getFlashcardData().indexOf(crd))" v-for="card in cards" :card="card" />
        <input v-model="question" placeholder="Question" type="text">
        <input v-model="answer" placeholder="Answer" type="text">
        <button @click="addCard()">Add</button>
    </ul>
    <br />
    <button @click="$refs.importFile.click()">Import JSON</button>
    <input type="file" ref="importFile" @change="flashcards.importJson" hidden>
    <button @click="flashcards.exportJson()">Export JSON</button>
    <br />
<button @click="() => { $emit('close') }">Exit</button>
</template>

<style scoped>
</style>