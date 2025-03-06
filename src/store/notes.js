import { defineStore, acceptHMRUpdate } from 'pinia'

export const useNotesStore = defineStore('notes', {
    state: () => {
        return {
            notes: [
                {
                    id: 'id1',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam vero, explicabo, consequuntur vel necessitatibus optio libero aspernatur iusto eius facere voluptates. Doloribus dicta quisquam consequatur, quam nemo minus id fugit.',
                },
                {
                    id: 'id2',
                    content: 'This is a shorter note! Woo!'
                },
            ]
        }
    },
    actions: {
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
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}