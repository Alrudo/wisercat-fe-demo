<script>
import SavedFiltersTable from "@/components/filter/SavedFiltersTable.vue";
import AddFilterForm from "@/components/filter/AddFilterForm.vue";
import DeleteFilterWarningModal from "@/components/custom/DeleteFilterWarningModal.vue";

export default {
  components: {SavedFiltersTable, AddFilterForm, DeleteFilterWarningModal},
  data() {
    return {
      showFilterForm: false,
      showDeleteWarning: false,
      showUpdateFilterForm: false,
      modalMode: true,
      filterToUpdate: null,
      filterToDelete: null
    }
  },
  methods: {
    toggleAddFilterForm() {
      this.showFilterForm = !this.showFilterForm;
    },
    toggleUpdateFilterForm() {
      this.showUpdateFilterForm = !this.showUpdateFilterForm;
    },
    toggleDeleteFilterModal() {
      this.showDeleteWarning = !this.showDeleteWarning;
    },
    updateExistingFilter(filter) {
      this.filterToUpdate = filter;
      this.showUpdateFilterForm = true;
    },
    confirmDeleteExistingFilter(filter) {
      this.filterToDelete = filter;
      this.showDeleteWarning = true;
    },
    performDeleteExistingFilter() {
      this.$bus.emit("perform-filter-deletion", this.filterToDelete.id);
      this.showDeleteWarning = false;
    }
  },
  computed: {
    showAddFilterIntegrated() {
      return this.showFilterForm && !this.modalMode;
    },
    showAddFilterModal() {
      return this.showFilterForm && this.modalMode;
    },
    showModalBackdrop() {
      return this.showAddFilterModal || this.showDeleteWarning || this.showUpdateFilterForm;
    }
  }
}
</script>

<template>
  <saved-filters-table
      @update-filter="updateExistingFilter"
      @delete-filter="confirmDeleteExistingFilter"/>
  <div class="container">
    <div
        class="shrink"
        v-if="showAddFilterIntegrated">
      <add-filter-form @toggle-form="toggleAddFilterForm"/>
    </div>
</div>
  <div
      class="backdrop"
      v-if="showModalBackdrop">
    <div class="modal">
        <add-filter-form
            v-if="showAddFilterModal"
            @toggle-form="toggleAddFilterForm"/>
        <add-filter-form
            v-else-if="showUpdateFilterForm"
            :filter="filterToUpdate"
            @toggle-form="toggleUpdateFilterForm"/>
        <delete-filter-warning-modal
            v-else-if="showDeleteWarning"
            :name="filterToDelete.name"
            @toggle-modal="toggleDeleteFilterModal"
            @delete-filter="performDeleteExistingFilter"/>
    </div>
  </div>
  <div class="main-buttons flex-center">
    <div class="modal-input">
      <input
          id="modal-mode-switch"
          type="checkbox"
          v-model="modalMode">
      <label for="modal-mode-switch">
        Modal mode
      </label>
    </div>
    <button
        class="main-btn show-modal"
        @click="toggleAddFilterForm"
    >Add filter</button>
  </div>
</template>

<style>
:root {
  --button-main: #156bbb;
  --button-main-hover: #1b82e3;
  --button-secondary: #757575;
  --button-secondary-hover: #595959;
  --button-warning: #930202;
  --button-warning-hover: #e05252;
  --button-remove-row: #f24583;
  --button-remove-row-hover: #fa6fa1;
  --font-grey: #505050;;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  position: relative;
}

.main-btn {
  background-color: var(--button-main);
  border: 1px solid var(--button-main)
}

.main-btn:hover {
  background-color: var(--button-main-hover);
}

.secondary-btn {
  background-color: var(--button-secondary);
  border: 1px solid var(--button-secondary);
}

.secondary-btn:hover {
  background-color: var(--button-secondary-hover);
}

.warning-btn {
  background-color: var(--button-warning);
  border: 1px solid var(--button-warning)
}

.warning-btn:hover {
  background-color: var(--button-warning-hover);
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.criterion-input {
  background-color: white;
  border: 1px solid var(--font-grey);
  color: var(--font-grey);
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}

.criterion-input:focus-visible {
  outline: none;
  border: 1px solid var(--button-main);
}

.error-input {
  outline: 2px solid red;
  border: none;
}

.error-input:focus-visible {
  outline: 2px solid red;
  border: none;
}

.footer-buttons {
  width: 220px;
  display: flex;
  justify-content: space-between;
}

.footer-buttons > * {
  color: white;
  height: 1.6rem;
  width: 100px;
  border-radius: 5px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.shrink {
  width: 80%;
}

.main-buttons {
  flex-direction: column;
  margin-bottom: 40px;
}

.main-buttons {
  margin-top: 50px;
}

.modal {
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
}

.modal-input {
  margin-bottom: 10px;
}

.show-modal {
  color: white;
  height: 1.6rem;
  width: 100px;
  border-radius: 5px;
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 1;
}

@media only screen and (max-width: 600px) {
  .modal, .shrink {
    width: 100%;
  }
}

@media only screen and (min-width: 1200px) {
  .modal, .shrink {
    width: 60%;
  }
}
</style>
