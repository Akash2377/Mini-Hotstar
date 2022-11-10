var images = [
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/4469/674469-h",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/4385/674385-h",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/9939/1279939-h-3be10a34342b",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/9308/1269308-h-26da4df3decc",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/8722/1078722-h-82919d0d3c64",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/7518/1097518-h-1b558692d29f",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/5019/675019-h",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/2352/1282352-h-23698d5e8f30",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/8679/1028679-h-f9e901f53b9b",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/1819/911819-h",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/1511/1161511-h-a103f5d4c916",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/6362/936362-h",
  "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/4661/674661-h",
];
var imageMovies = document.createElement("img");
var i = 0;
x = setInterval(function () {
  if (i === images.length) {
    i = 0;
  }
  imageMovies.src = images[i];
  imageMovies.className = "slideshowIMG";
  i++;
}, 2000);
document.getElementById("slideshow").append(imageMovies);

function searchMovieitm() {
  document.getElementById("Main-Page-Content").style.display = "block";
  document.getElementById("Movies-Information").style.display = "none";
  document.getElementById("More-Page-Content").style.display = "none";
  let MovieNameIN = document.getElementById("movieName").value;
  if (MovieNameIN != "") {
    let url = `https://api.hotstar.com/s/sniper/forerunner?q=${MovieNameIN}&size=5`;
    searchMovie(url, false);
  }
}
async function searchMovie(MovieUrl, flag) {
  try {
    let url = MovieUrl;
    let response = await fetch(url);
    let data = await response.json();
    if (flag) {
      ShowMoreResultsInPage(data.body.results.items);
    } else {
      displayDataInDiv(data.body.results.items);
    }
    // console.log(data.body.results.items);
  } catch (error) {
    console.log(error);
  }
}

function ShowMoreResultsInPage(movie) {
  movie.map(function (ele) {
    let ImgM = `<img src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/${ele.images.h}" alt="" onclick="showMovieData('${ele.title}')">`;
    let div = document.createElement("div");
    div.innerHTML = ImgM;
    document.getElementById("More-Page-Content-IMG").append(div);
  });
}
function displayDataInDiv(movie) {
  document.getElementById("serchMovieList").style.display = "block";
  document.getElementById("Movies-Information").style.display = "none";
  document.getElementById("movie-container").innerHTML = "";
  movie.map(function (ele) {
    let dataMovie = `
            <div>
            <img
              src="https://img1.hotstarext.com/image/upload/f_auto,t_web_hs_1x/${
                ele.images.h
              }"
              alt=""
            />
          </div>
          <div>
            <h4>${ele.title}</h4>
            <h5>${ele.genre[0]}, ${ele.channelName || ele.lang[0]} </h5>
          </div>`;
    let div = document.createElement("div");
    div.setAttribute("onclick", `showMovieData('${ele.title}')`);
    div.innerHTML = dataMovie;
    document.getElementById("movie-container").append(div);
  });

  let btn = document.createElement("button");
  btn.setAttribute("onclick", "ShowMoreResults()");
  btn.setAttribute("id", "moreBTN");
  btn.innerText = "MORE RESULTS";
  document.getElementById("movie-container").append(btn);
}
function ShowMoreResults() {
  document.getElementById("Main-Page-Content").style.display = "none";
  document.getElementById("More-Page-Content").style.display = "block";
  let MovieNameIN = document.getElementById("movieName").value;
  let url = `https://api.hotstar.com/s/sniper/forerunner?q=${MovieNameIN}&size=100`;
  searchMovie(url, true);
  document.getElementById("NameSearchedFor").innerText = MovieNameIN;
  document.getElementById("More-Page-Content-IMG").innerHTML = "";
}
function showMovieData(movieName) {
  // console.log(movieName);
  document.getElementById("Main-Page-Content").style.display = "none";
  document.getElementById("More-Page-Content").style.display = "none";
  document.getElementById("Movies-Information").style.display = "block";
  fetchTheUrl();
  async function fetchTheUrl() {
    let url = `https://api.hotstar.com/s/sniper/forerunner?q=${movieName}&size=1`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      showDataOfMovie(data.body.results.items[0]);
      // console.log(data.body.results.items[0]);
    } catch (error) {
      console.log(error);
    }
  }
}
function showDataOfMovie(movieData) {
  document.getElementById("Movies-Information").innerHTML = "";
  let data = `
       <div>
          <h1>${movieData.title}</h1>
          <h3>${movieData.genre}</h3>
          <h3>${movieData.description}</h3>
          <h3>
          ${window.moment(movieData.createDate * 1).format("ddd mm yy")}</h3>
        </div>
        <div>
          <img src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/${
            movieData.images.h
          }" alt="">
        </div>`;
  let div = document.createElement("div");
  div.innerHTML = data;
  document.getElementById("Movies-Information").append(div);
}
// Debouncing used for making minimum request
let timeId;
function debounce(func, delay) {
  if (timeId) {
    clearTimeout(timeId);
  }
  timeId = setTimeout(function () {
    func();
  }, delay);
}
