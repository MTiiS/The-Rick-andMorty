import "../css/styles.css";
import initPagination from './pagination';
import { getCurrentPage } from './model/currentPage.js';
import { fetchCharacters } from './model/characters.js';

initPage();

function initPage() {
  document.addEventListener("DOMContentLoaded", function () {
    renderPage();
    initPagination({
      onPaginate: function () {
        renderPage();
      }
    });
  });
}

function renderPage() {
  let currentPage = getCurrentPage();
  rendersCards(currentPage);
}

async function rendersCards(currentPage) {
  let cards = document.querySelector(".cards");
  cards.innerHTML = "";

  let characters = await fetchCharacters(currentPage);
    for (let character of characters) {
      cards.append( renderCard(character) );
  }
}

function renderCard(character) {
  
    let card = createDomElement("div", "card");
    card.dataset.id = character.id;
    let cardImage = createDomElement("img", "card__img", character.image);
    cardImage.src = character.image;
    let cardContent = createDomElement("div", "card__content");

    let section1 = createDomElement("section");
    let section1Title = createDomElement("h1", ["card__content-item", "card__content-item_highlights"], character.name);


    let section1Text = createDomElement("ul", "card__content-item");
    let section1TextItem = createDomElement("li", null, [character.status, "-", character.gender]);
    section1Text.append(section1TextItem);

    let section2 = createDomElement("section");
    let section2Title = createDomElement("h4", ["card__content-item", "card__content-item_highlights"], "Last known location:");
    let section2Text = createDomElement("p", null, character.location);

    let section3 = createDomElement("section", "modal__openButton");
    let cardLink = createDomElement("a", "card__link", "read more...");
    cardLink.href = "#";

    section1.append(section1Title, section1Text);
    section2.append(section2Title, section2Text);
    section3.append(cardLink);

    cardContent.append(section1, section2, section3);

    card.append(cardImage, cardContent);

    return card;
}

function createDomElement(tagName, className, content) {
  let element = document.createElement(tagName);

  if (typeof className === "string") {
    element.classList.add(className);
  } else if ( Array.isArray(className) ) {
    className.forEach(item => {
      element.classList.add(item);
    });
  }

  if (typeof content === "string") {
    element.textContent = content;
  } else if ( Array.isArray(content) ) {
    element.textContent = content.join("");
  }
  return element;
}








