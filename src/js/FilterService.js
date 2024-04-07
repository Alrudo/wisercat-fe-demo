import ApiService from "@/js/ApiService.js";

export const FilterService = {
    getAllFilters() {
        return ApiService.get("");
    },

    saveFilter(filter) {
        return ApiService.post("", filter);
    },

    updateFilter(filter) {
        return ApiService.put("", filter);
    },

    deleteFilter(id) {
        return ApiService.delete(`/${id}`);
    }
}
