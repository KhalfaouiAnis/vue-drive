<script>

import { nextTick } from "vue"
import filesApi from "../../api/files"

export default {
    props: {
        file: {
            type: Object,
            required: true
        }
    },
    directives: {
        highlight: {
            mounted(el) {
                nextTick(() => {
                    const selectionEnd = el.value.split(".").slice(0, -1).join('.').length
                    el.setSelectionRange(0, selectionEnd)
                });
                el.focus()
            }
        }
    },
    data() {
        return {
            name: this.file.name
        }
    },
    methods: {
        async handleSubmit() {
            try {
                const { data } = await filesApi.update({ ...this.file, name: this.name }, this.file.id)
                this.$emit('file-updated', data)
                this.$emit('close')
            } catch (error) {
                console.log(error);
            }
        }
    },
    emits: ["file-updated", "close"]
}

</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="name" v-highlight type="text" class="form-control">
        <div class="d-flex flex-row-reverse mt-3">
            <button type="submit" class="btn btn-primary">Ok</button>
            <button @click.prevent="$emit('close')" class="btn btn-outline-secondary me-2">Cancel</button>
        </div>
    </form>
</template>