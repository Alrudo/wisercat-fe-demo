<script>
import RemoveRowButton from "@/components/custom/RemoveRowButton.vue";

export default {
  name: "AddCriterionOptions",
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
      param: this.paramProp || ">",
      value: Number(this.valueProp) || 1,
      paramOptions: [
        {text: "More", value: ">"},
        {text: "More or equal", value: ">="},
        {text: "Less", value: "<"},
        {text: "Less or equal", value: "<="},
        {text: "Equal", value: "="},
        {text: "Not equal", value: "=/="}
      ]
    }
  },
  watch: {
    // Help to reset data for Chrome and Opera.
    // Seems like firefox rerenders component while others retain previous data.
    paramProp: {
      immediate: true,
      handler() {
        this.param = this.paramProp || ">";
        this.value = this.valueProp || 1;
      }
    }
  },
  methods: {
    validateInputKey(event) {
      if (event.key.length === 1 && isNaN(Number(event.key))) {
        event.preventDefault();
      }
    },
    emitChangeParamEvent() {
      this.$emit("change-param", this.param);
    },
    emitChangeValueEvent() {
      this.$emit("change-value", String(this.value));
    },
    emitDeleteRowEvent() {
      this.$emit("delete-row");
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
    >{{ option.text }}
    </option>
  </select>
  <input
      type="number"
      :class="[
          {'error-input': errored},
          'criterion-input'
      ]"
      v-model.number="value"
      @keydown="validateInputKey"
      @change="emitChangeValueEvent">
  <remove-row-button @delete-row="emitDeleteRowEvent"/>
</template>

<style scoped>
</style>