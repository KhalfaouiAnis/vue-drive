<script>
import { reactive } from "vue";
import FileItem from "./FileItem.vue";

export default {
    components: { FileItem },
    props: {
        files: {
            type: Array,
            required: true
        }
    },
    setup(_, { emit }) {
        const selectedItems = reactive(new Set())

        const selectOne = (item) => {
            selectedItems.clear()
            selectedItems.add(item)
            emit('select-change', selectedItems)
        }

        const selectMultiple = (item) => {
            if (selectedItems.has(item)) {
                selectedItems.delete(item)
            } else {
                selectedItems.add(item)
            }
            emit('select-change', selectedItems)
        }

        const isSelected = item => selectedItems.has(item)

        const clearSelected = () => {
            selectedItems.clear();
            emit('select-change', selectedItems)
        }

        return {
            selectOne,
            selectMultiple,
            isSelected,
            clearSelected
        }
    },
    emits: ["select-change"]
}
</script>

<template>
    <div class="row" @click="clearSelected">
        <FileItem :class="{ 'selected-file': isSelected(file) }" @click.exact.stop="selectOne(file)"
            @click.meta.exact.stop="selectMultiple(file)" v-for="file in files" :file="file" :key="file.id" />
    </div>
</template>