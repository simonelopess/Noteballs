<template>
   <div class="card has-background-success p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea :value="modelValue"  @input="$emit('update:modelValue', $event.target.value)"  class="textarea" placeholder="Add a new note" ref="textareaRef"></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>

</template>

<script setup>
const textareaRef = ref(null)

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    }
})
const emit = defineEmits(['update:modelValue'])

/* Focus Text Area */

import { ref } from 'vue'


const focusTextarea = () => {
    textareaRef.value.focus()
}

//expoe o metodo para elementos pais
defineExpose({
    focusTextarea
})

</script>