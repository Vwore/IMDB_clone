const list = document.getElementById("movielist");
var searchvalue="harry";
var sub=document.getElementById("submited");
sub.addEventListener('click',submited);
makepage();
var cur_page=1;

function submited(e){
    console.log('submit');
    e.preventDefault();
    makepage();
}
function makepage(){
    // e.preventDe  fault();
    searchvalue=document.getElementById("search").value;
    console.log("hi"+searchvalue);
    if(searchvalue==""){  console.log("hi"); searchvalue="house";}
    displayPage(1);
    fetch("https://www.omdbapi.com/?apikey=3ea15b8a&s="+searchvalue).then(response => response.json()).then(data => {if(data.hasOwnProperty("Search")){generatePaginationLinks((data.totalResults)/10);} else{console.log("no movie found")}});
}
function create_movie_element(movie)
{
    var div=document.createElement("div");  //main div
    div.className="movie_div";

    var image=document.createElement("img");
    image.src=movie.Poster;
    image.alt=movie.Title;
    image.className="image";
    div.appendChild(image);

    var sidediv=document.createElement("div");
    sidediv.className="sidediv";

    var x=document.createElement("p");
    x.className="movietitle"
    x.textContent=movie.Title;

    var year=document.createElement("p");
    year.textContent=movie.Year;
    year.className="year"

    var type=document.createElement("p");
    type.textContent=movie.Type;
    type.className="type";

    var detail= document.createElement("button");
    detail.textContent="details";
    detail.className="details";
    
    sidediv.appendChild(x);
    sidediv.appendChild(year);
    sidediv.appendChild(type);
    sidediv.appendChild(detail);


    div.appendChild(sidediv);
    list.appendChild(div);
}

function displayPage(page_no) {
    list.innerHTML = "";
    fetch("https://www.omdbapi.com/?apikey=3ea15b8a&s="+searchvalue+"&page="+page_no).then(response => response.json()).then(data => {if(data.hasOwnProperty("Search")){data.Search.forEach(movie => {create_movie_element(movie);});} else{console.log("no movie found")}});
    
}

function generatePaginationLinks(totalPages) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    var lowerbound=Math.max(1,cur_page-5);
    if(lowerbound+5>totalPages) lowerbound=Math.max(1,lowerbound-5);
    for (let i = lowerbound; i <= Math.min(lowerbound+10,totalPages); i++) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = i;
        link.className="page_link"
        link.addEventListener("click", () => {
            cur_page=i;
            displayPage(i);
            generatePaginationLinks(totalPages);
        });
        paginationContainer.appendChild(link);
    }
}


// {"Title":"Dude, Where's My Car?","Year":"2000","imdbID":"tt0242423","Type":"movie",
// "Poster":"https://m.media-amazon.com/images/M/MV5BNzRmN2NjNzktOWE1My00NjVlLWFhNjYtZmFkMzM5YTA2ZTFlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"}
