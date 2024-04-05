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
          value: 12
        },
          {
            type: "title",
            param: "endsWith",
            value: "Meow"
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
            param: "until",
            value: "1996-02-25"
          }]
      }, {
        name: "Filter-3",
        id: 15,
        selection: 2,
        criteria: [{
          type: "amount",
          param: ">=",
          value: 12
        },
          {
            type: "title",
            param: "endsWith",
            value: "Meow"
          }]
      }]
    }
  },
  created() {
    this.$bus.on("filter-data-changed", this.fetchFilters);
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
    }
  },
  destroyed() {
    this.$bus.off("filter-data-changed", this.fetchFilters);
  }
}
</script>

<template>
  <div class="table-container">
    <div class="grid-container">
      <filter-table-row
          v-for="(filter, index) in filters"
          :name="filter.name"
          :index="index"
          :key="filter.id"
          @delete-row="emitDeleteFilterEvent"
          @update-filter="emitUpdateFilterEvent"/>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.grid-container {
  width: 80%;
  padding: 15px 10px;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
}

.grid-container:nth-of-type(2n) {
  background-color: #757575;
}

.grid-container > * {
  padding: 5px;
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