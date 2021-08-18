import { getCurrentPage } from "./currentPage.js";
import { getSearchRequest } from "../search.js"


function fetchCharacters() {
  let searchRequest = getSearchRequest();
  let currentPage = getCurrentPage();
  let url = "https://rickandmortyapi.com/api/character/?page=" + currentPage + "&" + searchRequest;

  return fetch(url)
    .then( (response) => response.json() )
    .catch( (error) => console.log('error', error) );
}

async function fetchEpisode(url) {
  let episodeResponse = await fetch(url);
  return episodeResponse.json();
}

export { fetchEpisode, fetchCharacters };