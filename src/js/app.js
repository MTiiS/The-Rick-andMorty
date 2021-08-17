import "../css/styles.css";
import { initPagination, refreshPagination } from './pagination';
import { refreshCharacters, getCharacters } from './model/characters.js';
import { initSearch, createSearchRequest } from "./search.js";


initPage();

function initPage() {
  document.addEventListener("DOMContentLoaded", async function () {
    await renderPage();
    addPageEvents();
    initPagination({
      onPaginate: function () {
        renderPage();
      }
    });
    initSearch({
      onSearch: async function () {
        await renderPage();
        refreshPagination();
      }
    });
  });
}

async function renderPage() {
  await refreshCharacters();
  rendersCards();
}

function rendersCards() {
  let cards = document.querySelector(".cards");
  cards.innerHTML = "";

  let characters = getCharacters();

  if (characters) {
    for (let character of characters) {
      cards.append(renderCard(character));
    }
    return true;
  } else { showCharactersNotFound() }
}

function renderCard(character) {

  let card = createDomElement("div", "card");
  card.dataset.id = character.id;
  let cardImage = createDomElement("img", "card__img", character.image);
  cardImage.src = character.image;
  let cardContent = createDomElement("div", "card__content");

  let section1 = createDomElement("section");
  let section1Title = createDomElement("h1", ["card__content-title", "card__content-title_highlights"], character.name);
  card.dataset.name = character.name;


  let status = createDomElement("p", "card__content-text", "status: " + character.status);
  let statusMark = createDomElement("span", generateStatusMarkClassName(character.status), "● ");
  status.prepend(statusMark);
  status.dataset.status = character.status;

  let gender = createDomElement("p", "card__content-text", "gender: " + character.gender);
  gender.dataset.gender = character.gender;


  let section2 = createDomElement("section");
  let section2Title = createDomElement("h4", ["card__content-title", "card__content-title_highlights"], "Last known location:");
  let section2Text = createDomElement("p", "card__content-text", character.location);

  let section3 = createDomElement("section", "modal__openButton");
  let cardLink = createDomElement("a", "card__link", "read more...");
  cardLink.href = "#";

  section1.append(section1Title, status, gender);
  section2.append(section2Title, section2Text);
  section3.append(cardLink);

  cardContent.append(section1, section2, section3);

  card.append(cardImage, cardContent);

  return card;
}

function showCharactersNotFound() {
  let cards = document.querySelector(".cards");
  let error = document.createElement("h1");
  error.textContent = "oops....Characters not found"
  cards.innerHTML = "";
  cards.append(error);
}

function createDomElement(tagName, className, content) {
  let element = document.createElement(tagName);

  if (typeof className === "string") {
    element.classList.add(className);
  } else if ( Array.isArray(className) ) {
    className.forEach( (name) => {
      element.classList.add(name);
    });
  }

  if (typeof content === "string") {
    element.textContent = content;
  } else if ( Array.isArray(content) ) {
    element.textContent = content.join("");
  }
  return element;
}

function generateStatusMarkClassName(status) {
  if (status == "Dead") {
    return "card__status-mark_dead";
  } else if (status == "Alive") {
    return "card__status-mark_alive";
  }
}

function addPageEvents() {

  document.querySelector(".cards").addEventListener("click", (e) => {
    if (e.target.dataset.status) {
      createSearchRequest('status', e.target.dataset.status);
    } else if (e.target.dataset.gender) {
      createSearchRequest('gender', e.target.dataset.gender);
    }
  });
}










