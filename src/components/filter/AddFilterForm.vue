<script>
import FilterCriteriaForm from "@/components/filter/criteria/FilterCriteriaForm.vue";
import SelectionSwitchButton from "@/components/filter/selection/SelectionSwitchButton.vue";
import VueResizeable from "vue-resizable";

export default {
  name: "AddFilterForm",
  components: {FilterCriteriaForm, SelectionSwitchButton, VueResizeable},
  emits: ['save-filter', 'toggle-form'],
  data() {
    return {
      filterName: "",
      nextIndex: 2,
      criterias: {1: {filterType: "amount", filterParam: ">", filterValue: 1}}
    }
  },
  methods: {
    addNewRow() {
      this.criterias[this.nextIndex] = {filterType: "amount", filterParam: ">", filterValue: 1};
      this.nextIndex++;
    },
    deleteRow(index) {
      if (this.criterias.length < 2) {
        return
      }
      delete this.criterias[index];
    },
    updateFilterState(newState) {
      const index = Object.keys(newState)[0]
      this.criterias[index] = newState[index];
    },
    saveFilter() {
      if (this.filterName.length < 1) {
        // TODO: Make an error message and change css style of the name input here.
      }
      const criterias = []
      for (const index in this.criterias) {
        criterias.push(this.criterias[index]);
      }

      const filter = {name: this.filterName, criterias: criterias}
      this.$emit("save-filter", filter)
    },
    emitToggleForm() {
      this.$emit("toggle-form");
    }
  }
}
</script>

<template>
  <div class="filter-container">
    <div class="filter-header">
      <h3>Filter</h3>
      <button
          class="close-button"
          @click="emitToggleForm"
      >✖</button>
    </div>
    <div class="filter-body">
      <p class="filter-param">Filter name</p>
      <div>
        <input
            id="filter-name"
            class="criteria-input"
            maxlength="255"
            v-model="filterName"
            placeholder="Enter filter name..."
        >
      </div>
      <p class="filter-param">Criteria</p>
      <div class="criteria-value">
        <filter-criteria-form
            v-for="(criteria, index) in criterias"
            :criteria="criteria"
            :index="Number(index)"
            :key="Number(index)"
            @state-change="updateFilterState"
            @delete-row="deleteRow"
        />
      </div>
      <div class="grid-exclusion flex-center">
        <button
            class="secondary-btn add-row"
            @click="addNewRow"
        ><span class="plus-sign">+</span> ADD ROW
        </button>
      </div>
      <p class="filter-param">Selection</p>
      <div class="selection-value">
        <selection-switch-button
            v-for="(_, key, index) in criterias"
            :key="key"
            :index="index + 1"
            :checked="index === 0"
        />
      </div>
    </div>
    <div class="filter-footer flex-center">
      <div class="footer-buttons">
        <button
            class="secondary-btn"
            @click="emitToggleForm"
        >CLOSE
        </button>
        <button
            class="main-btn"
            @click="saveFilter"
        >SAVE
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-weight: normal;
}

.filter-container {
  width: 100%;
}

.filter-container > * {
  padding: 10px 15px;
}

.filter-header {
  background-color: #5ebfcc;
  padding: 5px 15px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 25px;
}

.close-button:hover {
  color: red;
}

.filter-body {
  height: 150px;
  resize: vertical;
  overflow: hidden auto;
  color: #505050;
  display: grid;
  grid-template-columns: 1.5fr 15fr;
  row-gap: 10px;
  background-color: white;
}

.filter-param {
  font-weight: bold;
  color: black;
  white-space: nowrap;
}

.filter-param:first-child {
  margin-right: 10px;
}

.selection-value {
  display: flex;
  flex-wrap: wrap;
}

.criteria-value {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.plus-sign {
  font-size: 20px;
  padding-right: 5px;
}

.filter-footer {
  background-color: #f2f2f2;
}

.filter-footer .footer-buttons {
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

.add-row {
  padding: 2px 10px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
}

.grid-exclusion {
  grid-column: 1 / span 2;
}
</style>