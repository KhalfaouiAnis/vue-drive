<template>
  <div class="
      d-flex
      justify-content-between
      align-items-center
      border-bottom
      pt-2
      pb-3
    ">
    <div>
      <button class="me-2 btn btn-outline-success" @click="$emit('create-folder')">
        <icon-folder-plus /> New Folder
      </button>
      <FileChooser @files-choosen="$emit('files-choosen', $event)" />
    </div>

    <div class="action-buttons" v-show="selectedCount">
      <button type="button" class="rounded-button" title="Rename" v-show="selectedCount === 1" @click="$emit('rename')">
        <icon-pencil />
      </button>
      <button type="button" class="rounded-button" title="Remove selected" @click="$emit('remove')">
        <icon-trash />
      </button>
    </div>
  </div>
</template>

<script>
import FileChooser from "../components/uploader/file-chooser/FileChooser.vue";

export default {
  props: {
    selectedCount: {
      type: Number,
      default: 0,
    },
  },
  components: { FileChooser },
  emits: ["rename", "remove", "files-choosen", 'create-folder'],
};
</script>
