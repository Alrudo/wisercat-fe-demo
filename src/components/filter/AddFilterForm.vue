<script>
import FilterCriterionForm from "@/components/filter/criterion/FilterCriterionForm.vue";
import SelectionSwitchButton from "@/components/filter/selection/SelectionSwitchButton.vue";

export default {
  name: "AddFilterForm",
  components: {FilterCriterionForm, SelectionSwitchButton},
  emits: ['toggle-form'],
  props: {
    filter: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      id: null,
      nameError: false,
      errors: false,
      filterName: "",
      nextIndex: 2,
      selection: 1,
      erroredCriteria: {1: false},
      criteria: {1: {type: "amount", param: ">", value: "1"}}
    }
  },
  created() {
    if (this.filter) {
      this.id = this.filter.id;
      this.filterName = this.filter.name;
      this.selection = this.filter.selection;

      const criteria = this.filter.criteria;
      const newCriteria = {};
      for (let i = 0; i < criteria.length; i++) {
        newCriteria[i + 1] = criteria[i];
        this.erroredCriteria[i + 1] = false;
        this.nextIndex = i + 2;
      }
      this.criteria = newCriteria;
    }
  },
  methods: {
    addNewRow() {
      this.criteria[this.nextIndex] = {type: "amount", param: ">", value: "1"};
      this.erroredCriteria[this.nextIndex] = false;
      this.nextIndex++;
    },
    deleteRow(index) {
      if (Object.keys(this.criteria).length < 2) {
        return
      }
      delete this.criteria[index];
      delete this.erroredCriteria[index];
    },
    updateFilterState(newState) {
      const index = Object.keys(newState)[0];
      const prevType = this.criteria[index].type;
      const newType = newState[index].type;
      this.criteria[index] = newState[index];

      if (newState[index].value || prevType !== newType) {
        this.erroredCriteria[index] = false;
        this.errors = false;
      }
    },
    saveFilter() {
      if (!this.isFilterValid()) {
        return;
      }
      const criteria = []
      for (const index in this.criteria) {
        criteria.push(this.criteria[index]);
      }

      const filter = {name: this.filterName, criteria: criteria, selection: this.selection};
      // TODO: Call Axios to save new filter to DB.
      // TODO: Check if this.filter is present. If true - make update request, else add request.
      if (this.id) {
        filter.id = this.id;
        console.log("I need to make an update request.");
        console.log(filter);
      } else {
        console.log("I need to make an add request.");
        console.log(filter);
      }
      this.$bus.emit("filter-data-changed", filter);
      this.$emit("toggle-form");
    },
    isFilterValid() {
      if (this.filterName.length < 1) {
        this.nameError = true;
      }
      return this.allCriteriaParamValuesAreValid() && !this.nameError;
    },
    allCriteriaParamValuesAreValid() {
      for (const index in this.criteria) {
        if (!this.criteria[index].value) {
          this.erroredCriteria[index] = true;
          this.errors = true;
        }
      }
      return !this.errors;
    },
    emitToggleFormEvent() {
      this.$emit("toggle-form");
    },
    errorEmptyField(index) {
      this.erroredCriteria[index] = true;
    },
    changeNameErrorState() {
      this.nameError = this.filterName.length < 1;
    },
    changeSelection(index) {
      this.selection = index;
    }
  },
  computed: {
    errorsPersist() {
      return this.nameError || this.errors;
    },
    proceedButtonText() {
      if (this.id) {
        return "UPDATE";
      }
      return "SAVE";
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
          @click="emitToggleFormEvent"
      >✖
      </button>
    </div>
    <div class="filter-body">
      <p class="filter-param">Filter name</p>
      <div>
        <input
            maxlength="255"
            placeholder="Enter filter name..."
            id="filter-name"
            :class="[
                {'error-input': nameError},
                'criterion-input'
            ]"
            v-model="filterName"
            @change="changeNameErrorState">
      </div>
      <p class="filter-param">Criteria</p>
      <div class="criterion-value">
        <filter-criterion-form
            v-for="(criterion, key, _) in criteria"
            :criterion="criterion"
            :errored="erroredCriteria[key]"
            :index="Number(key)"
            :key="Number(key)"
            @state-change="updateFilterState"
            @empty-value="errorEmptyField"
            @delete-row="deleteRow"/>
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
            v-for="(_, key, index) in criteria"
            :key="Number(key)"
            :index="index + 1"
            :checked="selection === index + 1"
            @checked-selection="changeSelection"/>
      </div>
    </div>
    <div class="filter-footer">
      <div
          class="flex-center error"
          v-if="errorsPersist">
        <p class="error-message">* Some fields are empty.</p>
      </div>
      <div class="flex-center">
        <div class="footer-buttons">
          <button
              class="secondary-btn"
              @click="emitToggleFormEvent"
          >CLOSE
          </button>
          <button
              class="main-btn"
              @click="saveFilter"
          >{{ proceedButtonText }}
          </button>
        </div>
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
  align-content: flex-start;
}

.criterion-value {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.plus-sign {
  font-size: 20px;
  margin-right: 5px;
}

.filter-footer {
  background-color: #f2f2f2;
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

.error {
  margin-bottom: 10px;
}

.error-message {
  color: red;
}
</style>