import "../css/style.css";
import Film from "./Film";
import storage from "./LocalStorage";

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const film = new Film();
const filmList = storage.get("FilmList");
let view = "card";

/* Load FilmList */

document.addEventListener("DOMContentLoaded", function() {
  if (!filmList.length) {
    film.getFilmList();
  } else {
    film.list = filmList;
    film.getGenres();
    film.renderFilmItems(filmList, view);
  }
});

/* Change Film View */

document.querySelector(".movie-view").onclick = function(e) {
  const elemClass = e.target.classList;
  const listView = document.querySelector(".list-view").classList;
  const cardView = document.querySelector(".card-view").classList;
  const movieList = document.querySelector(".movie-list").classList;

  if (!elemClass.contains("active") && elemClass.contains("card-view-img")) {
    view = "card";
    film.filterFilmList("", view);
    movieList.remove("list");
    movieList.add("card");
    cardView.toggle("active");
    listView.toggle("active");
  } else if (
    !elemClass.contains("active") &&
    elemClass.contains("list-view-img")
  ) {
    view = "list";
    film.filterFilmList("", view);
    movieList.add("list");
    movieList.remove("card");
    cardView.toggle("active");
    listView.toggle("active");
  }
};

/* Filter Movies */

document.querySelector(".filter-genre").addEventListener("change", e => {
  const val = e.target.value;
  if (val !== "all") {
    film.filterFilmList(val, view);
  } else {
    film.filter = "";
    film.renderFilmItems("", view);
  }
});

/* Modal */

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
