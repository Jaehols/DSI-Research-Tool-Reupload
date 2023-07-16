/*
Functions for performing exports of data from the Pinia store to local machine

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
*/

// Export full graph dataset as a JSON file
export function exportDataset(authorData, articleData, institutionData) {
  const test = {
    author: authorData,
    article: articleData,
    institutin: institutionData,
  };
  const blob = new Blob([JSON.stringify(test)], { type: "text/plain" });
  const e = document.createEvent("MouseEvents"),
    a = document.createElement("a");
  a.download = "graphData.json";
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}

// Generic function for exporting side panel data into a txt file
export function exportSidePanelData(dataSetArray, name) {
  let data = "";
  for (let index = 0; index < dataSetArray.length; index++) {
    const element = dataSetArray[index];
    data = data + JSON.stringify(element) + "\n\n";
  }
  const blob = new Blob([data], { type: "text/plain" });
  const e = document.createEvent("MouseEvents"),
    a = document.createElement("a");
  a.download = name + ".txt";
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
  e.initEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}
