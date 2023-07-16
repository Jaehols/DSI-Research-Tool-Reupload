/*
Functions for performing searches to the backend to retrieve data

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
*/

import axios from "axios";
import { errorCatcherAxios } from "./serviceUtils.js";

// Basic search functionality with simply term and location if required, this returns the full dataset for the graph views
export async function getSearchParams(searchTerm, location) {
  if (searchTerm == "") {
    return false;
  }

  try {
    let apiCall = "";
    if (location == "Global") {
      apiCall = `http://localhost:3000/search?search-term=${searchTerm}`;
    } else {
      apiCall = `http://localhost:3000/search?search-term=${searchTerm}&country=${location}`;
    }

    const response = await axios.get(apiCall);
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}

// Advanced search functionality to include data parameters if they are passed through
export async function getSearchParamsDates(searchTerm, location, dateParam) {
  if (searchTerm == "") {
    return false;
  }

  try {
    let apiCall = "";
    if (location == "Global") {
      apiCall = `http://localhost:3000/search?search-term=${searchTerm}&date=${dateParam}`;
    } else {
      apiCall = `http://localhost:3000/search?search-term=${searchTerm}&date=${dateParam}&country=${location}`;
    }

    const response = await axios.get(apiCall);
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}

// Search for an author's full information based on their unique ID
export async function searchAuthor(authorId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/author/${authorId}`
    );
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}

// Search for an institution's full information based on their unique ID
export async function searchInstitution(institutionId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/institution/${institutionId}`
    );
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}

// Search for an articles's full information based on their unique ID
export async function searchArticle(articleId) {
  try {
    const response = await axios.get(
      `http://localhost:3000/article/${articleId}`
    );
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}
