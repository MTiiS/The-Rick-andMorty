let totalCharacters = 671;                                                                     // total characters
let charactersOnPage = 20;                                                                     // display 20 characters per page            
let totalPages = Math.ceil(totalCharacters / charactersOnPage);                                // total number of pages
let currentPage = 1;                                                                           // default start page
const TOTAL_PAGIN_BUTTONS = 6;



 

function addPages() {                                                                          // pagination rendering

  let page = "";
  const pagination_buttonsContainer = document.querySelector("pagination-buttonsContainer");

  for (let i = currentPage; i <= currentPage + TOTAL_PAGIN_BUTTONS; i++) {                                        

      currentPage == 1 ? page += "<li id=\"page" + (i) + "\">" + (i) + "</li>":                // if (current page <= 3) start button always = 1
      currentPage == 2 ? page += "<li id=\"page" + (i-1) + "\">" + (i-1) + "</li>":            // if (current page <= 3) start button always = 1
      currentPage == 3 ? page += "<li id=\"page" + (i-2) + "\">" + (i-2) + "</li>":            // if (current page <= 3) start button always = 1
      page += "<li id=\"page" + (i - 3) + "\">" + (i - 3) + "</li>";                           // if (current page > 3) start button = currentPage -i  (for 7 start button: 7-3 = 4, for 8 = 5 etc.) 

  }
  page = `<li id="prev_Page" ><<</li>${page}<li id="next_Page">>></li>`
  pagination_buttonsContainer.innerHTML = page;
  setActivePage(document.getElementById("page" + currentPage));
}


const pagination_buttonsContainer = document.querySelector("pagination-buttonsContainer");

pagination_buttonsContainer.addEventListener("click", function (e){
  let id = e.target.id;
  id == "prev_Page"? currentPage -= 1 :
  id == "next_Page"? currentPage += 1 :
  currentPage = Number(id.substr(4));
  addPages();
  getCharacters();
  window.scrollTo(0, 0);

  });


  function setActivePage(element) {                                                             // set active the pagination button
    const pagination_buttonsContainer = document.querySelector("pagination-buttonsContainer");
    if(element) {
      const paginator = document.querySelector("pagination-buttonsContainer");
      pagination_buttonsContainer.forEach(li => li.classList.remove('active'));
      element.className = "active";
    }
  }



addPages();
