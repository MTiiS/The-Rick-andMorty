import { getCharacterById, fetchCharacterFirstSeenField } from "./model/characters.js";


function showCardModal(itemID) {

  let character = getCharacterById(itemID);
  fetchCharacterFirstSeenField(character)
    .then( () => {
      renderCardModal(character);
    });
}

function renderCardModal(character) {

  let modal = document.createElement("div");
  modal.classList.toggle("modal");
  modal.id = "modal";
  document.getElementById("body").append(modal);

  let img = document.createElement("img");
  img.src = character.image;

  let modalText = document.createElement("div");
  modalText.classList.add("modal__content-text")
  let characterKeys = ["name", "status", "gender", "location", "first_seen"];
  let contentSections = createContentSections(characterKeys, character);
  let [nameSection, statusSection, genderSection, locationSection, last_seenSection] = contentSections;
  modalText.append(nameSection, statusSection, genderSection, locationSection, last_seenSection);

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

window.onclick = function (event) {
  if (event.target === document.getElementById("modal")) {
    hideModal();
  }
}

function hideModal() {
  document.getElementById("modal").remove();
}

export { showCardModal };