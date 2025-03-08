<template>
    <div class="stats">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                   <td>Numbe of Notes</td>
                   <td>{{ store.totalNotesCount }}</td>
                </tr>
                <tr>
                   <td>Numbe of Characteres (off all notes)</td>
                   <td>{{ store.totalCharacteresCount }}</td>
                </tr>
            </tbody>
        </table>
        <input 
        v-model="loveNoteballs"
        class="input"
        type="text"
        placeholder="Do you love noteballs?"
        v-autofocus
        />
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useWatchCharacteres } from '@/components/use/useWatchCharacteres';
    import { useNotesStore } from '@/store/notes';
    import { vAutofocus } from '@/directives/vAutofocus';
    
    const store = useNotesStore();

    const loveNoteballs = ref('')
    useWatchCharacteres(loveNoteballs, 50)

</script>