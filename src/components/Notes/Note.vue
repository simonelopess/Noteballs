<template>
  <div class="card">
    <div class="card-content" :key="note.id">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2"> 
          <small class="column">{{ dateFormatted }}</small>  
          <small class="column  has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink href="#" class="card-footer-item" :to="`/editNote/${ note.id }`">Edit</RouterLink>
      <a href="#" class="card-footer-item" @click.prevent="
        modals.deleteNote = true
      ">Delete</a>
    </footer>
    <ModalDeletedNote 
      v-if="modals.deleteNote" 
      v-model="modals.deleteNote" 
      :noteId="note.id" 
      />
      <!-- note = props -->
  </div>
</template>


<script setup>  

import { computed, reactive } from 'vue';
import { useDateFormat, useNow } from '@vueuse/core'
import ModalDeletedNote from './ModalDeletedNote.vue';
import { formatDateToString } from '@/utils/formatDate';

/* Props */

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const dateFormatted = formatDateToString(props.note.date, 'pt' )

const emit = defineEmits(['deleteClicked', 'editClicked']);

const characterLength = computed(() => {
    let length = props.note.content.length;
    let description = length > 1 ? 'characteres' : 'character';
    return `${length} ${description}`; ;
});

const modals = reactive({
  deleteNote: false,
}) 

</script>