const unirest = require("unirest");
const express = require('express');
const bp = require('body-parser')
const fs = require('fs');


var api = unirest("GET", "https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/AAPL/15m");

api.headers({
	"x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
	"x-rapidapi-key": "76827c2483msh7b70d5a01f78e54p14c1b4jsna5c938524024",
	"useQueryString": true
});

var sendData = "";

api.end(function (res) {
	if (res.error) throw new Error(res.error);

    sendData += "Companey: " + res.body.meta.symbol;
    sendData += "\nCurrent Price: " + res.body.meta.regularMarketPrice;
    sendData += "\nPrevious Price: " + res.body.meta.previousClose;
});

// express
const app = express();

app.use(
    bp()
    );

const configz = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
const PORT = configz.PORT;

app.post('/api/sendstuff/', (req, res) => {
    if (req.body) {
        console.log(`request recieved, printing now...`)
        console.log(req.body)
        res.status(200).send({message: 'request recieved'});
    }
    else
        res.status(500).send({message: 'error: was expecting a message body'})
});

app.get('/',(request, response) => {
    response.status(200).send(sendData);
});

app.listen(PORT, () => console.log(`server is up at port ${PORT}`));
