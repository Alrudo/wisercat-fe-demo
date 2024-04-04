<script>
import RemoveRowButton from "@/components/custom/RemoveRowButton.vue";

export default {
  name: "DateCriteriaOptions",
  components: {RemoveRowButton},
  emits: ["change-param", "change-param-value", "delete-row"],
  data() {
    return {
      filterParam: "from",
      filterParamValue: "",
      filterOptions: [
        {text: "From", value: "from"},
        {text: "After", value: "after"},
        {text: "Until", value: "until"},
        {text: "Before", value: "before"},
        {text: "On", value: "on"}
      ]
    }
  }
}
</script>

<template>
  <select
      class="criteria-input"
      v-model="filterParam"
      @change="$emit('change-param', filterParam)">
    <option
        v-for="option in filterOptions"
        :value="option.value"
    >{{ option.text }}</option>
  </select>
  <input
      type="date"
      class="criteria-input"
      v-model="filterParamValue"
      @change="$emit('change-param-value', this.filterParamValue)"
  >
  <remove-row-button @delete-row="$emit('delete-row')" />
</template>

<style scoped>

</style>