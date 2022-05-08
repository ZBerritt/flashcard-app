<script setup lang="ts">
import { useFlashcardStore } from '../store';


const flashcards = useFlashcardStore();
defineEmits(["close"]);
</script>

<template>
<button @click="() => { $emit('close') }">Exit</button>
</template>