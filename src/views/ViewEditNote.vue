<template>
    <div class="edit-note">
        <AddEditNote v-model="noteContent" bg-color="link"  ref="addEditNoteRef" placeholder="Edit note" label="Edit Note">
      <!-- <template v-slot:buttons></template> -->
      <template #buttons>
        <RouterLink class="button is-link is-light mr-2" to="/">Cancel</RouterLink>
        <button class="button is-link has-background-link" 
        :disabled="!noteContent" 
        @click="handleSavedClicked">Save Note</button>
      </template>
    </AddEditNote>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRoute, useRouter } from 'vue-router';
    import AddEditNote from '@/components/Notes/AddEditNote.vue';
    import { useNotesStore } from '@/store/notes';

    const route = useRoute()
    const router = useRouter()

    const storeNotes = useNotesStore();

    const noteContent = ref('');

    noteContent.value = storeNotes.getNoteContent(route.params.id)

    const handleSavedClicked = () => {

      storeNotes.updateNotes(route.params.id, noteContent.value )
      router.push('/')
    }

</script>