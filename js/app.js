let currentPage = 1;
let displayedPages = [];


const CONFIG = {
  TOTAL_PAGES: 34,
  TOTAL_PAGIN_BUTTONS: 7,
  OFFSET_STEP: 3,

  PREV_BUTTON: {
    id: "prev",
    content: "<<"
  },
  NEXT_BUTTON: {
    id: "next",
    content: ">>"
  }
}


document.addEventListener("DOMContentLoaded", function (event) {
  renderPage();
});

function renderPage() {
  let currentPage = getCurrentPage();
  rendersCards(currentPage);
  resreshDisplayedPages();
  renderPagination(); 
  
}

function getConfig(name) {
  if (name) return CONFIG[name];
  return CONFIG;
}

function setCurrentPage(pageNumber) {
  currentPage = pageNumber;
}

function getCurrentPage() {
  return currentPage;
}

function setDisplayedPages(pagesNumbers) {
  displayedPages = pagesNumbers;
}

function getDisplayedPages() {
  return displayedPages;
}

function PaginationButton(id, text, isActive) {
  this.id = id;
  this.text = text;
  this.isActive = isActive;
}

function resreshDisplayedPages() {
  //config
  let prevButton = getConfig("PREV_BUTTON");
  let nextButton = getConfig("NEXT_BUTTON");
  let totalPages = getConfig("TOTAL_PAGES");
  let totalButtons = getConfig("TOTAL_PAGIN_BUTTONS");
  let offsetStep = getConfig("OFFSET_STEP");

  let currentPage = getCurrentPage();
  let firstButtonNumber = currentPage;
 
  
  let displayedPages = [];

  //if current page < 5 rendering always starts  from "1" button without offset
  if (currentPage < 5) {
    firstButtonNumber = 1;
    offsetStep = 0;
  } else if (currentPage >= totalPages - offsetStep) {
    firstButtonNumber = (totalPages - totalButtons);
    offsetStep = 0;
  }
  let lastButtonNumber = (firstButtonNumber + totalButtons - offsetStep);

  //add page buttons
  for (let i = firstButtonNumber - offsetStep; i < lastButtonNumber; i++) {
    let isActive = i === currentPage;
    displayedPages.push(new PaginationButton (i, i, isActive));
  }

  //add navigation buttons
  displayedPages.unshift( new PaginationButton (prevButton.id, prevButton.content, false) );
  displayedPages.push( new PaginationButton (nextButton.id, nextButton.content, false) );
  
  //add buttons to array
  setDisplayedPages(displayedPages);
}

function renderPagination() {

  let displayedPages = getDisplayedPages();
  const paginator = document.querySelector(".pagination__buttons");
  paginator.innerHTML = "";
  
  for (let button of displayedPages) {
    paginator.append( createPaginationButton(button) );
  }
}
 

function createPaginationButton(button) {
  
  let pagination__button = document.createElement('li');
  pagination__button.dataset.page = button.id;
  pagination__button.textContent = button.text;
  pagination__button.classList = "pagination__button";
    
  if (button.isActive === true) {
    pagination__button.classList.add("pagination__button_active");
  }
  return pagination__button;
}

function switchToPage(pageId) {
  //config
  let PREV_BUTTON = getConfig("PREV_BUTTON");
  let NEXT_BUTTON = getConfig("NEXT_BUTTON");
  let lastPage = getConfig("TOTAL_PAGES");

  switch (pageId) {
    case PREV_BUTTON.id :
      if (currentPage > 1) currentPage--;
      break;
    case NEXT_BUTTON.id:
      if (currentPage < lastPage) currentPage++;
      break;
    default:
      currentPage = Number(pageId);
  }
  setCurrentPage(currentPage);
}


document.querySelector(".pagination__buttons").addEventListener("click", function (e) {
  
  let pageId = e.target.dataset.page;
  switchToPage(pageId);

  renderPage();
  window.scrollTo(0, 0);

})

function fetchCharacters(currentPage) {

  let url = "https://rickandmortyapi.com/api/character/?page=" + currentPage;
  return fetch(url)
    .then((response) => {return response.json()})
    .then((data) => {
      return characters = data.results.map( (character) => {
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
    .catch((error) => console.log('error', error));
}

function rendersCards(currentPage) {
  fetchCharacters(currentPage).then (renderCardItem); 
}

function renderCardItem(characters) {

  let cards = document.querySelector(".cards");
  cards.innerHTML = "";

  for (character of characters) {
    let card = createDomElement("div", "card");
    let cardImage = createDomElement("img", "card__img", character.image);
    cardImage.src = character.image;
    let cardContent = createDomElement("div", "card__content");

    let section1 = createDomElement("section");
    let section1_h1 = createDomElement("h1", "card__element");

    let section1_span = createDomElement("span", "card__content_highlights", character.name);
    section1_h1.append(section1_span);
    let section1_ul = createDomElement("ul","card__element");
    let section1_li = createDomElement("li", null, [character.status, "-", character.gender]);
    section1_ul.append(section1_li);

    let section2 = createDomElement("section");
    let section2_h4 = createDomElement("h4", "card__content_highlights", "Last known location:");
    let section2_span = createDomElement("span", null, character.location);

    let section3 = createDomElement("section", "modalOpenButton");
    let section3_a = createDomElement("a", "card__link", "read more...");
    section3_a.href = "#";


    section1.append(section1_h1, section1_ul);
    section2.append(section2_h4, section2_span);
    section3.append(section3_a);

    
    cardContent.append(section1,section2,section3);
    
    card.append(cardImage,cardContent);
    
    cards.append(card);
  }
}

function createDomElement(tagName, className, content) {

  let element = document.createElement(tagName);
  
  if (className) {
    element.classList = className;
  }
  
  if (typeof content === "string"){
    element.textContent = content;
  } else if ( Array.isArray(content) ){
    element.textContent = content.join("");
  }
  
  return element;
}





