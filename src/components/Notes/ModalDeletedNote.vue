<template>
    <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
        <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
            Are you sure you want to delete this note?
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
            <button class="button" @click="closeModal">Cancel</button>
            <button class="button is-danger" @click="noteStore.deleteNotes(noteId)">Delete</button>
        </div>
        </footer>
    </div>
    </div>
</template>

<script setup>


    import { ref, onMounted, onUnmounted } from 'vue'
    import { onClickOutside } from '@vueuse/core'

    import { useNotesStore } from '@/store/notes'


    const noteStore = useNotesStore();

    /* Props */

    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false,
        },
        noteId: {
            type: String,
            required: true
        }
    })

    /* Emits */

    const emit = defineEmits([
        'update:modelValue'
    ])

    /* CLOSE MODAL */

    const closeModal = () => {
        emit('update:modelValue', false)
    }

    const modalCardRef = ref(null);
    
    onClickOutside(modalCardRef, closeModal)


    const handleKeyboard = e => {
        if (e.key === 'Escape') closeModal()
    }

    /* Keyboard control */
    onMounted(() => {
       document.addEventListener('keyup', handleKeyboard)
    })

    onUnmounted(() => {
        document.removeEventListener('keyup', handleKeyboard)
    })
    

</script>