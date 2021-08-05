import "../css/styles.css"
import pagination from './pagination';
import { getCurrentPage } from './model/currentPage.js'
import { fetchCharacters } from './model/fetchData.js'


document.addEventListener("DOMContentLoaded", function (event) {
  renderPage();
  pagination({
    onPaginate: function () {
      renderPage();
    }
  });
});

function renderPage() {
  let currentPage = getCurrentPage();
  rendersCards(currentPage);
}


function rendersCards(currentPage) {
  fetchCharacters(currentPage).then((data) => {
    renderCardItem(data)
  });
}

function renderCardItem(characters) {

  let cards = document.querySelector(".cards");
  cards.innerHTML = "";
  for (let character of characters) {
    let card = createDomElement("div", "card");
    card.dataset.id = character.id;
    let cardImage = createDomElement("img", "card__img", character.image);
    cardImage.src = character.image;
    let cardContent = createDomElement("div", "card__content");

    let section1 = createDomElement("section");
    let section1_h1 = createDomElement("h1", ["card__content-item", "card__content-item_highlights"], character.name);


    let section1_ul = createDomElement("ul", "card__content-item");
    let section1_li = createDomElement("li", null, [character.status, "-", character.gender]);
    section1_ul.append(section1_li);

    let section2 = createDomElement("section");
    let section2_h4 = createDomElement("h4", ["card__content-item", "card__content-item_highlights"], "Last known location:");
    let section2_p = createDomElement("p", null, character.location);

    let section3 = createDomElement("section", "modal__openButton");
    let section3_a = createDomElement("a", "card__link", "read more...");
    section3_a.href = "#";


    section1.append(section1_h1, section1_ul);
    section2.append(section2_h4, section2_p);
    section3.append(section3_a);


    cardContent.append(section1, section2, section3);

    card.append(cardImage, cardContent);

    cards.append(card);
  }
}

function createDomElement(tagName, className, content) {

  let element = document.createElement(tagName);

  if (typeof className === "string") {
    element.classList.add(className);
  } else if (Array.isArray(className)) {
    className.forEach(item => {
      element.classList.add(item);
    });
  }

  if (typeof content === "string") {
    element.textContent = content;
  } else if (Array.isArray(content)) {
    element.textContent = content.join("");
  }
  return element;
}








