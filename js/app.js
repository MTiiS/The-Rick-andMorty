let count = 671; //всего записей
let cnt = 20; //сколько отображаем на странице
let viewPages = Math.ceil(count / cnt);
let currentPage = 1;  // по умолчанию загружаем первую страницу
const paginator = document.querySelector(".pages");




// 

function addPages() {     //рендеринг пагинации
  let page = "";
  for (let i = currentPage; i <= currentPage + 6; i++) {  // 

      currentPage == 1 ? page += "<li id=\"page" + (i) + "\">" + (i) + "</li>":
      currentPage == 2 ? page += "<li id=\"page" + (i-1) + "\">" + (i-1) + "</li>":
      currentPage == 3 ? page += "<li id=\"page" + (i-2) + "\">" + (i-2) + "</li>":
      page += "<li id=\"page" + (i - 3) + "\">" + (i - 3) + "</li>";

  }
  page = `<li id="prev_Page" ><<</li>${page}<li id="next_Page">>></li>`
  paginator.innerHTML = page;
  setActivePage(document.getElementById("page" + currentPage));
}



  paginator.addEventListener("click", function (e){
    let id = e.target.id;
      id == "prev_Page"? currentPage -= 1 :
      id == "next_Page"? currentPage += 1 :
      currentPage = Number(id.substr(4));
    addPages();
    getCharacters();
    window.scrollTo(0, 0);

  });


  function setActivePage(element) {  // установить активной кнопку пагинации
    if(element) {
      element
      paginator.childNodes.forEach(li => li.classList.remove('active'));
      element.className = "active";
    }
  }



addPages();
