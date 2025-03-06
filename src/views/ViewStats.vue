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
    </div>
</template>

<script setup>
    import { useNotesStore } from '@/store/notes';

    const store = useNotesStore();


</script>