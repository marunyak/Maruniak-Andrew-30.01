import "../css/style.css";
import Film from "./Film";
import storage from "./LocalStorage";

const modal = document.querySelector(".modal");
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
    film.renderFilmItems(filmList, view);
  }

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

  /* Show Modal */

  document.querySelector(".movie-list").addEventListener("click", e => {
    let elem = e.target;
    if (!elem.classList.contains(".movie-list")) {
      while (!elem.classList.contains("movie-item")) {
        if (elem.classList.contains(".movie-list")) break;
        else elem = elem.parentNode;
      }
      const id = elem.getAttribute("data-id");
      film.getFilm(id);
    }
  });

  /* Close Modal */

  modal.addEventListener("click", function(e) {
    const modalCont = document.querySelector(".modal-content");
    const elem = e.target;
    if (elem.classList.contains("close-button")) {
      modal.classList.toggle("active");
      modal.removeChild(modalCont);
    }
  });
});
