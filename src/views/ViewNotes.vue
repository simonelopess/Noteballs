<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNoteRef" placeholder="Add a new note">
      <!-- <template v-slot:buttons></template> -->
      <template #buttons>
        <button class="button is-link " @click="AddNewNote" :disabled="!newNote">Add New Noe</button>
      </template>
    </AddEditNote>
    <progress v-if="!storeNotes.notesLoaded" class="progress is-large is-success" max="100" />

    <template 
      v-else
    >
      <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" @deleteClicked="deleteNote"/>

      <div v-if="!storeNotes.notes.length" class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6">
        No notes here yet...
      </div>
    </template>
  </div>
</template>


<script setup>

import { ref, onMounted } from 'vue';
import Note from '@/components/Notes/Note.vue';
import AddEditNote from '@/components/Notes/AddEditNote.vue';

  const newNote = ref('');
  const addEditNoteRef = ref(null);

  
  import { useAuthStore } from '@/store/storeAuth';
  import { useNotesStore } from '@/store/notes';
  import { useWatchCharacteres } from '@/utils/use/useWatchCharacteres';
  
  
  const storeNotes = useNotesStore();
  const authStore = useAuthStore();
  
  const AddNewNote = () => {
    storeNotes.addNotes(newNote.value)
    newNote.value = '';
    addEditNoteRef.value.focusTextarea()
  }
  
  const deleteNote = (idToDelete) => {
    storeNotes.deleteNotes(idToDelete)
  }
  
  useWatchCharacteres(newNote)
  

  onMounted(()=>{
    authStore.init()   
  })

</script>