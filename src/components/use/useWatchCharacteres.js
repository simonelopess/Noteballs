import { watch } from 'vue';

export function useWatchCharacteres(valueToWatch, maxChars = 100) {
    watch(valueToWatch, (newValue) => {
        if (newValue.length === maxChars) {
            alert('Only 100 characteres allowed')
        }
    })
}

