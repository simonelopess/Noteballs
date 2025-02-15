<template>
  <div class="notes">
    <div class="card has-background-success p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Add a new note" v-model="newNote" ref="newNoteRef"></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button is-link " @click="AddNewNote" :disabled="!newNote">Add New Noe</button>
        </div>
      </div>
    </div>
    <Note v-for="note in notes" :key="note.id" :note="note" @deleteClicked="deleteNote"/>
  </div>
</template>


<script setup>

import { ref } from 'vue';
import Note from '@/components/Notes/Note.vue';

  const newNote = ref('');
  const newNoteRef = ref(null);
  
  const notes = ref([
    {
      id: 'id1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam vero, explicabo, consequuntur vel necessitatibus optio libero aspernatur iusto eius facere voluptates. Doloribus dicta quisquam consequatur, quam nemo minus id fugit.',
    },
    {
      id: 'id2',
      content: 'This is a shorter note! Woo!'
    },
  ]);

  const AddNewNote = () => {
    const newNoteAdd = {
      id: 'id'+ (notes.value.length + 1),
      content: newNote.value,
    }

    notes.value.unshift(newNoteAdd);
    newNote.value = '';
    newNoteRef.value.focus();
  }

  const deleteNote = (idToDelete) => {
    notes.value = notes.value.filter(note => note.id !== idToDelete);
  }

</script>