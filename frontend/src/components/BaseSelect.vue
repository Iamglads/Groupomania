<template>
    <div>
        <label v-if="label">Sélect</label>
            <select v-model="event.category">
            <option
            v-for="option in categories"
            :value='option'
            :key='option'
            :selected="option === event.category"
            >
            {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        label:{
            type: String,
            default:''
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    }
}
</script>