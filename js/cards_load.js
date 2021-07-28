let characters = [];

function getCharacters() {
  
  let url  = "https://rickandmortyapi.com/api/character/?page=" + currentPage;       //url for api
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status != 200) { 
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); 
    } else { 
      characters = JSON.parse(xhr.response);
      characters = characters.results.map(character => {                            
        return {
          image: character.image,
          name: character.name,
          status: character.status,
          gender: character.gender,
          location: character.location.name,
          episode: character.episode[0]
        };
      });
     }
    addCards();
  }; 
}

function addCards() {                                                               //creating character card

  let card = "";

  for (character of characters) {
    card += `<div class="cards-item">
               <div class="imageWrapper"><img src="${character.image}" alt="${character.name}" > </div>	
               <div class="contentWrapper">
                 <section><h1><span class="highlights">${character.name}</span></h1>  <ul><li class"red">${character.status} - ${character.gender}<ul></li></p> </section>
                 <section><h4><span class="highlights">Last known location:</span> ${character.location}</h4></section>   
                 <section><h4><span class="highlights">First seen in: </span></h4></section>
               </div>
             </div>`
	}
  
  let items = document.querySelector(".cards");
  items.innerHTML = card;
}


getCharacters();
