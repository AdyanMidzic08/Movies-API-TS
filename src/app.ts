import express from 'express';

const app = express();
app.use(express.json());

let movies: object = [];

app.get("/", (req,res) => {
    res.send('TS is running')
}) 

app.get("/movies",(req,res) => {
    res.send(movies);
})

export default app;