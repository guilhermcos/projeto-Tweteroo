import express from "express";
import cors from "cors";
import data from "./data.js";
import hooks from "./hooks.js";
const { signUp, tweeting, getTweets } = hooks

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
    signUp(req.body, res);
})
app.post("/tweets", (req, res) => {
    tweeting(req.body, res);
})
app.get("/tweets", (req, res) => {
    getTweets(res);
})

const PORT = 5000;
app.listen(PORT);