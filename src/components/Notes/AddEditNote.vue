<template>
   <div class="card p-4 mb-5"
    :class="`has-background-${bgColor}`"
   >
      <label v-if="props.label" class="label has-text-white">{{ label }}</label>
      <div class="field">
        <div class="control">
          <textarea :value="modelValue" 
           @input="$emit('update:modelValue', $event.target.value)"  
           class="textarea" 
           :placeholder="placeholder"
            ref="textareaRef"
            v-autofocus
            maxlength="100"
            ></textarea>
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
    },
    bgColor: {
      type: String,
      default: 'success'
    },
    placeholder: {
      type: String, 
      default: 'Type something...'
    }, 
    label: {
      type: String
    }
})
const emit = defineEmits(['update:modelValue'])

/* Focus Text Area */

import { ref } from 'vue'
import { vAutofocus  } from '@/directives/vAutofocus'

const focusTextarea = () => {
    textareaRef.value.focus()
}

//expoe o metodo para elementos pais
defineExpose({
    focusTextarea
})



</script>