"use strict";
let items = document.getElementById("item-list");
let watchedItems = document.getElementById("watched-list");
let addButton = document.getElementById("add-button");
let titleInput = document.getElementById("title-input");
let yearInput = document.getElementById("year-input");
let outputDetails = document.getElementById("contentDetails");
let actionBtn = document.getElementById("action-btn");
let clearBtn = document.getElementById("clear-btn");
let currentMovieId = null;
let currentMovieWatched = false;
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
async function deleteMovie(id) {
    try {
        let response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            loadMovies();
        }
        else {
            console.error("Failed to delete movie");
        }
    }
    catch (error) {
        console.error("Error:", error);
    }
}
window.deleteMovie = deleteMovie;
async function loadMovies() {
    if (items)
        items.innerHTML = "";
    if (watchedItems)
        watchedItems.innerHTML = "";
    try {
        let response = await fetch(apiUrl);
        let movie = await response.json();
        console.log("Loaded movies:", movie);
        for (let i = 0; i < movie.length; i++) {
            let title = movie[i].title;
            let year = movie[i].year;
            let id = movie[i].id;
            let watched = movie[i].watched;
            console.log(`Movie: ${title}, Watched: ${watched}`);
            if (!watched) {
                if (items) {
                    items.innerHTML += `
            <li>
                <span><i class="fas fa-film"></i>  ${title} (${year})</span>
                <div class="action-buttons">
                    <a href="#details-section" onclick="showDetails('${id}')" class="list-link"> <i class="fas fa-info-circle"></i> Details</a>
                    <button onclick="deleteMovie('${id}')" class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
          </li>
            `;
                }
            }
            else {
                if (watchedItems) {
                    watchedItems.innerHTML += `
            <li class="watched">
                <span><i class="fas fa-film"></i>  ${title} (${year})</span>
                <div class="action-buttons">
                    <a href="#details-section" onclick="showDetails('${id}')" class="list-link"> <i class="fas fa-info-circle"></i> Details</a>
                    <button onclick="deleteMovie('${id}')" class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
          </li>
            `;
                }
            }
        }
    }
    catch (error) {
        console.error("List not found", error);
    }
}
async function showDetails(id) {
    outputDetails.innerHTML = "";
    let movieId = id;
    currentMovieId = id;
    try {
        let response = await fetch(apiUrl);
        let movie = await response.json();
        console.log(movie);
        for (let i = 0; i < movie.length; i++) {
            if (movie[i].id == movieId) {
                let title = movie[i].title;
                let year = movie[i].year;
                let id = movie[i].id;
                let watchStatus = movie[i].watched;
                currentMovieWatched = watchStatus;
                outputDetails.innerHTML = `
            <h2>${title} (${year})</h2>
            <p><strong>Movie ID:</strong> ${id}</p>
            <p><strong>Watched:</strong> ${watchStatus ? "Yes" : "No"}</p>
      `;
                if (watchStatus) {
                    actionBtn.innerHTML = '<i class="fas fa-times"></i> Unwatch';
                }
                else {
                    actionBtn.innerHTML =
                        '<i class="fas fa-check"></i> Have you watched?';
                }
            }
        }
    }
    catch (error) {
        console.error("List not found");
    }
}
//global function
window.showDetails = showDetails;
actionBtn.addEventListener("click", async () => {
    if (currentMovieId) {
        let newStatus = !currentMovieWatched;
        try {
            let response = await fetch(`${apiUrl}/${currentMovieId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ watched: newStatus }),
            });
            if (response.ok) {
                showDetails(currentMovieId);
                loadMovies();
            }
        }
        catch (error) {
            console.error("Error toggling watched status", error);
        }
    }
    else {
        alert("No movie selected!");
    }
});
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        outputDetails.innerHTML =
            "Details about the selected movie could appear here.";
        currentMovieId = null;
        actionBtn.innerHTML = '<i class="fas fa-check"></i> Mark as watched';
    });
}
loadMovies();
