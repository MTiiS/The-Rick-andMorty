let reverse = false;
let handleSort = null;

function initSort(config) {
  if (config.className) {
    renderFilter(config.className);
  }
  if (config.onSort) {
    handleSort = config.onSort;
  }
}

function sort(characters, property) {
  let characterslist = deepClone(characters);
  characterslist.sort(function (a, b) {
    return a[property] > b[property] ? 1 : -1;
  });
  if (reverse) {
    characterslist.reverse();
  }
  return (characterslist);
}

function deepClone(input) {

  // primitive types
  if (typeof (input) != "object") {
    return input;
  }

  // null
  if (!input) {
    return input;
  }
  let result = (Array.isArray(input)) ? [] : {};
  for (var property in input) {
    if (input.hasOwnProperty(property)) {
      result[property] = deepClone(input[property]);
    }
  }
  return result;
}

function renderFilter(elementClassName) {
  let filterButton = document.createElement("button");
  filterButton.classList.add("filter__button");
  document.querySelector(elementClassName).append(filterButton);
  filterButton.addEventListener("click", () => {
    reverse = !reverse;
    if (handleSort){
    handleSort();
    }
    filterButton.classList.toggle("filter__button_reverse")
  });
}

export { initSort, sort };
