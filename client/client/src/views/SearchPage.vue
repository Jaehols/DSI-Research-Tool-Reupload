<!--
Only view for the web application GUI, all components are contained from this main view

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
-->
<template>
  <el-container style="height: 100%">
    <el-header height="auto" style="text-align: center; padding-top: 30px">
      <div style="margin-bottom: 20px">
        <h1>Defence Science Institute</h1>
      </div>
      <el-row gutter="20" justify="center">
        <el-button @click="advSearchVisible = true" type="info"
          >Advanced Search</el-button
        >
        <AdvanceSearch
          @search="search"
          @dateSearch="dateSearch"
          v-model:visible="advSearchVisible"
        />

        <el-input
          data-test="searchTerm"
          v-model="searchTerm"
          style="width: 400px; padding-left: 10px; padding-right: 10px"
          :clearable="true"
          placeholder="Enter keywords.."
        />
        <el-button
          data-test="searchButton"
          @click="search(searchTerm, location)"
          icon="Search"
          type="primary"
          circle
        ></el-button>
        <el-button
          data-test="saveButton"
          type="primary"
          @click="saveCurrentSearch()"
          >Save</el-button
        >
      </el-row>
      <div style="position: relative; top: 10px">
        <el-radio-group v-model="location">
          <el-radio-button label="Australia" />
          <el-radio-button label="Global" />
        </el-radio-group>

        <el-button
          data-test="filterButton"
          type="primary"
          plain
          @click="filterVisible = true"
          style="margin-left: 16px"
          v-show="true"
        >
          Filter Options
        </el-button>
        <el-button
          data-test="openSavedHistory"
          type="primary"
          plain
          @click="(historyVisible = true), localGetSavedSearches()"
          style="margin-left: 16px; width: auto"
        >
          Archive Bar
        </el-button>
        <el-button
          type="primary"
          plain
          @click="exportData()"
          style="margin-left: 16px; width: auto"
        >
          Export Data
        </el-button>
        <FilterDialog
          @reloadChart="onLoadChart"
          v-model:visible="filterVisible"
        />
        <SavedHistory
          @reloadChart="onLoadChart"
          @reloadSavedSearches="localGetSavedSearches"
          v-model:visible="historyVisible"
        />
      </div>
    </el-header>
    <el-main>
      <ChartTest ref="chart" />
    </el-main>
  </el-container>
</template>

<script>
import ChartTest from "../components/ChartTest.vue";
import AdvanceSearch from "../components/AdvanceSearch.vue";
import FilterDialog from "../components/FilterDialog.vue";
import SavedHistory from "../components/SavedHistory.vue";
import { exportDataset } from "../services/exportService";
import { useChartStore, useSavedSearchStore } from "../services/data";
import {
  getSearchParams,
  getSearchParamsDates,
} from "../services/searchService";
import { saveSearch, getSavedSearches } from "../services/saveService";

export default {
  // Setup stores
  setup() {
    const store = useChartStore();
    const savedStore = useSavedSearchStore();

    return {
      store,
      savedStore,
    };
  },
  mounted() {
    this.onLoadChart();
  },

  // Set default data values and definite components
  data() {
    return {
      location: "Global",
      advSearchVisible: false,
      filterVisible: false,
      historyVisible: false,
      searchTerm: "",
    };
  },
  components: {
    ChartTest,
    AdvanceSearch,
    FilterDialog,
    SavedHistory,
  },

  // Local methods for the component
  methods: {
    showChart() {
      this.$refs.chart.showEchart();
    },

    // Only loads chart when store is nonempty
    onLoadChart() {
      if (!this.store.isEmpty) {
        this.showChart();
      }
    },

    // Export data to file
    exportData() {
      exportDataset(
        this.store.author,
        this.store.article,
        this.store.institution
      );
    },

    // Main search functionality
    async search(term, location) {
      this.store.searchQuery = term;
      this.store.searchLocation = location;
      let result = await getSearchParams(term, location);
      if (!result) {
        return;
      }
      this.store.defaultSearch(result);
      this.store.$patch({ isEmpty: false });
      this.onLoadChart();
    },

    // Search function including dates
    async dateSearch(term, location, dateParam) {
      this.store.searchQuery = term;
      this.store.searchLocation = location;
      let result = await getSearchParamsDates(term, location, dateParam);
      if (!result) {
        return;
      }
      this.store.defaultSearch(result);
      this.store.$patch({ isEmpty: false });
      this.onLoadChart();
    },

    // Save the current search data to backend
    async saveCurrentSearch() {
      let reply = await saveSearch(
        this.store.searchQuery,
        this.store.author,
        this.store.article,
        this.store.institution
      );
      if (!reply) {
        return;
      }
    },

    // Get saved searches from backend
    async localGetSavedSearches() {
      let reply = await getSavedSearches();
      if (!reply) {
        return;
      }
      this.savedStore.getSavedSearchResults(reply);
    },
  },
};
</script>
