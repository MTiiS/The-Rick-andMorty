import { fetchEpisode } from "./episode.js";

let characters = {};

function getCharacters() {
  return characters;
}

function getCharacterById(id) {
  return getCharacterByProperty('id', id);
}

function getCharacterByProperty(propertyName, propertyValue) {
  if (propertyValue) {
    return characters.find((character) => {
        character[propertyName] === Number(propertyValue)
    });
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

async function setCharacterEpisodeName(character) {
  let url = character.episode;
  let episode = await fetchEpisode(url);
  character['first_seen'] = episode.name;
}

export { fetchCharacters, getCharacters, getCharacterById, setCharacterEpisodeName };
