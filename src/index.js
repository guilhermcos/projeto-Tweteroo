import express from "express"

const app = express();

app.get("/home",(req, res) => {
    res.send("Hello World");
})

const PORT = 5000;
app.listen(PORT);

