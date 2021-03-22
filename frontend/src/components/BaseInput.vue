<template>
    <div class="md-form mt-1">
        <input 
        class="form-control"
        v-bind="$attrs"
        :value="modelValue"
        :placeholder="label"
        @input="$emit('update:modelValue', $event.target.Value)"
        />
    </div>
</template>


<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: '',
            required: Boolean
        }
    }
}
</script>