'use strict';

import { imageBaseURL } from "./api.js";


// moviecard

export function createMovieCard(movie){

    const {
        poster_path,
        title,
        vote_average,
        release_date,
        id
    } = movie;

    const card = document.createElement("div");
    card.classList.add("moviecard");

    card.innerHTML = `
    <figure class="poster-box cardbanner">
    <img src="${imageBaseURL}w342${poster_path}" alt="${title}" class="imagecover" loading="lazy">
</figure>

<h4 class="title">${title}</h4>

<div class="metalist">
    <div class="metaitem">
        <img src="./assets/images/star.png" width="20" height="20" alt="rating">

        <span class="span">${vote_average.toFixed(1)}</span>
    </div>

    <div class="cardbadge">${release_date.split("-")[0]}</div>
</div>
<a href="./detail.html" class="cardbtn" title="${title}" onclick="getMovieDetail(${id})"></a>
    `;


    return card;
}