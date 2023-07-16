<!--
Vue component for displaying the apache echart 

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
-->
<template>
  <el-container style="height: 100%">
    <el-header height="auto">
      <el-radio-group v-model="radio" @change="changeView">
        <el-radio
          label="Authors"
          v-if="this.store.currNode == null || radio == 'Authors'"
          >Authors</el-radio
        >
        <el-radio
          label="Articles"
          v-if="this.store.currNode == null || radio == 'Articles'"
          >Articles</el-radio
        >
        <el-radio
          label="Institutions"
          v-if="this.store.currNode == null || radio == 'Institutions'"
          >Institutions</el-radio
        >
      </el-radio-group>
      <div v-if="this.store.currNode != null">
        <el-button type="primary" @click="goBack">Return</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside v-if="!this.store.isEmpty" width="200px">
        <el-descriptions
          :title="'Relationship of ' + radio"
          :column="1"
          style="margin-top: 80px"
        >
          <el-descriptions-item label="Total Nodes">{{
            this.store.numNodes(radio)
          }}</el-descriptions-item>
          <el-descriptions-item label="Total Links">{{
            this.store.numLinks(radio)
          }}</el-descriptions-item>
          <el-descriptions-item label="Current Node">{{
            this.store.currNode
          }}</el-descriptions-item>
        </el-descriptions>
      </el-aside>
      <el-main>
        <div id="chart" style="width: 100%; height: 100%"></div>
      </el-main>
      <el-aside
        width="25%"
        :style="{
          visibility: this.store.currNode == null ? 'hidden' : 'visible',
        }"
        style="padding-top: 60px"
      >
        <AuthorSideBar v-if="radio == 'Authors'" />
        <ArticleSideBar v-if="radio == 'Articles'" />
        <InstitutionSideBar v-if="radio == 'Institutions'" />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import * as echarts from "echarts";
import {
  useAuthorStore,
  useChartStore,
  useInstitutionStore,
  useArticleStore,
} from "../services/data";
import {
  searchAuthor,
  searchInstitution,
  searchArticle,
} from "../services/searchService";
import AuthorSideBar from "./AuthorSideBar.vue";
import ArticleSideBar from "./ArticleSideBar.vue";
import InstitutionSideBar from "./InstitutionSideBar.vue";

var myChart;

window.onresize = function () {
  myChart.resize();
};

export default {
  name: "chart",

  // Set up required stores (specific info stores are required for child components)
  setup() {
    const store = useChartStore();
    const authorStore = useAuthorStore();
    const institutionStore = useInstitutionStore();
    const articleStore = useArticleStore();

    return {
      store,
      authorStore,
      institutionStore,
      articleStore,
    };
  },

  // Setting up echart when mounted
  mounted() {
    myChart = echarts.init(document.getElementById("chart"));

    myChart.on("click", (params) => {
      if (params.dataType === "node") {
        this.clickNode(this.nodeArray[params.dataIndex].originalIndex);
      }
    });

    myChart.setOption(this.option);
  },
  components: {
    AuthorSideBar,
    ArticleSideBar,
    InstitutionSideBar,
  },

  // Define default values and echart parameters
  data() {
    return {
      radio: this.store.currView, // current chart view option
      chart: myChart,
      nodeArray: [],
      option: {
        tooltip: {}, // what will be shown when node get focused
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "force",
            roam: true,
            label: {
              position: "right",
              formatter: "{b}",
            },
            lineStyle: {
              color: "source",
              curveness: 0.3,
            },
            scaleLimit: {
              min: 1.3,
              max: 10,
            },
            // emphasis edge when focused
            emphasis: {
              focus: "adjacency",
              lineStyle: {
                width: 10,
              },
            },
            // automatically layout nodes
            force: {
              edgeLength: [20, 50],
              repulsion: 20,
              gravity: 0.25,
              layoutAnimation: true,
              friction: 0.1,
            },
          },
        ],
      },
    };
  },

  // Local methods
  methods: {
    // display main graph
    showEchart() {
      // initialise echart with basic config
      // load search result from useChartStore
      this.getDataforGraph();

      this.showDescr = true; // show graph description
    },

    // update graph data with current view option
    changeView(view) {
      this.store.$patch({ currView: this.radio });
      this.getDataforGraph();
    },

    async clickNode(id) {
      if (this.store.currNode != null) {
      } else {
        // switch to subgraph
        this.store.$patch({ currNode: id });

        // Searches for the details of what was clicked
        switch (this.radio) {
          case "Authors":
            const authorResult = await this.localSearchAuthor(id);
            this.authorStore.getAuthorResults(authorResult);
            break;
          case "Articles":
            const articuleResult = await this.localSearchArticle(id);
            this.articleStore.getArticleResults(articuleResult);
            break;
          case "Institutions":
            const instResult = await this.localSearchInstitution(id);
            this.institutionStore.getInsitutionResults(instResult);
            break;
          default:
            // invalid option
            break;
        }

        this.getDataforGraph();
      }
    },

    // Reset the current view after looking at subgraph
    goBack() {
      this.store.$patch({ currNode: null });
      this.authorStore.$patch({ isEmpty: true });
      this.articleStore.$patch({ isEmpty: true });
      this.institutionStore.$patch({ isEmpty: true });
      this.getDataforGraph();
      myChart.resize();
    },

    // Call author search
    async localSearchAuthor(index) {
      let result = await searchAuthor(this.store.author.nodes[index].id);
      if (!result) {
        return;
      }
      return result;
    },

    // Call article search
    async localSearchArticle(index) {
      let result = await searchArticle(this.store.article.nodes[index].id);
      if (!result) {
        return;
      }
      return result;
    },

    // Call institution search
    async localSearchInstitution(index) {
      let result = await searchInstitution(
        this.store.institution.nodes[index].id
      );
      if (!result) {
        return;
      }
      return result;
    },

    getDataforGraph() {
      let response = this.store.getGraph();
      this.nodeArray = response.series[0].data;
      myChart.setOption(response);
    },
  },
};
</script>
