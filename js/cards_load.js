let characters = [];

function getCharacters() {
  
  let url  = "https://rickandmortyapi.com/api/character/?page=" + currentPage;  //получаем текущую страницу
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status != 200) { 
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); 
    } else { 
      characters = JSON.parse(xhr.response);
      characters = characters.results.map(character => {      //создаем массив персонажей  
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
    //getEpisode();
    addCards();
  }; 
}

function addCards() {    //создание карточки персонажа

  let card = "";

  for (character of characters) {
    card += `<div class="list-items">
               <div class="imageWrapper"><img src="${character.image}" alt="${character.name}" > </div>	
               <div class="contentWrraper">
                 <section><h1><span class="highlights">${character.name}</span></h1>  <ul><li class"red">${character.status} - ${character.gender}<ul></li></p> </section>
                 <section><h4><span class="highlights">Last known location:</span> ${character.location}</h4></section>   
                 <section><h4><span class="highlights">First seen in: </span></h4></section>
               </div>
             </div>`
	}
  
  let items = document.querySelector(".container-items");
  items.innerHTML = card;
}

/*  нужно реализовать получение имени эпизода где впервые встретился персонаж
function getEpisode(){
  for (character of characters) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', character.episode);
    xhr.send();
   xhr.onload = () => {
     let episode = JSON.parse(xhr.response).name; 
    }
  }
}*/

getCharacters();


