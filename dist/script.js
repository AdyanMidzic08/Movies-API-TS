"use strict";
let items = document.getElementById("item-list");
async function loadMovies() {
    items.innerHTML = '';
    try {
        let response = await fetch("http://localhost:3000/movies");
        let movie = await response.json();
        console.log(movie);
        for (let i = 0; i < movie.length; i++) {
            let title = movie[i].title;
            items.innerHTML += `
            <li>
                <span><i class="fas fa-film"></i>  ${title}</span>
                <a href="#details-section" class="list-link"
                ><i class="fas fa-info-circle"></i> Details</a
                >
          </li>
            `;
        }
    }
    catch (error) {
        console.error('List not found');
    }
}
loadMovies();
