<script>
import RemoveRowButton from "@/components/custom/RemoveRowButton.vue";

export default {
  name: "TitleCriteriaOptions",
  components: {RemoveRowButton},
  emits: ["change-param", "change-param-value", "delete-row"],
  data() {
    return {
      filterParam: "startsWith",
      filterParamValue: "",
      filterOptions: [
        {text: "Starts with", value: "startsWith"},
        {text: "Ends with", value: "endsWith"},
        {text: "Contains", value: "contains"},
        {text: "Does not contain", value: "doesNotContain"}
      ]
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
      type="text"
      min="1"
      placeholder="Enter text here..."
      class="criteria-input"
      v-model="filterParamValue"
      @change="$emit('change-param-value', filterParamValue)"
  >
  <remove-row-button @delete-row="$emit('delete-row')"/>
</template>

<style scoped>

</style>