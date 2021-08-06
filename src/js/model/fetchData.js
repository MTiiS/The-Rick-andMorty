let characters = {};

function getCharacters() {
  return characters;
}

function fetchCharacters(currentPage) {

  let url = "https://rickandmortyapi.com/api/character/?page=" + currentPage;

  return fetch(url)
    .then( (response) => response.json() )
    .then( (data) => {
      return characters = data.results.map( (character) => {
        //const { id, image, name, status, gender, location, episode} = character ? character : {};
        //return {id, image, name, status, gender, location, episode};
        return {
          id: character.id,
          image: character.image,
          name: character.name,
          status: character.status,
          gender: character.gender,
          location: character.location.name,
          episode: character.episode[0]
        };
      })
    })
    .catch( (error) => console.log('error', error) );
}

export { fetchCharacters, getCharacters }
