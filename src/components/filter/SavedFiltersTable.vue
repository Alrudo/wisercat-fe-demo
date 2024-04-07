<script>
import FilterTableRow from "@/components/filter/table/FilterTableRow.vue";
import { FilterService } from "@/js/FilterService.js";

export default {
  name: "SavedFiltersTable",
  components: {FilterTableRow},
  emits: ["delete-filter", "update-filter"],
  data() {
    return {
      filters: []
    }
  },
  created() {
    this.$bus.on("filter-data-changed", this.fetchFilters);
    this.$bus.on("perform-filter-deletion", this.deleteExistingFilter);
    this.fetchFilters();
  },
  methods: {
    fetchFilters() {
      console.log("Fetching data!")
      FilterService.getAllFilters()
          .then(response => this.filters = response.data);
    },
    emitDeleteFilterEvent(index) {
      this.$emit("delete-filter", this.filters[index]);
    },
    emitUpdateFilterEvent(index) {
      this.$emit("update-filter", this.filters[index]);
    },
    deleteExistingFilter(id) {
      FilterService.deleteFilter(id)
          .then(this.fetchFilters);
    }
  },
  destroyed() {
    this.$bus.off("filter-data-changed", this.fetchFilters);
    this.$bus.off("perform-filter-deletion", this.deleteExistingFilter);
  }
}
</script>

<template>
  <div class="table-container">
    <div
        class="grid-container"
        v-if="filters.length > 0">
      <filter-table-row
          v-for="(filter, index) in filters"
          :name="filter.name"
          :index="index"
          :key="filter.id"
          @delete-row="emitDeleteFilterEvent"
          @update-filter="emitUpdateFilterEvent"/>
    </div>
    <div
        class="no-content"
        v-else>
      <p>There is currently no saved filters to display.</p>
      <p>Try adding one.</p>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  margin-bottom: 40px;
}

.grid-container {
  width: 80%;
  margin: 15px 10px;
  display: grid;
  gap: 10px;
  border: 1px solid #cecece;
  border-radius: 5px;
  grid-template-columns: 1fr;
}

.grid-container:nth-of-type(2n) {
  background-color: #757575;
}

.grid-container > * {
  padding: 5px;
}

.no-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .grid-container {
    width: 100%;
    margin: 0;
  }
}

@media only screen and (min-width: 1200px) {
  .grid-container {
    width: 60%;
  }
}
</style>