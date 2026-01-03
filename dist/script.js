"use strict";
let items = document.getElementById("item-list");
let addButton = document.getElementById("add-button");
let titleInput = document.getElementById("title-input");
let yearInput = document.getElementById("year-input");
const apiUrl = "http://localhost:3000/movies";
async function addMovie() {
    let title = titleInput.value;
    let year = yearInput.value;
    if (title.trim() === "" || year.trim() === "") {
        alert("Please enter a movie title and year.");
        return;
    }
    let newMovie = {
        title: title,
        year: parseInt(year),
    };
    try {
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
        });
        if (response.ok) {
            titleInput.value = "";
            yearInput.value = "";
            loadMovies();
        }
        else {
            console.error("Failed to add movie");
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
}
addButton.addEventListener("click", addMovie);
async function loadMovies() {
    items.innerHTML = "";
    try {
        let response = await fetch(apiUrl);
        let movie = await response.json();
        console.log(movie);
        for (let i = 0; i < movie.length; i++) {
            let title = movie[i].title;
            let year = movie[i].year;
            items.innerHTML += `
            <li>
                <span><i class="fas fa-film"></i>  ${title} (${year})</span>
                <a href="#details-section" class="list-link"> <i class="fas fa-info-circle"></i> Details</a>
          </li>
            `;
        }
    }
    catch (error) {
        console.error("List not found");
    }
}
loadMovies();
