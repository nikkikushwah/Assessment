// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    try {

        const { stockSymbol, date } = req.body;
        let apiKey = "GDnpp3l53lqW8JwVNuoUvC4CEIXQ7JYK";
        let url = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol.toUpperCase()}/range/1/day/${date}/${date}?apiKey=${apiKey}`;
        let response = await axios.get(url)
        console.log(response.data.resultsCount);
        if (response.data.resultsCount == 0) {
            return res.status(500).json({ error: 'Something went wrong, Please try again' });
        }
        let data = response.data.results;
        let stockData = {};
        stockData.volume = data[0].v;
        stockData.open = data[0].o;
        stockData.close = data[0].c;
        stockData.low = data[0].l;
        stockData.high = data[0].h;

        return res.status(200).json({ stockData, message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
    // res.sendStatus(200);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));