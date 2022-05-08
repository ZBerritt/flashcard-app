<script setup lang="ts">
import { ref } from "vue";
import Flashcard from "../Flashcard";

defineProps<{ card: Flashcard }>();
defineEmits(["delete"]);
</script>

<template>
<li>
    <span><b>Question:</b> {{ card.question }}</span>
    <span><b>Answer:</b> {{ card.answer }}</span>
    <button @click="() => { $emit('delete', card) }">Delete</button>
</li>
</template>

<style scoped>
    li {
        display: flex;
        justify-content: center;
    }
</style>