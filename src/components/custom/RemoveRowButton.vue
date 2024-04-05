<script>
export default {
  name: "RemoveRowButton",
  emits: ["delete-row"],
  methods: {
    emitDeleteRowEvent() {
      this.$emit('delete-row');
    }
  }
}
</script>

<template>
  <button
      class="remove-row-button"
      @click="emitDeleteRowEvent"
  >—</button>
</template>

<style scoped>
button {
  padding: 5px 10px;
  font-weight: bold;
  color: white;
  background-color: var(--button-remove-row);
  border: 1 px solid var(--button-remove-row);
  border-radius: 5px;
}

button:hover {
  background-color: var(--button-remove-row-hover);
}
</style>