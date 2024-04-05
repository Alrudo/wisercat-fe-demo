<script>
import AddCriterionOptions from "@/components/filter/criterion/options/AddCriterionOptions.vue";
import TitleCriterionOptions from "@/components/filter/criterion/options/TitleCriterionOptions.vue";
import DateCriterionOptions from "@/components/filter/criterion/options/DateCriterionOptions.vue";

export default {
  name: "FilterCriterionForm",
  components: {AddCriterionOptions, TitleCriterionOptions, DateCriterionOptions},
  props: {
    index: {
      type: Number,
      required: true
    },
    criterion: {
      type: Object,
      required: true
    },
    errored: {
      type: Boolean,
      required: true
    }
  },
  emits: ["state-change", "empty-value", "delete-row"],
  data() {
    return {
      type: this.criterion.type,
      param: this.criterion.param,
      value: this.criterion.value,
      criterionTypeOptions: [
        {text: "Amount", value: "amount"},
        {text: "Title", value: "title"},
        {text: "Date", value: "date"}
      ],
    }
  },
  computed: {
    showFilterCriterionTypeOptions() {
      const filterTypeComponents = {
        amount: AddCriterionOptions,
        title: TitleCriterionOptions,
        date: DateCriterionOptions
      }
      return filterTypeComponents[this.type] || AddCriterionOptions
    }
  },
  methods: {
    changeParam(param) {
      this.param = param;
      this.emitNewState();
    },
    changeValue(paramValue) {
      if (!paramValue) {
        this.$emit("empty-value", this.index);
        return;
      }
      this.value = paramValue;
      this.emitNewState();
    },
    setDefaultValues() {
      const defaultValues = {
        amount: {param: ">", value: "1"},
        title: {param: "startsWith", value: ""},
        date: {param: "from", value: ""}
      };
      const values = defaultValues[this.type] || defaultValues.amount;
      this.param = values.param;
      this.value = values.value;
      this.emitNewState()
    },
    emitNewState() {
      const newState = {}
      newState[this.index] = {
        type: this.type,
        param: this.param,
        value: this.value
      };
      this.$emit('state-change', newState);
    },
    emitDeleteRowEvent() {
      this.$emit('delete-row', this.index);
    }
  }
}
</script>

<template>
  <div class="criteria-value-element">
    <select
        class="criterion-input"
        v-model="type"
        @change="setDefaultValues">
      <option
          v-for="option in criterionTypeOptions"
          :value="option.value"
      >{{ option.text }}</option>
    </select>
    <component
        :is="showFilterCriterionTypeOptions"
        :errored="errored"
        :paramProp="param"
        :valueProp="value"
        @change-param="changeParam"
        @change-value="changeValue"
        @delete-row="emitDeleteRowEvent"/>
  </div>
</template>

<style scoped>
.criteria-value-element {
  display: flex;
  column-gap: 10px;
}
</style>