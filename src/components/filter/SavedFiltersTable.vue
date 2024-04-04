<script>
import FilterTableRow from "@/components/filter/table/FilterTableRow.vue";

export default {
  name: "SavedFiltersTable",
  components: {FilterTableRow},
  emits: ['delete-row'],
  props: {
    filters: {  // TODO: Will have to import here from DB instead.
      type: Array,
      default: []
    }
  },
  data() {
    return {
      filtersData: [{
        name: "uifcgUbXcYSIQrYlLLYgvADFRztDsWztKnsKoIuzjBVGnLJaJEOkBzeryfHEncGzZApMbqzhpfGguNPKGWvFgylVzuAbdxHFqVwDZFaTndRtjkGGvkehrCLnpxtLoVtWqcCIvsTUKlqQqJhSoNDMHiiwRdTIQXEMBKVWHnEvIBNbujQusqxtQmqfoSAELVPIEcsqOqyvvuuKStmVDvwRyDllosAMFnbrLqLhpGyiSmkZNrXUlrQnHwrbbXYDHzk",
        id: 1,
        criterias: [{
          filterType: "amount",
          filterParam: ">=",
          filterValue: 12
        },
          {
            filterType: "title",
            filterParam: "endsWith",
            filterValue: "Meow"
          },
          {
            filterType: "date",
            filterParam: "until",
            filterValue: "1996-02-25"
          }]
      }, {
        name: "Amogus",
        id: 3,
        criterias: [{
            filterType: "title",
            filterParam: "endsWith",
            filterValue: "Meow"
          },
          {
            filterType: "date",
            filterParam: "until",
            filterValue: "1996-02-25"
          }]
      }, {
        name: "Filter-3",
        id: 1,
        criterias: [{
          filterType: "amount",
          filterParam: ">=",
          filterValue: 12
        },
          {
            filterType: "title",
            filterParam: "endsWith",
            filterValue: "Meow"
          }]
      }]
    }
  },
  methods: {
    deleteTableRow(filterName) {
      this.$emit('delete-row', filterName);
    }
  },
}
</script>

<template>
  <div class="table-container">
    <div class="grid-container">
        <filter-table-row
            v-for="(filter, index) in filtersData"
            :filter="filter"
            :index="index"
            :key="filter.id"
            @delete-row="deleteTableRow"
        />
    </div>
</div>
</template>

<style scoped>
.table-container {
  display: flex;
  align-content: center;
  justify-content: center;
}

.grid-container {
  width: 60%;
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
</style>