function showSpinner() {
  let spinner = document.createElement("div");
  spinner.classList.add("spinner");
  let whirlpool = document.createElement("div");
  whirlpool.classList.add("spinner-whirlpool");
  spinner.append(whirlpool);
  document.querySelector(".main").prepend(spinner);

}

function hideSpinner() {
  document.querySelector(".spinner").remove();
}

export { showSpinner, hideSpinner }