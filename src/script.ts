let items = document.getElementById("item-list") as HTMLUListElement;
let addButton = document.getElementById("add-button") as HTMLButtonElement;
let titleInput = document.getElementById("title-input") as HTMLInputElement;
let yearInput = document.getElementById("year-input") as HTMLInputElement;
let outputDetails = document.getElementById("contentDetails") as HTMLParagraphElement;

const apiUrl: string = "http://localhost:3000/movies";

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
    } else {
      console.error("Failed to add movie");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

addButton.addEventListener("click", addMovie);

async function deleteMovie(id: string) {
  try {
    let response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadMovies();
    } else {
      console.error("Failed to delete movie");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
(window as any).deleteMovie = deleteMovie;

async function loadMovies() {
  items.innerHTML = "";
  try {
    let response = await fetch(apiUrl);
    let movie = await response.json();
    console.log(movie);

    for (let i = 0; i < movie.length; i++) {
      let title = movie[i].title;
      let year = movie[i].year;
      let id = movie[i].id;

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
  } catch (error) {
    console.error("List not found");
  }
}

async function showDetails(id: string) {
  outputDetails.innerHTML = "";
  let movieId = id;

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
        outputDetails.innerHTML = `
            <h2>${title} (${year})</h2>
            <p><strong>Movie ID:</strong> ${id}</p>
            <p><strong>Watched:</strong> ${watchStatus ? "Yes" : "No"}</p>
      `;
      }
    }
  } catch (error) {
    console.error("List not found");
  }
}

loadMovies();
