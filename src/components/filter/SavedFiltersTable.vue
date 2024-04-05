<script>
import FilterTableRow from "@/components/filter/table/FilterTableRow.vue";

export default {
  name: "SavedFiltersTable",
  components: {FilterTableRow},
  emits: ["delete-filter", "update-filter"],
  data() {
    return {
      filters: [{ // TODO: Will have to import here from DB instead.
        name: "uifcgUbXcYSIQrYlLLYgvADFRztDsWztKnsKoIuzjBVGnLJaJEOkBzeryfHEncGzZApMbqzhpfGguNPKGWvFgylVzuAbdxHFqVwDZFaTndRtjkGGvkehrCLnpxtLoVtWqcCIvsTUKlqQqJhSoNDMHiiwRdTIQXEMBKVWHnEvIBNbujQusqxtQmqfoSAELVPIEcsqOqyvvuuKStmVDvwRyDllosAMFnbrLqLhpGyiSmkZNrXUlrQnHwrbbXYDHzk",
        id: 1,
        selection: 3,
        criteria: [{
          type: "amount",
          param: ">=",
          value: "72"
        },
          {
            type: "title",
            param: "endsWith",
            value: "World!"
          },
          {
            type: "date",
            param: "until",
            value: "1996-02-25"
          }]
      }, {
        name: "Amogus",
        id: 3,
        selection: 1,
        criteria: [{
          type: "title",
          param: "endsWith",
          value: "Meow"
        },
          {
            type: "date",
            param: "on",
            value: "1996-02-25"
          }]
      }, {
        name: "Filter-3",
        id: 15,
        selection: 2,
        criteria: [{
          type: "amount",
          param: "<",
          value: "125"
        },
          {
            type: "title",
            param: "contains",
            value: "Meow"
          }]
      }]
    }
  },
  created() {
    this.$bus.on("filter-data-changed", this.fetchFilters);
    this.$bus.on("perform-filter-deletion", this.deleteExistingFilter);
  },
  methods: {
    fetchFilters() {
      // TODO: Make an Axios request and update the existing filters.
      // TODO: Should be sorted by name on backend.
      console.log("Data has been fetched.");
    },
    emitDeleteFilterEvent(index) {
      this.$emit("delete-filter", this.filters[index]);
    },
    emitUpdateFilterEvent(index) {
      this.$emit("update-filter", this.filters[index]);
    },
    deleteExistingFilter(filter) {
      // TODO: Make an Axios request and update the existing filters.
      console.log("I want to delete this filter:");
      console.log(filter);
      this.filters = this.filters.filter(it => it.id !== filter.id);
      this.fetchFilters();
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
  }
}

@media only screen and (min-width: 1200px) {
  .grid-container {
    width: 60%;
  }
}
</style>