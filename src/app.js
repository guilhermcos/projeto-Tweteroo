import express from "express";
import cors from "cors";
import showSomething from "./hooks.js";
import data from "./data.js";
import hooks from "./hooks.js";
const { signUp, tweeting, getTweets } = hooks

const app = express();

app.use(cors);
app.use(express.json());

app.post("/sign-up", (req, res) => {
    signUp(req.body, res);
})
app.post("/tweets", (req, res) => {
    tweeting(req.body, res);
    console.log(data.serverTweets);
})
app.get("/tweets", (req, res) => {
    getTweets(res);
})
app.get("/home", (req, res) => {
    res.send(showSomething());
});

const PORT = 5000;
app.listen(PORT);