import express from "express";
import cors from "cors";
import data from "./data.js";
import hooks from "./hooks.js";
const { signUp, tweeting, getTweets, getTweetsByUser } = hooks

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
    signUp(req.body, res);
})
app.post("/tweets", (req, res) => {
    tweeting(req.body, res, req.headers.user);
})
app.get("/tweets", (req, res) => {
    const page = parseInt(req.query.page);
    console.log(page);
    getTweets(res, page);
})
app.get("/tweets/:USERNAME", (req, res) => {
    const { USERNAME } = req.params;
    getTweetsByUser(USERNAME, res);
})

const PORT = 5000;
app.listen(PORT);