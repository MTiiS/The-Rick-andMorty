import { getCharacterById, refreshCharacter } from "./model/characters.js";


async function showCardModal(itemID) {
  let character = getCharacterById(itemID);
  await refreshCharacter(character);
  renderCardModal(character);
  addModalEvents();
}

function renderCardModal(character) {

  let modal = document.createElement("div");
  modal.classList.toggle("modal");
  document.querySelector(".body").append(modal);

  let img = document.createElement("img");
  img.src = character.image;

  let modalText = document.createElement("div");
  modalText.classList.add("modal__content-text")
  let characterKeys = ["name", "status", "gender", "location", "first_seen"];
  modalText.append(...createContentSections(characterKeys, character) );

  let buttonClose = document.createElement("span");
  buttonClose.classList.add("modal__close-button");
  buttonClose.innerHTML = "&times";
  buttonClose.addEventListener("click", function () {
    hideModal();
  });

  let modalContent = document.createElement("div");
  modalContent.classList.add("modal__content");
  modalContent.append(img, modalText, buttonClose);
  modal.append(modalContent);
}

function createContentSections(characterKeys, character) {
  return characterKeys.map(key => {
    let section = document.createElement("section");
    let title = document.createElement("h1");
    title.textContent = key + ":";
    let text = document.createElement("p");
    text.textContent = character[key];
    section.append(title, text);
    return section;
  });
}

function addModalEvents () {
  window.onclick = function (event) {
    if (event.target === document.getElementById("modal")) {
      hideModal();
    }
  }
}

function hideModal() {
  document.querySelector(".modal").remove();
}

export { showCardModal };