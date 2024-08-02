'use strict';

import { sidebar } from "./sidebar.js";
import { imageBaseURL, fetchdata } from "./api.js";
import { createMovieCard } from "./movie-card.js"
import { search } from "./search.js";


const pagecontent = document.querySelector("[page-content]");


sidebar();


const homePageSection = [
    {
        title: "Upcoming Movies",
        path: "/movie/upcoming"
    },
    {
        title: "week's Trending Movies",
        path: "/trending/movie/week"
    },
    {
        title: "Today's Trending Movies",
        path: "/trending/movie/day"
    },
    {
        title: "Top Rated Movies",
        path: "/movie/top_rated"
    },
]




const genreList = {

    asString(genreIdList) {
        let newGenreList = [];

        for (const genreId of genreIdList) {
            this[genreId] && newGenreList.push(this[genreId]);
            // this == genreList;
        }

        return newGenreList.join(", ");
    }
};

fetchdata(`https://api.themoviedb.org/3/genre/movie/list?language=en`, function ({ genres }) {

    for (const { id, name } of genres) {
        genreList[id] = name;
    }

    fetchdata(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, heroBanner)

});



const heroBanner = function ({ results: movieList }) {
    const banner = document.createElement("section");
    banner.classList.add("banner");
    banner.ariaLabel = "Popular Movies"

    banner.innerHTML = `
    <div class="bannerslider">
    </div>

    <div class="slidercontrol">

                <div class="controlinner">
                </div>

    </div>
    `

    let controlItemIndex = 0;

    for (const [index, movie] of movieList.entries()) {
        const {
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id
        } = movie;


        const slideritem = document.createElement("div");
        slideritem.classList.add('slideritem');
        slideritem.setAttribute("slideritem", "");

        slideritem.innerHTML = `
        <img src="${imageBaseURL}w1280${backdrop_path}" alt="${title}" class="imagecover" loading=${index === 0 ? "eager" : "lazy"}>

        <div class="bannercontent">
            <h2 class="heading">
                ${title}
            </h2>
            <div class="metalist">
                <div class="metaitem">${release_date.split("-")[0]}</div>
                <div class="metaitem card-badge">${vote_average.toFixed(1)}</div>
            </div>
            <p class="genre">${genreList.asString(genre_ids)}</p>
            <p class="bannertext">
                ${overview}
            </p>

            <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
                <img src="./assets/images/play_circle.png" alt="play circle" width="24" height="24">
                <span class="span">Watch Now</span>
            </a>
        `;

        banner.querySelector(".bannerslider").appendChild(slideritem);


        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box", "slider-item");
        controlItem.setAttribute("slidercontrol", `${controlItemIndex}`);

        controlItemIndex++;

        controlItem.innerHTML = `
        <img src="${imageBaseURL}w154${poster_path}" class="imagecover" alt="slide to ${title}" loading="lazy" draggable="false">
        `

        banner.querySelector(".controlinner").appendChild(controlItem);
    }


    pagecontent.appendChild(banner);

    addHeroSlider();





    // fetch data for movies categorie
    for (const { title, path } of homePageSection) {
        fetchdata(`https://api.themoviedb.org/3${path}?language=en-US&page=1`, createMovieList, title);
    }
}






const addHeroSlider = function () {

    const sliderItems = document.querySelectorAll("[slideritem]");
    const sliderControl = document.querySelectorAll("[slidercontrol]");

    let lastSliderItem = sliderItems[0];
    let lastsliderContol = sliderControl[0];


    lastSliderItem.classList.add("active");
    lastsliderContol.classList.add("active");

    const sliderStart = function () {
        lastSliderItem.classList.remove("active");
        lastsliderContol.classList.remove("active");

        // this = sliderControl

        sliderItems[Number(this.getAttribute("slidercontrol"))].classList.add("active");
        this.classList.add("active")

        lastSliderItem = sliderItems[Number(this.getAttribute("slidercontrol"))];
        lastsliderContol = this;
    }

    sliderControl.forEach((element) => {
        element.addEventListener("click", sliderStart)
    })
}





const createMovieList = function ({ results: movieList },title) {
    const movieListEle = document.createElement("section");
    movieListEle.classList.add("movielist");
    movieListEle.setAttribute("arialabel", `${title}`);

    movieListEle.innerHTML = `
    <div class="titlewrapper">
    <h3 class="titlelarge">${title}</h3>
</div>

<div class="sliderlist">
    <div class="sliderinner"></div>
</div>
    `;

    for (const movie of movieList) {
        const movieCard = createMovieCard(movie) //called from movie_card.js

        movieListEle.querySelector(".sliderinner").appendChild(movieCard);
    }

    pagecontent.appendChild(movieListEle);

}


search();