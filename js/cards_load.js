
let characters = [];
 var episode ;



function getCharacters(){
let url  = "https://rickandmortyapi.com/api/character/?page=" + currentPage;  //получаем текущую страницу
let xhr = new XMLHttpRequest();


xhr.open('GET', url);
xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { 
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); 
  } else { 
    characters = JSON.parse(xhr.response);
    addCards();
     
  }
};
}

function getEpisode(url){
	 return new Promise((resolve, reject) => {

let xhr = new XMLHttpRequest();


xhr.open('GET', url);
xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { 
    alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); 
  } else { 
   episode = JSON.parse(xhr.response);
   resolve(episode.name);
  }
  
};

});
}




function addCards() {

  let card = "";

  for (key in characters.results) {
  	 let promise = getEpisode(characters.results[key].episode['0']);
  	console.log((promise));

console.log('1');
   card += `<div class="list-items">
     <div class="imageWrapper"><img src="${characters.results[key].image}" alt="${characters.results[key].name}" >  </div>	
     <div class="contentWrraper">
     <section> <h1>${characters.results[key].name}</h1>  <ul><li class"red">${characters.results[key].status} - ${characters.results[key].species}<ul></li></p> </section>
     <section><h4>Last known location: ${characters.results[key].location.name}</h4></section>   
     <section><h4> First seen in:  </h4></section>



   </div>

   </div>
  `

	}
  
  let items = document.querySelector(".container-items");
  items.innerHTML = card;

}


getCharacters();

