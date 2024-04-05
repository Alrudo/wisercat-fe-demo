<script>
export default {
  name: "SelectionSwitchButton",
  emits: ["checked-selection"],
  props: {
    index: {
      type: Number,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    emitCheckedEvent() {
      this.$emit("checked-selection", this.index);
    }
  }
}
</script>

<template>
  <div class="radio-wrapper">
    <input
        type="radio"
        name="selection"
        class="selection-checkbox"
        :id="`selection-${index}`"
        :checked="checked"
        @change="emitCheckedEvent">
    <label :for="`selection-${index}`">Select {{ index }}</label>
  </div>
</template>

<style scoped>
input {
  margin-right: 5px;
}

.radio-wrapper {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
</style>