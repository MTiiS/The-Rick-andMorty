let reverse = false;

function sort(characters) {

  document.querySelector(".filter__button").classList.remove("filter__button_reverse");

  characters.sort(function (a, b) {
    return a.name > b.name ? 1 : -1;
  });

  if (reverse) {
    characters.reverse();
    document.querySelector(".filter__button").classList.add("filter__button_reverse");
  }
  return (characters);
}

function reverseSort() {
  reverse = !reverse;
}

export { sort, reverseSort}
