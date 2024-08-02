'use strict';

import { imageBaseURL, fetchdata } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";


const movieId = window.localStorage.getItem("movieId");


const pageContent = document.querySelector("[page-content]");

sidebar();


const getGenres = function (genreList) {
    const newGenreList = [];

    for (const { name } of genreList) newGenreList.push(name);
    return newGenreList.join(", ");
};

const getCasts = function (castList) {
    const newCastList = [];

    for (let i = 0, len = castList.length; i < len && len && i < 10; i++) {
        const { name } = castList[i];
        newCastList.push(name);
    }
    return newCastList.join(", ");
};

const getDirectors = function (crewList) {
    const directors = crewList.filter(({ job }) => job === "Director");

    const directorList = [];
    for (const { name } of directors) directorList.push(name);
    return directorList.join(", ");
};

const filterVideos = function (videoList) {
    return videoList.filter(
        ({ type, site }) =>
            (type === "Trailer" || type === "Teaser") && site === "Youtube"
    );
};

fetchdata(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=casts,videos,images,releases`,
    function (movie){
    const {
        backdrop_path,
        poster_path,
        title,
        release_date,
        runtime,
        vote_average,
        releases: {
          countries: [{ certification }],
        },
        genres,
        overview,
        casts: { cast, crew },
        videos: { results: videos },
      } = movie;

      document.title = `${title} - Tvflix`;

      const movieDetail = document.createElement("div");
      movieDetail.classList.add("moviedetail");
      movieDetail.innerHTML = `
      <div class="backdropimage" style="background-image: url('${imageBaseURL}${"w1280" || "original"}${backdrop_path || poster_path}');"></div>

      <figure class="poster-box movieposter">
          <img src=${imageBaseURL}w342${poster_path} alt="${title} poster" class="imagecover">
      </figure>

      <div class="detailbox">

          <div class="detailcontent">
              <h1 class="heading">${title}</h1>

              <div class="metalist">
                  <div class="metaitem">
                      <img src="./assets/images/star.png" alt="rating star" width="20" height="20">

                      <span class="span">${vote_average.toFixed(1)}</span>
                  </div>

                  <div class="separator"></div>

                  <div class="metaitem">${runtime}m</div>

                  <div class="separator"></div>

                  <div class="metaitem">${release_date.split("-")[0]}</div>

                  <div class="metaitem cardbadge">${certification}</div>
              </div>

              <p class="genre">${getGenres(genres)}</p>

              <p class="overview">${overview}   </p>

              <ul class="detaillist">
                  <div class="listitem">
                      <p class="listname">Starring</p>

                      <p>
                      ${getCasts(cast)}
                      </p>
                  </div>

                  <div class="listitem">
                      <p class="listname">Directed By</p>

                      <p>
                      ${getDirectors(crew)}
                      </p>
                  </div>
              </ul>
          </div>

          <div class="titlewapper">
              <h3 class="titlelarge">Trailer and Clips</h3>
          </div>

          <div class="sliderlist">
              <div class="sliderinner">
                  
              </div>
          </div>
      </div>
      `;

      for (const { key, name } of filterVideos(videos)) {
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");


        videoCard.innerHTML = `
        <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
        `;

        movieDetail.querySelector(".slider-inner").appendChild(videoCard);
      } 

      pageContent.appendChild(movieDetail);



      fetchdata(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?page=1`, addSuggestedMovies);
    }
);
    
      

const addSuggestedMovies = function({results: movieList }, title){
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movielist");
    movieListElem.ariaLabel = "You May Also Like";

    movieListElem.innerHTML = `
    <div class="title-wrapper">
        <h3 class="title-large">You May Also Like</h3>
    </div>

    <div class="sliderlist">
      <div class="sliderinner"></div>
    </div>
    `;

    for (const movie of movieList) {
        // Called from movie_card.js
        const movieCard = createMovieCard(movie);
    
        movieListElem.querySelector(".sliderinner").appendChild(movieCard);
      }
      pageContent.appendChild(movieListElem);
};


search();