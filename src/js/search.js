import { setCurrentPage } from "./model/currentPage.js"

let handleSearch = null;
let _searchRequest = null;

function setSearchRequest(filter) {
  _searchRequest = filter;
}

function getSearchRequest() {
  return _searchRequest;
}

function initSearch(config) {
  addSearchEvents();
  handleSearch = config.onSearch;
}

function addSearchEvents() {
  let form = document.querySelector(".search__form");
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createSearchRequest();

    if (handleSearch) {
      handleSearch();
    }
  });

  document.querySelector(".search-open-button").addEventListener('click', () => {
    document.querySelector('.search').classList.toggle('search_show')
    document.querySelector('.main').classList.toggle('main_transform');
  });
}

function createSearchRequest(field, value) {
  let form = document.querySelector(".search__form");
  const formData = new FormData(form);
  setCurrentPage(1);

  if (field && value) {
    formData.append(field, value);
  }

  let request = Array.from( formData, (e) => e.map(encodeURIComponent).join('=') ).join('&');
  setSearchRequest(request);

  if (handleSearch) {
    handleSearch();
  }
}

export { initSearch, getSearchRequest, createSearchRequest };


