import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import Flashcard from "./Flashcard";

export const useFlashcardStore = defineStore("flashcards", {
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
});

export const useSessionStore = defineStore("gameSession", {
    state: () => ({
        state: GameStatus.NOT_STARTED,
        correct: 0,
        incorrect: 0,
        queue: new Array<Flashcard>(),
        currentCard: false ? new Array<Flashcard>()[0] : null // This is stupid but it works
    }),
    getters: {
        getCorrect(): Number {
            return this.correct;
        },
        getIncorrect(): Number {
            return this.incorrect
        },
        getState(): GameStatus {
            return this.state;
        },
        getCurrentCard(): Flashcard | null {
            return this.currentCard;
        },
        getPercentCorrect(): string {
            return (this.correct / (this.incorrect + this.correct))*100 + "%";
        }
    },
    actions: {
        start(flashcards: Flashcard[]) { // (Re)starts a game session
            this.queue = new Array<Flashcard>();
            let currentIndex = flashcards.length, randomIndex;
            let flashcardsCopy = Object.assign([], flashcards);
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                let item: Flashcard = flashcardsCopy.splice(randomIndex, 1)[0];
                this.queue.push(item);
              }
              this.state = GameStatus.IN_PROGRESS;
              this.correct = 0;
              this.incorrect = 0;
              console.log(this.queue)
              let nextCard = this.queue.shift();
              if (nextCard) {
                  this.currentCard = nextCard;
              } else {
                  this.end();
              }
        },
        correctAnswer() {
            this.correct++;
            let nextCard = this.queue.shift();
            if (nextCard) {
                this.currentCard = nextCard;
            } else {
                this.end();
            }
        },
        incorrectAnswer() {
            this.incorrect++;
            let nextCard = this.queue.shift();
            if (nextCard) {
                this.currentCard = nextCard;
            } else {
                this.end();
            }
        },
        end() {
            console.log("You're Done!");
            this.state = GameStatus.COMPLETE;
            this.queue = [];
            this.currentCard = null;
        }
    }
});

export enum GameStatus {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETE
}