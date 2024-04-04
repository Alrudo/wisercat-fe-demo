<script>
import RemoveRowButton from "@/components/custom/RemoveRowButton.vue";
export default {
  name: "AddCriteriaOptions",
  components: {RemoveRowButton},
  emits: ["change-param", "change-param-value", "delete-row"],
  data() {
    return {
      filterParam: ">",
      filterParamValue: 1,
      filterOptions: [
        {text: "More", value: ">"},
        {text: "More or equal", value: ">="},
        {text: "Less", value: "<"},
        {text: "Less or equal", value: "<="},
        {text: "Equal", value: "="},
        {text: "Not equal", value: "=/="}
      ]
    }
  },
  methods: {
    setInputMinValue() {
      if (this.filterParamValue < 0) {
        this.filterParamValue = Math.abs(this.filterParamValue);
      } else if (this.filterParamValue === 0) {
        this.filterParamValue = 1;
      }

      this.$emit('change-param-value', this.filterParamValue);
    }
  }
}
</script>

<template>
  <select
      class="criteria-input"
      v-model="filterParam"
      @change="$emit('change-param', filterParam)"
  >
    <option
        v-for="option in filterOptions"
        :value="option.value"
    >{{ option.text }}
    </option>
  </select>
  <input
      min="1"
      type="number"
      class="criteria-input"
      v-model.number="filterParamValue"
      @change="setInputMinValue"
  >
  <remove-row-button @delete-row="$emit('delete-row')"/>
</template>

<style scoped>
</style>