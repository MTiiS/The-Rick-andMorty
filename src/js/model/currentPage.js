import { getConfig } from './config.js';

let firstPage = getConfig("FIRST_LOAD_PAGE");
let currentPage = firstPage;

function getCurrentPage() {
  return currentPage;
}

function setCurrentPage(pageNumber) {
  currentPage = pageNumber;
}

function switchToPage(pageId) {
  
  // config
  let PREV_BUTTON = getConfig("PREV_BUTTON");
  let NEXT_BUTTON = getConfig("NEXT_BUTTON");
  let currentPage = getCurrentPage();
  
  switch (pageId) {
    case PREV_BUTTON.id:
      currentPage--;
      break;
    case NEXT_BUTTON.id:
      currentPage++;
      break;
    default:
      currentPage = Number(pageId);
  }
  setCurrentPage(currentPage);
}

export { getCurrentPage, switchToPage, setCurrentPage };