/*
Utility functions for assisting in service classes

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
*/

// Boilerplate axios error catching code to ensure that alerts are appropriate
export function errorCatcherAxios(error) {
  if (error.response) {
    alert(error.response.status + " " + error.response.statusText);
  } else if (error.request) {
    alert(error.request);
  } else {
    alert(error.message);
  }
}
