import express from 'express';

const app = express();

app.get("/", (req,res) => {
    res.send('TS is running')
}) 

export default app;