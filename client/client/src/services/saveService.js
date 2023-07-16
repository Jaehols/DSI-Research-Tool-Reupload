/*
Functions for performing backend communication for saving and retieving saved data

James Hollingsworth
Haiyao Yan

10-2022
Written for the purposes of SWEN90014 University of Melbourne
*/

import axios from "axios";

// Save full set of search information to the backend
export async function saveSearch(searchQuery, authors, articles, institutions) {
  const body = {
    author: authors,
    article: articles,
    institution: institutions,
  };
  try {
    const response = await axios.post(
      `http://localhost:3000/saved-search?search-term=${searchQuery}`,
      {
        body: {
          author: authors,
          article: articles,
          institution: institutions,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}

// Get full set of saved search information from the backend
export async function getSavedSearches() {
  try {
    const response = await axios.get("http://localhost:3000/saved-search");
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}

// Get full contents of saved search by database ID
export async function getSavedInformation(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/saved-search/${id}`
    );
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}

// Delete contents of saved search by database ID
export async function deleteSavedInformation(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/saved-search/${id}`
    );
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}

// Save edited name of saved search back to database by ID
export async function editSavedSearchName(id, name) {
  try {
    const response = await axios.put(
      `http://localhost:3000/saved-search/${id}?name=${name}`
    );
    return response.data;
  } catch (error) {
    errorCatcherAxios(error);
    return false;
  }
}
