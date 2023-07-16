<!--
Component for advanced search functionality 

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
-->
<template>
  <el-dialog
    data-test="advancedSearch"
    title="Advanced Search"
    v-model="visible"
    height="70%"
    @close="this.$emit('update:visible', false)"
  >
    <el-alert
      title="Invalid Search Attempt, Please Ensure Valid Parameters"
      type="error"
      show-icon
      v-show="alertVisible"
      v-bind:closable="false"
      center
    />
    <el-row justify="center">
      <div style="margin-bottom: 20px; text-align: center">
        Please enter all terms separated by a comma and space. For Example:
        [Health, Covid, Masks]
      </div>
    </el-row>
    <el-form ref="form" :model="form" label-width="205px">
      <el-form-item label="With all of the words:">
        <el-input data-test="withAllField" v-model="form.withAll"></el-input>
      </el-form-item>

      <el-form-item label="With at least one of the words:">
        <el-input v-model="form.withLeast"></el-input>
      </el-form-item>

      <el-form-item label="Without the words:">
        <el-input v-model="form.without"></el-input>
      </el-form-item>

      <el-form-item label="Location">
        <el-radio-group v-model="form.location">
          <el-radio-button label="Australia" />
          <el-radio-button label="Global" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Earliest Year">
        <el-date-picker
          v-model="form.startYear"
          type="year"
          placeholder="Pick Earliest Year"
        />
      </el-form-item>
      <el-form-item label="Latest Year">
        <el-date-picker
          v-model="form.endYear"
          type="year"
          placeholder="Pick Latest Year"
        />
      </el-form-item>
      <el-form-item label="Filter By Dates">
        <el-checkbox v-model="form.searchByDate" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        data-test="advSearchButton"
        type="primary"
        @click="
          advanceSearch(
            form.withAll,
            form.withLeast,
            form.without,
            form.location,
            form.startYear,
            form.endYear,
            form.searchByDate
          )
        "
        >Search</el-button
      >
      <el-button
        data-test="advCancelButton"
        @click="
          this.$emit('update:visible', false), (this.alertVisible = false)
        "
        >Cancel</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["visible"],
  emits: ["update:visible"],

  // Set default data values and definite components
  data() {
    return {
      form: {
        withAll: "",
        withLeast: "",
        without: "",
        location: "Global",
        startYear: null,
        endYear: null,
        searchByDate: false,
      },
      alertVisible: false,
      closability: false,
    };
  },

  // Local methods for the component
  methods: {
    advanceSearch(
      andItems,
      orItems,
      notItems,
      location,
      startDate,
      endDate,
      searchByDate
    ) {
      // Make sure the inputs are valid
      if (
        this.checkEmpty(andItems, orItems, notItems) ||
        this.checkValidity(andItems, orItems, notItems) ||
        this.checkValidDates(startDate, endDate, searchByDate)
      ) {
        this.alertVisible = true;
        return;
      }

      this.alertVisible = false;
      let query = this.searchFormatter(andItems, orItems, notItems);
      this.$emit("update:visible", false);
      if (!searchByDate) {
        this.$emit("search", query, location);
      } else {
        const dateParam = this.formatDate(startDate, endDate);
        this.$emit("dateSearch", query, location, dateParam);
      }
    },

    // Format the search with logical elements
    searchFormatter(andItems, orItems, notItems) {
      const andArray = andItems.split(", ");
      const orArray = orItems.split(", ");
      const notArray = notItems.split(", ");
      let composedString = "KEY(";

      //Adding in ORs
      composedString += orArray[0];
      for (let index = 1; index < orArray.length; index++) {
        composedString += "+OR+";
        composedString += orArray[index];
      }

      //Adding in ANDs
      if (andArray[0] == "" || orArray[0] == "") {
        composedString += andArray[0];
      } else {
        composedString += "+AND+";
        composedString += andArray[0];
      }
      for (let index = 1; index < andArray.length; index++) {
        composedString += "+AND+";
        composedString += andArray[index];
      }

      //Adding in AND NOTs
      if (notArray[0] == "") {
        composedString += notArray[0];
      } else {
        composedString += "+AND+NOT+";
        composedString += notArray[0];
      }
      for (let index = 1; index < notArray.length; index++) {
        composedString += "+AND+NOT+";
        composedString += notArray[index];
      }

      composedString += ")";
      return composedString;
    },

    // Functions for checking input validity
    checkValidity(andItems, orItems, notItems) {
      if (andItems == "" && orItems == "" && notItems != "") {
        return true;
      } else {
        return false;
      }
    },

    checkEmpty(andItems, orItems, notItems) {
      if (andItems == "" && orItems == "" && notItems == "") {
        return true;
      } else {
        return false;
      }
    },

    checkValidDates(startDate, endDate, searchByDate) {
      if (!searchByDate) {
        return false;
      }
      if (startDate == null && endDate == null) {
        return true;
      }

      if (startDate == null || endDate == null) {
        return false;
      }
      return !(startDate <= endDate);
    },

    // Formatting the date to be interpreted by backend
    formatDate(startDate, endDate) {
      if (startDate == null) {
        return endDate.getFullYear();
      }
      if (endDate == null) {
        return startDate.getFullYear();
      }

      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      if (startYear == endYear) {
        return startYear;
      } else {
        return startYear + "-" + endYear;
      }
    },
  },
};
</script>
