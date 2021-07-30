// TODO: get totalCharacters from API
let totalCharacters = 671;  // total characters
let charactersOnPage = 20;  // display 20 characters per page            
let totalPages = Math.ceil(totalCharacters / charactersOnPage);  // total number of pages
const TOTAL_PAGIN_BUTTONS = 6;


document.addEventListener("DOMContentLoaded", function (event) {
  rendersCards(1);
  renderPaginationButtons(1);
});

function renderPaginationButtons(currentPage) {
  const paginator = document.querySelector(".pagination_buttons");
  paginator.innerHTML = "";

  let offsetStep = 3;            // if current page >= 5 rendering always starts  from current page - offset (if current page = 5 :start from 2 etc.)
  let firstButtonNumber = currentPage;
  if (currentPage < 5) {        // if current page < 5 rendering always starts  from "1" button without offset
    firstButtonNumber = 1;
    offsetStep = 0;
  } else if (currentPage >= totalPages - offsetStep) {
    firstButtonNumber = (totalPages - TOTAL_PAGIN_BUTTONS);
    offsetStep = 0;
  }

  let lastButtonNumber = (firstButtonNumber + TOTAL_PAGIN_BUTTONS - offsetStep);
  paginator.append(createPaginationButton("<<"));
  for (let i = firstButtonNumber - offsetStep; i <= lastButtonNumber; i++) {
    paginator.append(createPaginationButton(i));
  }
  paginator.append(createPaginationButton(">>"));
  setActivePage(document.querySelector(`[data-page="${currentPage}"]`), paginator);
}

document.querySelector(".pagination_buttons").addEventListener("click", function (e) {
  let currentPage = 1;
  let id = Number(e.target.dataset.page);
  switch (id) {
    case "<<":
      currentPage -= 1;
      break;
    case ">>":
      currentPage += 1;
      break;
    default:
      currentPage = id;
  }

  renderPaginationButtons(currentPage);
  rendersCards(currentPage);
  window.scrollTo(0, 0);

});

function createPaginationButton(contentText) {
  let pagination_button = document.createElement('li');
  pagination_button.dataset.page = contentText;
  pagination_button.textContent = (contentText);
  return pagination_button;
}

function setActivePage(element, paginator) {       // set active the pagination button

  if (element) {
    paginator.childNodes.forEach(li => li.classList.remove('active'));
    element.className = "active";
  }
}

function fetchCharacters(currentPage) {

  let url = "https://rickandmortyapi.com/api/character/?page=" + currentPage;
  return fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return characters = data.results.map((character) => {
        return {
          id: character.id,
          image: character.image,
          name: character.name,
          status: character.status,
          gender: character.gender,
          location: character.location.name,
          episode: character.episode[0]
        };
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
}

function rendersCards(currentPage) {
  let characters = null;
  fetchCharacters(currentPage)
    .then((data) => {
      characters = data;
    }).then(() => {
    renderCardItem(characters);
  })
}

function renderCardItem(characters) {

  let cards = document.querySelector(".cards");
  cards.innerHTML = "";

  for (character of characters) {
    let cardsItem = createDomElement("div", "cards-item");
    let imageWrapper = createDomElement("div", "imageWrapper");
    let image = createDomElement("img", null, character.image);
    image.src = character.image;
    let contentWrapper = createDomElement("div", "contentWrapper");

    let section1 = createDomElement("section");
    let section1_h1 = createDomElement("h1", null);

    let section1_span = createDomElement("span", "highlights", character.name);
    section1_h1.append(section1_span);
    let section1_ul = createDomElement("ul");
    let section1_li = createDomElement("li", null, [character.status, "-", character.gender]);
    section1_ul.append(section1_li);

    let section2 = createDomElement("section");
    let section2_h4 = createDomElement("h4", "highlights", "Last known location:");
    let section2_span = createDomElement("span", null, character.location);

    let section3 = createDomElement("section", "modalOpenButton");
    let section3_a = createDomElement("a", null, "read more...");
    section3_a.href = "#";
    section3_a.onclick = "event.preventDefault()";          //doesn't work??? why?

    appendElements(section1, [section1_h1, section1_ul]);
    appendElements(section2, [section2_h4, section2_span]);
    appendElements(section3, [section3_a]);

    imageWrapper.append(image);
    contentWrapper.append(section1);
    contentWrapper.append(section2);
    contentWrapper.append(section3);

    cardsItem.append(imageWrapper);
    cardsItem.append(contentWrapper);

    cards.append(cardsItem);
  }
}

function createDomElement(type, className, ...content) {
  let element = document.createElement(type);
  if (className) {
    element.className = className;
  }
  if (content.length > 0) {
    let text = String(content).split(",").join("");
    element.textContent = text;
  }
  return element;
}

function appendElements(appendTo, ...elements) {
  for (element of elements[0])
    appendTo.append(element);
}






