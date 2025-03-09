import { computed } from 'vue';
import { useDateFormat } from '@vueuse/core'

export const formatDateToString = (dateToFormat, locale, dateFormat = 'DD/MM/YYYY' ) => {
    const dateFormatted = computed(() => {
        let date = new Date(parseInt(dateToFormat)) // convert timestamp to date
        return useDateFormat(date, dateFormat, { locales: locale })
    })

    return dateFormatted
}