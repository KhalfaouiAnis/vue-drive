<script>
import { reactive, ref, toRef, watchEffect } from "vue";
import filesApi from "../api/files";
import ActionBar from "../components/ActionBar.vue";
import SortToggle from "../components/SortToggler.vue";
import FilesList from "../components/files/FilesList.vue";
import SearchForm from "../components/SearchForm.vue";
import FileRenameForm from "../components/files/FileRenameForm.vue";

const fetchFiles = async (query) => {
  try {
    const { data } = await filesApi.index(query)
    return data
  } catch (error) {
    console.log(error);
  }
}

const removeItem = async (item, files) => {
  try {
    const res = await filesApi.delete(item.id)
    if (res.status === 200 || res.status === 204) {
      const index = files.value.findIndex(file => file.id === file.id)
      files.value.splice(index, 1)
    }
  } catch (error) {
    console.log(error);
  }
}

export default {
  components: { ActionBar, FilesList, SortToggle, SearchForm, FileRenameForm },
  setup() {
    const files = ref([])
    const selectedItems = ref([])
    const showModal = ref(false)
    const toast = reactive({
      show: false,
      message: ""
    })
    const query = reactive({
      _sort: 'name',
      _order: '_asc',
      q: ""
    });



    const handleSortChange = (payload) => {
      query._sort = payload.column;
      query._order = payload.order;
    }

    const handleSelectChange = items => {
      selectedItems.value = Array.from(items)
    }

    const handleRemove = () => {
      if (confirm("Are you sure?")) {
        selectedItems.value.forEach(item => {
          removeItem(item, files)
        });
        selectedItems.value.splice(0)
        toast.show = true;
        toast.message = "Selected item(s) successfully removed"
      }
    }

    const handleFileUpdate = (file) => {
      const oldFile = selectedItems.value[0];
      const index = files.value.findIndex(item => item.id === file.id)
      files.value.splice(index, 1, file)
      toast.show = true;
      toast.message = `File '${oldFile.name}' renamed to '${file.name}'`
    }

    watchEffect(async () => files.value = await fetchFiles(query))

    // watch(() => query._order,
    //   async () => files.value = await fetchFiles(query),
    //   { immediate: true })

    return {
      files,
      handleSortChange,
      handleSelectChange,
      handleFileUpdate,
      handleRemove,
      selectedItems,
      q: toRef(query, 'q'),
      showModal,
      toast,
    }
  },
};
</script>

<template>
  <div class="container py-3">
    <ActionBar :selected-count="selectedItems.length" @remove="handleRemove" @rename="showModal = true" />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <SortToggle @sort-change="handleSortChange($event)" />
    </div>
    <teleport to="#search-form">
      <SearchForm v-model="q" />
    </teleport>
    <FilesList :files="files" @select-change="handleSelectChange($event)" />
    <app-toast :show="toast.show" :message="toast.message" type="success" position="bottom-left"
      @hide="toast.show = false" />
    <app-modal title="Rename" :show="showModal && selectedItems.length === 1" @hide="showModal = false">
      <FileRenameForm :file="selectedItems[0]" @close="showModal = false" @file-updated="handleFileUpdate($event)" />
    </app-modal>
  </div>
</template>

