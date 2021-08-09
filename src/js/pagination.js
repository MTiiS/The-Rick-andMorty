import { getCurrentPage, switchToPage } from './model/currentPage';
import { getConfig } from './model/config.js';

let displayedPages = [];
let handlePaginate = null;


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

function init(config) {
  resreshDisplayedPages();
  renderPagination();

  handlePaginate = config.onPaginate;
}

export function resreshDisplayedPages() {
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
    displayedPages.push(new PaginationButton(i, i, isActive));
  }

  //add navigation buttons
  displayedPages.unshift( new PaginationButton(prevButton.id, prevButton.content, false) );
  displayedPages.push( new PaginationButton(nextButton.id, nextButton.content, false) );

  //add buttons to array
  setDisplayedPages(displayedPages);
}

export function renderPagination() {

  let displayedPages = getDisplayedPages();
  const paginator = document.querySelector(".pagination__buttons");
  paginator.innerHTML = "";

  for (let button of displayedPages) {
    paginator.append(createPaginationButton(button));
  }
}

function createPaginationButton(button) {

  let pagination__button = document.createElement('li');
  pagination__button.dataset.page = button.id;
  pagination__button.textContent = button.text;
  pagination__button.classList.add("pagination__button");

  if (button.isActive === true) {
    pagination__button.classList.add("pagination__button_active");
  }
  return pagination__button;
}

document.querySelector(".pagination__buttons").addEventListener("click", function (e) {

  let pageId = e.target.dataset.page;
  switchToPage(pageId);
  resreshDisplayedPages();
  renderPagination();
  handlePaginate();
  window.scrollTo(0, 0);

})

export default init;
