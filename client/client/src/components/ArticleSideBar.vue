<!--
Component for viewing the article details in the sidebar

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
-->
<template>
  <el-card v-loading="store.isEmpty">
    <template #header>
      <el-link type="primary" :href="store.link" target="_blank">{{
        store.name
      }}</el-link>
    </template>
    <el-scrollbar height="300px">
      <el-descriptions :column="1">
        <el-descriptions-item label="Institutions:">
          <el-tag size="default" v-for="inst in store.institution">{{
            inst
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Authors:">
          <el-tag size="default" v-for="author in store.author">{{
            author
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Publication:">{{
          store.publicationName
        }}</el-descriptions-item>
        <el-descriptions-item label="Cited By:">{{
          store.citedByCount
        }}</el-descriptions-item>
        <el-descriptions-item label="Cover Date:">{{
          store.coverDate
        }}</el-descriptions-item>
        <el-descriptions-item label="Abstract:">{{
          store.abstract
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
import { useArticleStore } from "../services/data";
import { exportSidePanelData } from "../services/exportService";

export default {
  // setup required article store
  setup() {
    const store = useArticleStore();

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
          this.store.link,
          this.store.institution,
          this.store.author,
          this.store.publicationName,
          this.store.citedByCount,
          this.store.coverDate,
          this.store.abstract,
        ],
        this.store.name
      );
    },
  },
};
</script>
