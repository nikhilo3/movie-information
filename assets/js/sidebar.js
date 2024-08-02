// 'use strict'

import { imageBaseURL, fetchdata } from "./api.js"

const sidebar = () => {
    const genreList = {};

    fetchdata(`https://api.themoviedb.org/3/genre/movie/list?language=en`, function ({ genres }) {

        for (const { id, name } of genres) {
            genreList[id] = name;
        }

        genreLink();
    });

    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebarinner");

    sidebarInner.innerHTML = `
        <div class="sidebarlist">
                <p class="title">genre</p>

            </div>

            <div class="sidebarlist">
                <p class="title">Language</p>

                <a href="./movie-list.html" menu-close class="sidebarlink" onclick='getMovieList("with_original_language=en", "English")'>English</a>
                <a href="./movie-list.html" menu-close class="sidebarlink" onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>
                <a href="./movie-list.html" menu-close class="sidebarlink" onclick='getMovieList("with_original_language=bn", "Bengali")'>Bengali</a>

            </div>

            <div class="sidebarfooter">
                <p class="copywrite">
                    Copyright 2023
                    <a href="#">Nikhil ladani</a> 
                </p>

                <img src="./assets/images/tmdb-logo.svg" alt="the movie database logo" width="130" height="17">
            </div>
    `;

    const genreLink = function () {
        for (const [genreId, genreName] of Object.entries(genreList)) {
            const link = document.createElement("a");
            link.classList.add("sidebarlink")
            link.setAttribute("href", "./movie-list.html");
            link.setAttribute("menu-close", "");
            link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
            link.textContent = genreName;

            sidebarInner.querySelectorAll(".sidebarlist")[0].appendChild(link);
        }

        const sidebar = document.querySelector(".sidebar");
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar);
    }

    const toggleSidebar = function (sidebar) {

        const sidebarBtn = document.querySelector("[menu-btn]");
        const sidebarToggler = document.querySelectorAll("[menu-toggler]")
        const sidebarClose = document.querySelectorAll("[menu-close]");

        const overlay = document.querySelector("[overlay]");

        sidebarToggler.forEach((elements) => {
            elements.addEventListener("click", () => {
                sidebar.classList.toggle("active");
                sidebarBtn.classList.toggle("active");
                overlay.classList.toggle("active");
            });
        });

        sidebarClose.forEach((elements) => {
            elements.addEventListener("click", () => {
                sidebar.classList.remove("active");
                sidebarBtn.classList.remove("active");
                overlay.classList.remove("active");
            });
        })
    }
}

export { sidebar };