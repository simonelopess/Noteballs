import { defineStore, acceptHMRUpdate } from 'pinia'
import { 
    collection, onSnapshot, 
    doc, deleteDoc, updateDoc,
    query, orderBy, 
    addDoc 
    } from "firebase/firestore";
import { db } from '@/config/firebase'

const notesCollectionRef = collection(db, "notes")
const notesCollectionsQuery = query(notesCollectionRef, orderBy("date", "desc"));


export const useNotesStore = defineStore('notes', {
    state: () => {
        return {
            notes: []
        }
    },
    actions: {
        async getNotes() {
            /* Real time */

            onSnapshot(notesCollectionsQuery, (querySnapshot) => {
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
        async addNotes(newNoteContent) {
            let currentDate = new Date().getTime(),
                date = currentDate.toString()

               await addDoc(notesCollectionRef, {
                content: newNoteContent,
                date
              });
        },
        async deleteNotes(id) {
            // this.notes = this.notes.filter(note => note.id !== id);
            await deleteDoc(doc(notesCollectionRef, id));
        },
        async updateNotes(id, content) {
            // let index = this.notes.findIndex(note => note.id === id);

            // this.notes[index].content = content;

            await updateDoc(doc(notesCollectionRef, id), {
                content,
            });            
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