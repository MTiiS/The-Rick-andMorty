import {getEpisodeName} from "./episode.js";

let characters = {};

function getCharacters() {
  return characters;
}

function getCharacterById(id) {
  return getCharacterByProperty('id', id);
}

function getCharacterByProperty(propertyName, propertyValue) {
  if (propertyValue) {
    return characters.find(
      (character) => 
      character.hasOwnProperty(propertyName) && character[propertyName] === Number(propertyValue)
    );
  } else {
    return characters.find(
      (character) => character.hasOwnProperty(propertyName)
    );
  }
}

function fetchCharacters(currentPage) {

  let url = "https://rickandmortyapi.com/api/character/?page=" + currentPage;

  return fetch(url)
  .then( (response) => response.json() )
  .then( (data) => {
    if (data) {
      return characters = data.results.map( (character) => {
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
    } else return {};
  })
  .catch( (error) => console.log('error', error) );
}

async function refreshCharacter(character) {
  let url = character.episode;
  let episodeName = await getEpisodeName(url);
  character ['first_seen'] = episodeName;
}

export { fetchCharacters, getCharacters, getCharacterById, refreshCharacter };
