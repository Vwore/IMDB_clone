const list = document.getElementById("movielist");
var searchvalue="harry";
var sub=document.getElementById("submited");
sub.addEventListener('click',submited);
makepage();
var total_Pages;
var cur_page=1;

function submited(e){
    console.log('submit');
    e.preventDefault();
    cur_page=1;
    makepage();
}
function makepage(){
    // e.preventDe  fault();
    // cur_page=1;
    searchvalue=document.getElementById("search").value;
    console.log("hi"+searchvalue);
    if(searchvalue==""){  console.log("hi"); searchvalue="house";}
    displayPage(cur_page);
    fetch("https://www.omdbapi.com/?apikey=3ea15b8a&s="+searchvalue).then(response => response.json()).then(data => {if(data.hasOwnProperty("Search")){ total_Pages=(data.totalResults)/10;  generatePaginationLinks(total_Pages);} 
    else{
        console.log(data.Error);
        var x=document.createElement("div");
        x.className="error";
        x.textContent=data.Error;
        list.innerHTML="";
        list.appendChild(x);
    }});
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
    detail.onclick=detailclick;
    detail.id=movie.imdbID;
    detail.textContent="details";
    detail.className="details";
    
    sidediv.appendChild(x);
    sidediv.appendChild(year);
    sidediv.appendChild(type);
    sidediv.appendChild(detail);


    div.appendChild(sidediv);
    list.appendChild(div);
}
function detailclick(e)
{
    e.preventDefault();
    console.log("imdb id" + e.target.id);
    window.location.href = 'detail.html?param='+encodeURIComponent(e.target.id);

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

    var previous_but=document.createElement("button");
    previous_but.textContent="previous";
    previous_but.onclick=prev_but;
    paginationContainer.appendChild(previous_but);

    for (let i = lowerbound; i <= Math.min(lowerbound+10,totalPages); i++) {
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = i;
        // link.className="page_link"
        link.addEventListener("click", () => {
            cur_page=i;
            displayPage(i);
            generatePaginationLinks(totalPages);
        });
        paginationContainer.appendChild(link);
    }
    var next_but=document.createElement("button");
    next_but.textContent="next";
    next_but.onclick=next_button;
    paginationContainer.appendChild(next_but);

}

function prev_but(e)
{
    e.preventDefault();
    console.log("prev");
    if(cur_page!=1)
    {
        cur_page--;
        makepage();
    }
}

function next_button(e)
{
    console.log("next")
    e.preventDefault();
    if(cur_page!=total_Pages)
    {
        cur_page++;
        makepage();
    }
}

// {"Title":"Dude, Where's My Car?","Year":"2000","imdbID":"tt0242423","Type":"movie",
// "Poster":"https://m.media-amazon.com/images/M/MV5BNzRmN2NjNzktOWE1My00NjVlLWFhNjYtZmFkMzM5YTA2ZTFlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"}
