<script>
import RemoveRowButton from "@/components/custom/RemoveRowButton.vue";

export default {
  name: "DateCriterionOptions",
  components: {RemoveRowButton},
  emits: ["change-param", "change-value", "delete-row"],
  props: {
    errored: {
      type: Boolean,
      required: true
    },
    paramProp: {
      type: String,
      required: false
    },
    valueProp: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      param: this.paramProp || "from",
      value: this.valueProp || "",
      paramOptions: [
        {text: "From", value: "from"},
        {text: "After", value: "after"},
        {text: "Until", value: "until"},
        {text: "Before", value: "before"},
        {text: "On", value: "on"}
      ]
    }
  },
  methods: {
    emitChangeParamEvent() {
      this.$emit('change-param', this.param)
    },
    emitChangeValueEvent() {
      this.$emit('change-value', this.value);
    },
    emitDeleteRowEvent() {
      this.$emit('delete-row');
    }
  }
}
</script>

<template>
  <select
      class="criterion-input"
      v-model="param"
      @change="emitChangeParamEvent">
    <option
        v-for="option in paramOptions"
        :value="option.value"
    >{{ option.text }}</option>
  </select>
  <input
      type="date"
      :class="[
          {'error-input': errored},
          'criterion-input'
          ]"
      v-model="value"
      @change="emitChangeValueEvent">
  <remove-row-button @delete-row="emitDeleteRowEvent"/>
</template>

<style scoped>
</style>