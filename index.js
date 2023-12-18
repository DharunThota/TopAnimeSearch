import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const URL = "https://api.jikan.moe/v4"

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/search", async (req, res) => {
    try {
        const result = await axios.get(URL + "/anime", {
            params: {
                q: req.body.q,
            }
        });
        res.render("index.ejs", {
            data: result.data["data"] 
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: error.message});
    }
});

app.post("/filter", async (req, res) => {
    try {
        const result = await axios.get(URL + "/top/anime", {
            params: getParams(req.body)
        });
        res.render("index.ejs", {
            data: result.data["data"] 
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {error: error.message});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function getParams(data) {
    var params = {};
    if(data.type != ''){
        params.type = data.type;
    }
    if(data.filter != ''){
        params.filter = data.filter;
    }
    if(data.limit != ''){
        params.limit = data.limit;
    }
    if(data.rating != ''){
        params.rating = data.rating;
    }
    return params;
}