<script>

export default {
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    methods: {
        handleEnterKey(event) {
            this.$emit('update:modelValue', event.target.value)
        },
        handleEscapeKey() {
            this.$emit('update:modelValue', "")
        }
    },
    emits: ["update:modelValue"]
}

</script>

<template>
    <form class="form-inline mt-2 mt-md-0">
        <input class="form-control" type="text" @keydown.enter.prevent="handleEnterKey"
            @keydown.esc.prevent="handleEscapeKey" :value="modelValue" placeholder="Search in Drive" aria-label="Search" />
    </form>
</template>