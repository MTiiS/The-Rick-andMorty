import { getCharacters } from "./model/fetchData.js";

function addModalContent(itemID) {

  let characters = getCharacters();

  for (let character of characters) {
    if (character.id == itemID) {
      fetchAdditionalInf(character)
        .then((episode) => {
          character['last_seen'] = episode;
          renderModalWindow(character);
        });
    }
  }
}

// fetch character last seen inf.
function fetchAdditionalInf(currentCharacter) {
  let url = currentCharacter.episode;
  return fetch(url)
    .then( (response) => response.json() )
    .then( (episode) => {
      return episode.name;
    });
}

function renderModalWindow(currentCharacter) {

  modal.style.display = "block";
  modal.innerHTML = "";

  let img = document.createElement("img");
  img.src = currentCharacter.image;

  let modalText = document.createElement("div");
  modalText.classList.add("modal__content-text")
  createModalContentField(["name", "status", "gender", "location", "last_seen"], modalText, currentCharacter)

  let buttonClose = document.createElement("span");
  buttonClose.classList.add("modal__close-button");
  buttonClose.innerHTML = "&times";
  buttonClose.addEventListener("click", function () {
    modal.style.display = "none";
  });

  let modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");
  modalContent.append(img, modalText, buttonClose)

  modal.append(modalContent);
}

function createModalContentField(title, modalText, currentCharacter) {
  title.forEach(titleText => {
    let section = document.createElement("section");
    let h1 = document.createElement("h1");
    h1.textContent = titleText + ":";
    let p = document.createElement("p");
    p.textContent = currentCharacter[titleText];
    section.append(h1);
    section.append(p);
    modalText.append(section);
  });
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

export { addModalContent }