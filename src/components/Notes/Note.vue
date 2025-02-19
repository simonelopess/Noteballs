<template>
  <div class="card">
    <div class="card-content" :key="note.id">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2"> 
            <small>{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink href="#" class="card-footer-item" :to="`/editNote/${ note.id }`">Edit</RouterLink>
      <a href="#" class="card-footer-item" @click.prevent="
        handleDeleteClicked(note.id)
      ">Delete</a>
    </footer>
  </div>
</template>


<script setup>  

import { computed } from 'vue';
/* Props */

const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['deleteClicked', 'editClicked']);

const characterLength = computed(() => {
    let length = props.note.content.length;
    let description = length > 1 ? 'characteres' : 'character';
    return `${length} ${description}`; ;
});

const handleDeleteClicked = (id) => {
  emit('deleteClicked', id);
}

const handleEditClicked = (payload) => {
  emit('editClicked', payload)
}

</script>