'use strict';


// toggle search box in mobile device 
const searchBox = document.querySelector(".search-box");
const searchTogglers = document.querySelectorAll(".search-toggler");

searchTogglers.forEach((toggler) => {
    toggler.addEventListener("click", () => {
        searchBox.classList.toggle("active");
    });
})

const getMovieDetail = function (movieId) {
    window.localStorage.setItem("movieId", String(movieId));
};

const getMovieList = function (urlParam, genreName) {
    window.localStorage.setItem("urlParam", urlParam);
    window.localStorage.setItem("genreName", genreName);
};