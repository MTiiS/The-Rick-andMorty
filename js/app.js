// TODO: get totalCharacters from API
let totalCharacters = 671;                                                                     // total characters
let charactersOnPage = 20;                                                                     // display 20 characters per page            
let totalPages = Math.ceil(totalCharacters / charactersOnPage);                                // total number of pages
let currentPage = 1;                                                                           // default start page
const TOTAL_PAGIN_BUTTONS = 6;




window.onload = function() {
  createPaginationButtons()
}
 
  function createPaginationButtons() {                                                         // pagination rendering


    const paginator = document.querySelector(".pagination_buttons");
    paginator.innerHTML = "";
    let offsetStep = 3;                                                                       // if current page >= 4 rendering always starts  from current page - offset (if current page = 5 :start from 2 etc.)
    let firstButton = currentPage;
      

    if (currentPage < 4){                                                                     // if current page < 4 rendering always starts  from "1" button without offset
       firstButton = 1 ;
       offsetStep = 0; 
    } else if (currentPage >= totalPages - offsetStep) {                                     // last pages rendering 
       firstButton = totalPages - TOTAL_PAGIN_BUTTONS;
       offsetStep = 0;
    }
   

    for (let i = firstButton - offsetStep; i <= (firstButton + TOTAL_PAGIN_BUTTONS - offsetStep ); i++) {  
      let pagination_button = document.createElement('li');
      pagination_button.id = "page" + (i);
      pagination_button.innerHTML = (i);  
      paginator.append(pagination_button); 
    }

    let pagination_button_prev = document.createElement('li');
    let pagination_button_next = document.createElement('li');
    
    pagination_button_prev.innerText = "<<"
    pagination_button_next.innerText = ">>"
    pagination_button_prev.id = "prev_Page";
    pagination_button_next.id = "next_Page";

    paginator.prepend(pagination_button_prev);
    paginator.append(pagination_button_next);
    setActivePage(document.getElementById("page" + currentPage), paginator);
  }

 
  const paginator = document.querySelector(".pagination_buttons");
  paginator.addEventListener("click", function (e){

     

    let id = e.target.id;
    if(id == "prev_Page"||id == "next_Page") {
      id == "prev_Page"&&currentPage != 1? currentPage -= 1 :
      id == "next_Page"&&currentPage != totalPages? currentPage += 1: 1; 
       } else {
        currentPage = Number(id.substr(4));
      }
    
    createPaginationButtons();
    getCharacters();
    window.scrollTo(0, 0);

  });


  function setActivePage(element, paginator) {                                                             // set active the pagination button
        
    if(element) {
      paginator.childNodes.forEach(li => li.classList.remove('active'));
      element.className = "active";
    }
  }
