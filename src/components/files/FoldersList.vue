<template>
  <div class="row" @click="clearSelected">
    <FolderItem v-for="folder in folders" :folder="folder" :key="`folder-${folder.id}`"
      @click.exact.stop="selectOne(folder)" @click.meta.exact.stop="selectMultiple(folder)"
      @dblclick.stop="$emit('double-click', folder)" :class="{ 'selected-folder': isSelected(folder) }" />
  </div>
</template>

<script>
import useItemsSelection from "../../composable/items-selection";
import FolderItem from "./FolderItem.vue";

export default {
  components: { FolderItem },
  props: {
    folders: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    return useItemsSelection(props.selected, emit)
  },
  emits: ["select-change", 'double-click'],
};
</script>
