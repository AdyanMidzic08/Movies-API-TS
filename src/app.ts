import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Movie } from './types';
import { error } from 'node:console';
import { loadMovies, saveMovies } from './storage';

const app = express();
app.use(express.json());

let movies: Array<Movie> = [];

app.get("/", (req,res) => {
    res.send('TS is running')
}) 

async function initMovies() {
    movies = await loadMovies();
}

initMovies();

app.get("/movies",(req,res) => {
    res.send(movies);
})

//WORKS (did it with ECHOAPI extension)
app.post("/movies", (req,res) => {
    let { title } = req.body;
    let { year } = req.body;

    if(!title || !year) {
        res.status(400).json({error: "Forgot to add text or Year!"})
    }

    let movie: Movie = {
        id: uuidv4(),
        title,
        year,
        watched: false,
    }

    movies.push(movie);
    res.status(200).json({message: "successfully aded movie"})
    saveMovies(movies);
    res.send(movies);
})

export default app;