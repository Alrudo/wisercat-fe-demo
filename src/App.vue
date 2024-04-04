<script>
import SavedFiltersTable from "@/components/filter/SavedFiltersTable.vue";
import AddFilterForm from "@/components/filter/AddFilterForm.vue";

export default {
  components: {SavedFiltersTable, AddFilterForm},
  data() {
    return {
      showFilterForm: false,
      modalMode: true,
      filters: []
    }
  },
  methods: {
    toggleAddFilterForm() {
      this.showFilterForm = !this.showFilterForm;
    },
    saveNewFilter(filter) {
      this.filters.push(filter);
    },
    deleteSavedFiltersRow(filterName) {
      for (let index = 0; index < this.filters.length; index++) {
        if (this.filters[index].name === filterName) {
          this.filters.splice(index, 1);
          break;
        }
      }
    }
  }
}
</script>

<template>
  <saved-filters-table
      :filters="filters"
      @delete-row="deleteSavedFiltersRow"
  />
  <div class="container">
    <div
        class="shrink"
        v-if="showFilterForm && !modalMode">
      <add-filter-form
          @save-filter="saveNewFilter"
          @toggle-form="toggleAddFilterForm"
      />
    </div>
</div>
  <div
      class="backdrop"
      v-if="showFilterForm && modalMode">
    <div class="modal">
        <add-filter-form
            @save-filter="saveNewFilter"
            @toggle-form="toggleAddFilterForm"/>
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
  --button-remove-row: #f24583;
  --button-remove-row-hover: #fa6fa1;
  --font-grey: #505050;
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

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.criteria-input {
  background-color: white;
  border: 1px solid var(--font-grey);
  color: var(--font-grey);
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.shrink {
  width: 80%;
}

.criteria-input:focus-visible {
  outline: none;
  border: 1px solid var(--button-main);
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
  .modal {
    width: 100%;
  }
  .shrink {
    width: 100%;
  }
}

@media only screen and (min-width: 1200px) {
  .modal {
    width: 60%;
  }
}
</style>
