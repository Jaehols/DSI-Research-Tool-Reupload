<!--
Component for viewing and interacting with saved history data

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
-->
<template>
  <el-drawer
    title="Archive"
    v-model="visible"
    direction="rtl"
    @close="this.$emit('update:visible', false)"
  >
    <div style="width: 90%; display: inline-block" data-test="savedDrawer">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          style="text-align: left"
          v-for="(item, index) in store.searches"
          :key="index"
          :title="item.name"
          :name="index"
        >
          <div>Search Name: <el-input v-model="item.name" clearable /></div>
          <div>Search Term: <el-input v-model="item.term" disabled /></div>
          <div>Saved Date: <el-input v-model="item.savedAt" disabled /></div>
          <br />
          <div style="text-align: center">
            <el-button
              data-test="deleteHistoryButton"
              type="danger"
              style="width: 25%"
              plain
              @click="deleteSearch(item._id)"
            >
              <el-icon :size="20"> <Delete /> </el-icon
            ></el-button>
            <el-button
              type="info"
              style="width: 30%"
              plain
              @click="editSearch(item._id, item.name)"
            >
              Save Changes
            </el-button>
            <el-button
              type="primary"
              style="width: 30%"
              plain
              @click="applySearch(item._id)"
              >Apply</el-button
            >
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-drawer>
</template>

<script>
import { Delete, Edit } from "@element-plus/icons-vue";
import { useChartStore, useSavedSearchStore } from "../services/data";
import {
  getSavedInformation,
  deleteSavedInformation,
  editSavedSearchName,
} from "../services/saveService";

export default {
  props: ["visible"],
  emits: ["update:visible", "reloadChart"],

  // Setup required stores
  setup() {
    const store = useSavedSearchStore();
    const chartStore = useChartStore();

    return { store, chartStore };
  },

  methods: {
    // Apply the saved search result using the unique ID
    async applySearch(id) {
      const result = await getSavedInformation(id);
      this.chartStore.defaultSearch(result.searchData.body);
      this.chartStore.$patch({ isEmpty: false });
      this.$emit("reloadChart");
    },

    // Delete a saved search result using unique ID and reload component
    async deleteSearch(id) {
      const result = await deleteSavedInformation(id);
      this.$emit("reloadSavedSearches");
      return;
    },

    // Save a new name for a search result using unique ID
    async editSearch(id, newName) {
      const result = await editSavedSearchName(id, newName);
      this.$emit("reloadSavedSearches");
      return;
    },
  },
};
</script>
