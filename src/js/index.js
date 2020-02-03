import "../css/style.css";
import Film from "./Film";
import storage from "./LocalStorage";

const modal = document.querySelector(".modal");
const movieView = document.querySelector(".movie-view");
const filterGenre = document.querySelector(".filter-genre");
const favList = document.querySelector(".fav-list");
const film = new Film();
const filmList = storage.get("FilmList");
let view = "card";

document.addEventListener("DOMContentLoaded", function() {
  /* Load Movie Gallery */

  if (!filmList.length) {
    film.getFilmList();
  } else {
    film.list = filmList;
    film.getGenres();
    film.getFavouriteList();
    film.renderFilmItems(filmList, view);
  }

  /* Change Film View */

  movieView.onclick = e => {
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

  filterGenre.addEventListener("change", e => {
    const val = e.target.value;
    if (val !== "all") {
      film.filterFilmList(val, view);
    } else {
      film.filter = "";
      film.renderFilmItems("", view);
    }
  });

  /* Show Modal or Add to favourite */

  document.querySelector(".movie-list").addEventListener("click", e => {
    let elem = e.target;
    // const elemClass = elem.classList;
    let id = "";

    if (
      !elem.classList.contains("movie-list") &&
      !elem.classList.contains("fa-star")
    ) {
      while (!elem.classList.contains("movie-item")) {
        if (elem.classList.contains("movie-list")) break;
        else elem = elem.parentNode;
      }
      id = elem.getAttribute("data-id");
      film.getFilm(id);
    } else {
      film.setFavourite(elem);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  });

  /* Close Modal or Add to favourite */

  modal.addEventListener("click", e => {
    const modalCont = document.querySelector(".modal-content");
    const elem = e.target;
    if (elem.classList.contains("close-button")) {
      modal.classList.toggle("active");
      modal.removeChild(modalCont);
    } else if (elem.classList.contains("fa-star")) {
      film.setFavourite(elem);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  });

  /* Remove from favourite list */

  favList.addEventListener("click", e => {
    const elem = e.target.parentNode;
    const id = elem.getAttribute("data-id");
    film.removeFromFavouriteList(id);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  });
});
