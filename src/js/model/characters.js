import { fetchCharacters, fetchEpisode } from "./rickAndMortyApi.js";


let _characters = [];
let _totalPages = 0;

function setCharacters(characters) {
  _characters = characters;
}

function getCharacters() {
  return _characters;
}

function setTotalPages(pages) {
  _totalPages = pages;
}

function getTotalPages() {
  return _totalPages;
}

function getCharacterById(id) {
  return getCharacterByProperty( 'id', Number(id) );
}

function getCharacterByProperty(propertyName, propertyValue) {
  let characters = getCharacters();
  if (propertyValue) {
    return characters.find( (character) => {
      return character[propertyName] === propertyValue 
    });

  }
}

async function refreshCharacters() {

  let totalPages = 0;
  let characters = null;

  let apiData = await fetchCharacters();
  if (apiData && !apiData.error) {
    totalPages = apiData.info.pages;
    characters = apiData.results.map( (character) => {
      return {
        id: character.id || null,
        image: character.image,
        name: character.name,
        status: character.status,
        gender: character.gender,
        location: character.location.name,
        episode: character.episode[0] || null
      };
    });
  }
  setCharacters(characters);
  setTotalPages(totalPages);
  return [];
}

async function setCharacterEpisodeName(character) {
  let url = character.episode;
  let episode = await fetchEpisode(url);
  character['first_seen'] = episode.name;
}

export { refreshCharacters, getCharacters, getCharacterById, setCharacterEpisodeName, getTotalPages };