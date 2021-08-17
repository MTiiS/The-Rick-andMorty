import { getCurrentPage, switchToPage } from './model/currentPage';
import { getConfig } from './model/config.js';


let displayedButtons = [];
let handlePaginate = null;

function setDisplayedButtons(pagesNumbers) {
  displayedButtons = pagesNumbers;
}

function getDisplayedButtons() {
  return displayedButtons;
}

function PaginationButton(id, text, isActive = false, isDisabled = false) {
  this.id = id;
  this.text = text;
  this.isActive = isActive;
  this.isDisabled = isDisabled;
}

function init(config) {
  resreshDisplayedButtons();
  renderPagination();
  addPaginationEvents();

  handlePaginate = config.onPaginate;
}

export function resreshDisplayedButtons() {
  // config
  let prevButton = getConfig("PREV_BUTTON");
  let nextButton = getConfig("NEXT_BUTTON");
  let totalPages = getConfig("TOTAL_PAGES");
  let totalButtons = getConfig("TOTAL_PAGIN_BUTTONS");
  let offsetStart = getConfig("OFFSET_START");
  let offsetStep = getConfig("OFFSET_STEP");
  let firstPage = getConfig("FIRST_LOAD_PAGE");

  let currentPage = getCurrentPage();
  let firstButtonNumber = currentPage;

  let displayedButtons = [];

  // if current page < offsetStart rendering always starts from "1" button without offset
  if (currentPage < offsetStart) {
    firstButtonNumber = 1;
    offsetStep = 0;
  } else if (currentPage >= totalPages - offsetStep) {
    firstButtonNumber = (totalPages - totalButtons);
    offsetStep = 0;
  }
  let lastButtonNumber = (firstButtonNumber + totalButtons - offsetStep);

  // add page buttons
  for (let i = firstButtonNumber - offsetStep; i <= lastButtonNumber; i++) {
    let isActive = i === currentPage;
    displayedButtons.push( new PaginationButton(i, i, isActive) );
  }

  // add navigation buttons
  let isDisabled = false;
  isDisabled = currentPage === firstPage;
  displayedButtons.unshift( new PaginationButton(prevButton.id, prevButton.content, false, isDisabled) );
  isDisabled = currentPage === totalPages;
  displayedButtons.push( new PaginationButton(nextButton.id, nextButton.content, false, isDisabled) );

  // add buttons to array
  setDisplayedButtons(displayedButtons);
}

function renderPagination() {
  let displayedButtons = getDisplayedButtons();
  const paginator = document.querySelector(".pagination__buttons");
  paginator.innerHTML = "";

  for (let button of displayedButtons) {
    paginator.append( createPaginationButton(button) );
  }
}

function createPaginationButton(button) {
  let buttonEl = document.createElement('li');
  buttonEl.dataset.page = button.id;
  buttonEl.textContent = button.text;
  buttonEl.classList.add("pagination__button");

  if (button.isActive === true) {
    buttonEl.classList.add("pagination__button_active");
  } 

  if (button.isDisabled === true) {
    buttonEl.classList.add("pagination__button_disabled");
  }

  return buttonEl;
}

function addPaginationEvents() {
  document.querySelector(".pagination__buttons").addEventListener("click", function (e) {
    let pageId = e.target.dataset.page;
   
    if ( e.target.classList.contains("pagination__button_disabled") ) {
      e.stopPropagation();
    } else if ( e.target.classList.contains("pagination__button") ) {
      switchToPage(pageId);
      resreshDisplayedButtons();
      renderPagination();
      if (handlePaginate){
        handlePaginate();
      }
      window.scrollTo(0, 0);
    }
})
}

export default init;
