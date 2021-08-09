import { getConfig } from './config.js';

let currentPage = getConfig("FIRST_PAGE");

function getCurrentPage() {
  return currentPage;
}

function setCurrentPage(pageNumber) {
  currentPage = pageNumber;
}

function switchToPage(pageId) {
  //config
  let PREV_BUTTON = getConfig("PREV_BUTTON");
  let NEXT_BUTTON = getConfig("NEXT_BUTTON");
  let lastPage = getConfig("TOTAL_PAGES");
  let currentPage = getCurrentPage();

  switch (pageId) {
    case PREV_BUTTON.id:
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

export { getCurrentPage, switchToPage };