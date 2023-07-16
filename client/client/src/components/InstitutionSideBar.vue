<!--
Component for viewing the institution details in the sidebar

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
-->
<template>
  <el-card v-loading="store.isEmpty">
    <template #header>
      <el-link type="primary" :href="store.profile" target="_blank">{{
        store.name
      }}</el-link>
    </template>
    <el-scrollbar height="300px">
      <el-descriptions :column="1">
        <el-descriptions-item label="Country:">{{
          store.country
        }}</el-descriptions-item>
        <el-descriptions-item label="City:">{{
          store.city
        }}</el-descriptions-item>
        <el-descriptions-item label="Total Authors:">{{
          store.authorCount
        }}</el-descriptions-item>
        <el-descriptions-item label="Total Documents:">{{
          store.documentCount
        }}</el-descriptions-item>
        <el-descriptions-item>
          <el-button type="primary" plain @click="exportData()">
            Export Data
          </el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-scrollbar>
  </el-card>
</template>

<script>
import { useInstitutionStore } from "../services/data";
import { exportSidePanelData } from "../services/exportService";

export default {
  // setup required article store
  setup() {
    const store = useInstitutionStore();

    return {
      store,
    };
  },

  methods: {
    // Export the data to local machine via txt
    exportData() {
      exportSidePanelData(
        [
          this.store.name,
          this.store.profile,
          this.store.country,
          this.store.city,
          this.store.authorCount,
          this.store.documentCount,
        ],
        this.store.name
      );
    },
  },
};
</script>
