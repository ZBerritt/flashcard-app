import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import Flashcard from "./Flashcard";

export const useStore = defineStore("main", {
    state: () => ({
        flashcards: useStorage("flashcards", new Array<Flashcard>()),
    }),
    actions: {
        addFlashcard(fc: Flashcard) {
            this.flashcards.push(fc);
        },
        removeFlashcard(index: number) {
            this.flashcards.splice(index, 1);
        },
        getFlashcardData(): Array<Flashcard> {
            return this.flashcards
        },
        getRandomFlashcard(): Flashcard {
            return this.flashcards[Math.floor(Math.random()*this.flashcards.length)]
        },
        getFlashcardQueue(): Array<Flashcard> {
            let queue = new Array<Flashcard>();
            let currentIndex = this.flashcards.length, randomIndex;
            let cards = Object.assign([], this.flashcards);
            while (currentIndex !== 0) {

                // Pick a remaining element.
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                let item: Flashcard = cards.splice(randomIndex, 1)[0];
                queue.push(item);
              }
              return queue
        },
        reset() {
            this.flashcards.splice(0)
            console.log("Flashcards Reset!")
        },
        exportJson() {
            const blob = new Blob([JSON.stringify(this.flashcards)], {
                type: "application/json"
            });
            var a = document.createElement("a"), url = URL.createObjectURL(blob)
            a.href = url;
            a.download = "flashcards.json";
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        },
        importJson(event: Event) {
            let target = event.target as HTMLInputElement
            if (target.files !== null && target.files.length > 0) {
                let file = target.files[0];

                const reader = new FileReader();
                reader.onload = e => {
                    if (e.target && typeof e.target.result == "string") {
                        let result: string = e.target.result;
                        let json = JSON.parse(result);
                        // Validate Data
                        if (!json[0]) return console.log("Invalid Data!");
                        for (let card of json) {
                            if (!card.question || !card.answer) return console.log("Invalid Data");
                        }
                        this.flashcards = json;
                    }
                }

                reader.readAsText(file);
            }
        }
    }
})