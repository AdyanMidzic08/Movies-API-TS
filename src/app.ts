import express from "express";
import { v4 as uuidv4 } from "uuid";
import { Movie } from "./types";
import { loadMovies, saveMovies } from "./storage";
import { error } from "node:console";

const app = express();
app.use(express.json());

let movies: Array<Movie> = [];

app.get("/", (req, res) => {
  res.send("TS is running");
});

async function initMovies() {
  movies = await loadMovies();
}

initMovies();

app.get("/movies", (req, res) => {
  res.send(movies);
});

//WORKS (did it with ECHOAPI extension)
app.post("/movies", (req, res) => {
  let { title } = req.body;
  let { year } = req.body;

  if (!title || !year) {
    return res.status(400).json({ error: "Forgot to add text or Year!" });
  }else {

    let movie: Movie = {
        id: uuidv4(),
        title,
        year,
        watched: false,
    };

    movies.push(movie);
    saveMovies(movies);
    res.send(movies);
    return res.status(200).json({message: "successfully added a movie"});
}
  
});

app.delete("/movies/:id", (req, res) => {
  let id = req.params.id;
  let newMovies: Array<Movie> = [];
  const lengthBefore = movies.length;

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id !== id) {
      newMovies.push(movies[i]);
    }
  }

  movies = newMovies;

  if (movies.length == lengthBefore) {
    return res.status(400).json({ error: "ID not found" });
  } else {
    saveMovies(movies);
    res.send(movies);
    return res.status(201).json({ message: "Movie was successfully deleted!" });
  }
});

export default app;
