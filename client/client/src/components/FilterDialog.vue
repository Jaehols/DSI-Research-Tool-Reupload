<!--
Component for changing filter parameters

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
-->
<template>
  <el-drawer
    title="Filter"
    v-model="visible"
    direction="ltr"
    style="width: 80%"
    @close="this.$emit('update:visible', false)"
  >
    <div style="width: 90%; display: inline-block" data-test="filterDrawer">
      <el-menu
        :default-openeds="['2', '3']"
        style="text-align: left; font-size: 14px"
      >
        <el-sub-menu index="2">
          <template #title
            ><span class="title-color"
              >By Top Percentage of Citations</span
            ></template
          >
          <el-menu-item
            index="2-1"
            data-test="percentButton"
            @click="topPercent = 10"
            >10%</el-menu-item
          >
          <el-menu-item index="2-2" @click="topPercent = 30">30%</el-menu-item>
          <el-menu-item index="2-3" @click="topPercent = 50">50%</el-menu-item>
          <el-menu-item index="2-4" @click="topPercent = 100"
            >100%</el-menu-item
          >
          <el-menu-item index="2-5">
            <input
              data-test="percentInput"
              type="Number"
              style="width: 60%; font-size: 14px; height: 45%"
              v-model="topPercent"
            /><label>&nbsp;%</label>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title
            ><span class="title-color"
              >By Minimum Number of Connections</span
            ></template
          >
          <el-menu-item index="3-6" @click="minConnections = 0">0</el-menu-item>
          <el-menu-item
            index="3-1"
            data-test="percentButton"
            @click="minConnections = 5"
            >5</el-menu-item
          >
          <el-menu-item index="3-2" @click="minConnections = 10"
            >10</el-menu-item
          >
          <el-menu-item index="3-3" @click="minConnections = 15"
            >15</el-menu-item
          >
          <el-menu-item index="3-4" @click="minConnections = 20"
            >20</el-menu-item
          >
          <el-menu-item index="3-5">
            <input
              data-test="percentInput"
              type="Number"
              style="width: 60%; font-size: 14px; height: 45%"
              v-model="minConnections"
            /><label>&nbsp;</label>
          </el-menu-item>
        </el-sub-menu>
        <div style="padding-top: 50px">
          <el-button
            data-test="applyFilterButton"
            type="primary"
            style="width: 40%; position: absolute"
            @click="applyFilter(topPercent, minConnections)"
            >Apply</el-button
          >
          <el-button
            @click="this.$emit('update:visible', false)"
            style="width: 40%; position: relative; margin-left: 50%"
            >Cancel</el-button
          >
        </div>
      </el-menu>
    </div>
  </el-drawer>
</template>

<script>
import { useChartStore } from "../services/data";

export default {
  props: ["visible"],
  emits: ["update:visible"],

  // Define chart store to change filter variables
  setup() {
    const store = useChartStore();
    return { store };
  },

  data() {
    return {
      topPercent: 100,
      minConnections: 0,
    };
  },

  methods: {
    // Apply filter params and reload chart
    applyFilter(topPercent, minConnections) {
      this.store.$patch({ topPercentageToShow: topPercent });
      this.store.$patch({ minConnections: minConnections });
      this.$emit("reloadChart");
      this.$emit("update:visible", false);
    },
  },
};
</script>
