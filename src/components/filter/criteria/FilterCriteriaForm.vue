<script>
import AddCriteriaOptions from "@/components/filter/criteria/options/AddCriteriaOptions.vue";
import TitleCriteriaOptions from "@/components/filter/criteria/options/TitleCriteriaOptions.vue";
import DateCriteriaOptions from "@/components/filter/criteria/options/DateCriteriaOptions.vue";

export default {
  name: "FilterCriteriaForm",
  components: {AddCriteriaOptions, TitleCriteriaOptions, DateCriteriaOptions},
  props: {
    index: {
      type: Number,
      required: true
    },
    criteria: {
      type: Object,
      required: true
    }
  },
  emits: ["state-change", "delete-row"],
  data() {
    return {
      filterIndex: this.index,
      filterType: this.criteria.filterType,
      filterParam: this.criteria.filterParam,
      filterParamValue: this.criteria.filterValue,
      filterTypeOptions: [
        {text: "Amount", value: "amount"},
        {text: "Title", value: "title"},
        {text: "Date", value: "date"}
      ],
    }
  },
  computed: {
    showFilterTypeOptions() {
      const filterTypeComponents = {
        amount: AddCriteriaOptions,
        title: TitleCriteriaOptions,
        date: DateCriteriaOptions
      }
      return filterTypeComponents[this.filterType] || AddCriteriaOptions
    }
  },
  methods: {
    changeParam(param) {
      this.filterParam = param;
      this.emitNewState();
    },
    changeParamValue(paramValue) {
      this.filterParamValue = paramValue;
      this.emitNewState();
    },
    setDefaultValues() {
      const defaultValues = {
        amount: {filterParam: ">", filterParamValue: 1},
        title: {filterParam: "startsWith", filterParamValue: ""},
        date: {filterParam: "From", filterParamValue: ""}
      };
      const values = defaultValues[this.filterType] || defaultValues["amount"];
      this.filterParam = values.filterParam;
      this.filterParamValue = values.filterParamValue;
      this.emitNewState()
    },
    emitNewState() {
      const newState = {}
      newState[this.filterIndex] = {
        filterType: this.filterType,
        filterParam: this.filterParam,
        filterValue: this.filterParamValue
      };
      this.$emit('state-change', newState);
    }
  }
}
</script>

<template>
  <div class="criteria-value-element">
    <select
        class="criteria-input"
        v-model="filterType"
        @change="setDefaultValues"
    >
      <option
          v-for="option in filterTypeOptions"
          :value="option.value"
      >{{ option.text }}
      </option>
    </select>
    <component
        :is="showFilterTypeOptions"
        @change-param="changeParam"
        @change-param-value="changeParamValue"
        @delete-row="$emit('delete-row', filterIndex)"/>
  </div>
</template>

<style scoped>
.criteria-value-element {
  display: flex;
  column-gap: 10px;
}
</style>