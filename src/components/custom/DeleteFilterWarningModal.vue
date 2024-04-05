<script>
export default {
  name: "DeleteFilterWarningModal",
  emits: ["toggle-modal", "delete-filter"],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    emitToggleModalEvent() {
      this.$emit("toggle-modal");
    },
    emitDeleteFilterEvent() {
      this.$emit("delete-filter", this.name);
    }
  }
}
</script>

<template>
  <div class="modal-container">
    <div class="modal-header">
      <h3>Filter deletion</h3>
      <button
          class="close-button"
          @click="emitToggleModalEvent"
      >✖</button>
    </div>
    <div class="modal-body">
      <p>You are about to delete the filter: <span class="filter-name">{{ name }}</span>.</p>
      <p class="warning">WARNING! This action is permanent.</p>
    </div>
    <div class="modal-footer">
      <div class="flex-center">
        <div class="footer-buttons">
          <button
              class="secondary-btn"
              @click="emitToggleModalEvent"
          >CLOSE
          </button>
          <button
              class="warning-btn"
              @click="emitDeleteFilterEvent"
          >DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-weight: normal;
}

p {
  word-break: break-all;
}

.filter-name {
  font-weight: bold;
}

.modal-container {
  width: 100%;
}

.modal-container > * {
  padding: 10px 15px;
}

.modal-body {
  background-color: white;
}

.modal-footer {
  background-color: #f2f2f2;
}
.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 25px;
}

.close-button:hover {
  color: red;
}

.modal-header {
  background-color: #5ebfcc;
  padding: 5px 15px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.warning {
  margin-top: 10px;
  font-weight: bold;
  color: red;
}


</style>