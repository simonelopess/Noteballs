import { defineStore, acceptHMRUpdate } from 'pinia'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '@/config/firebase'

export const useNotesStore = defineStore('notes', {
    state: () => {
        return {
            notes: []
        }
    },
    actions: {
        async getNotes() {
            /* Real time */
            onSnapshot(collection(db, "notes"), (querySnapshot) => {
                 let notes = []
                   querySnapshot.forEach((note) => {
                    let notesPayload = {
                     id: note.id,
                     content: note.data().content
                    };
                    notes.push(notesPayload)
                });
                this.notes = notes;
              });
            },
        addNotes(newNoteContent) {
            const newNoteAdd = {
                id: 'id' + (this.notes.length + 1),
                content: newNoteContent,
            }

            this.notes.unshift(newNoteAdd);
        },
        deleteNotes(id) {
            this.notes = this.notes.filter(note => note.id !== id);
        },
        editNotes(id, payload) {
            //find the id 

            const fileToEdit = this.notes.filter(item => item.id === id);
            //position in an array => pop
            //replace the data => push 

        },
        updateNotes(id, content) {
            let index = this.notes.findIndex(note => note.id === id);

            this.notes[index].content = content;
        }
    },
    getters:{
        getNoteContent: (state) => {
            return (id) => {
                return state.notes.filter(note => {
                    return note.id === id
                })[0].content
            }
        },
        totalNotesCount: (state) => {
            return state.notes.length
        },
        totalCharacteresCount: (state) => {
            let count = 0;

            state.notes.forEach(note => {
                count += note.content.length
            })

            return count;
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}