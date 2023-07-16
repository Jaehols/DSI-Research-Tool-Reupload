<!--
Component for viewing the author details in the sidebar

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
        <el-descriptions-item label="Institution:">{{
          store.institution
        }}</el-descriptions-item>
        <el-descriptions-item label="Article Count:">{{
          store.articleCount
        }}</el-descriptions-item>
        <el-descriptions-item label="Total Citations:">{{
          store.citationCount
        }}</el-descriptions-item>
        <el-descriptions-item label="Total Cited By:">{{
          store.citedByCount
        }}</el-descriptions-item>
        <el-descriptions-item label="Subject Areas:">
          <el-tag size="small" v-for="area in store.subjectAreas">{{
            area
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Publication Range:">
          <el-timeline>
            <el-timeline-item
              :key="0"
              :timestamp="store.publicationRange.start"
            >
              start
            </el-timeline-item>
            <el-timeline-item :key="1" :timestamp="store.publicationRange.end">
              end
            </el-timeline-item>
          </el-timeline>
        </el-descriptions-item>
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
import { useAuthorStore } from "../services/data";
import { exportSidePanelData } from "../services/exportService";

export default {
  // setup required article store
  setup() {
    const store = useAuthorStore();

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
          this.store.institution,
          this.store.articleCount,
          this.store.citationCount,
          this.store.citedByCount,
          this.store.subjectAreas,
          this.store.publicationRange,
        ],
        this.store.name
      );
    },
  },
};
</script>
