import { defineStore, acceptHMRUpdate } from 'pinia'
import { 
    collection, onSnapshot, 
    doc, deleteDoc, updateDoc,
    query, orderBy, 
    addDoc 
    } from "firebase/firestore";
import { db } from '@/config/firebase'
import { useAuthStore } from './storeAuth'; 

let notesCollectionRef;
let notesCollectionsQuery;
let getNotesSnapshot = null;

export const useNotesStore = defineStore('notes', {
    state: () => {
        return {
            notes: [],
            notesLoaded: false,
        }
    },
    actions: {
        init() {
            const storeAuth = useAuthStore();

            notesCollectionRef = collection(db, "users", storeAuth.user.id, 'notes')
            notesCollectionsQuery = query(notesCollectionRef, orderBy("date", "desc"));

            this.getNotes()
        },
        async getNotes() {
            /* Real time */

            this.notesLoaded = false;

            getNotesSnapshot = onSnapshot(notesCollectionsQuery, (querySnapshot) => {
                 let notes = []
                   querySnapshot.forEach((note) => {
                    let notesPayload = {
                     id: note.id,
                     content: note.data().content,
                     date: note.data().date
                    };
                    notes.push(notesPayload)
                });
                this.notes = notes;
                this.notesLoaded = true;
              });
        },
        clearNotes(){
            this.notes = []            
            if(getNotesSnapshot) getNotesSnapshot() //unsubscribe from any active listener
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