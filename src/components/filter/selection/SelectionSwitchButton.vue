<script>
export default {
  name: "SelectionSwitchButton",
  props: {
    index: {
      type: Number,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<template>
  <div class="radio-wrapper">
    <input
        type="radio"
        class="selection-checkbox"
        :id="`selection-${index}`"
        name="selection"
        :checked="checked"
    >
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