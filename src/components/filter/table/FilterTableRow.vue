<script>
import RemoveRowButton from "@/components/custom/RemoveRowButton.vue";

export default {
  name: "FilterTableRow",
  components: {RemoveRowButton},
  emits: ["delete-row"],
  props: {
    filter: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<template>
  <div class="grid-row">
    <p class="row-index">{{ index + 1 + ":" }}</p>
    <div class="filter-name-container">
      <p class="filter-name">{{ filter["name"] }}</p>
    </div>
    <div class="flex-center">
      <button class="main-btn show-modal">Edit</button>
    </div>
  </div>

</template>

<style scoped>
.grid-row {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 20fr 1fr;
}

.grid-row:nth-child(2n + 1) {
  background-color: #cccccc;
}

.row-index {
  font-weight: bold;
  margin-right: 20px;
}

.filter-name-container p {
  word-break: break-all;
}
</style>