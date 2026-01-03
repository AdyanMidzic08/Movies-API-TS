import { promises as fs } from "fs";
import path from "path";
import { Movie } from "./types";

const FILE_PATH = path.join(__dirname, "..", "movies.json");

export async function loadMovies(): Promise<Movie[]> {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data) as Movie[];
  } catch (err) {
    return [];
  }
}

export async function saveMovies(movies: Movie[]): Promise<void> {
  await fs.writeFile(FILE_PATH, JSON.stringify(movies, null, 2), "utf-8");
}
