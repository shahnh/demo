const request = require('request');
const unirest = require("unirest");
const express = require('express');
const bp = require('body-parser')
const fs = require('fs');


var dataJSON;

// express
const app = express();

app.use(
    bp()
);

const configz = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
const PORT = configz.PORT;

var ticketSys;

app.post('/post/:id', (expressrequest, response) => {
    //console.log(expressrequest)
    if (expressrequest.params.id) {
        ticketSys = expressrequest.params.id.trim()
        var requestOptions = {
            'url': 'https://api.tiingo.com/iex/?tickers=' + ticketSys + '&token=5bcb836c60cd59fea66e70a1e77c1170a8908a57',
            'headers': {
                'Content-Type': 'application/json'
            }
        }
        request(requestOptions,
            function(error, res, body) {
                response.status(200).send(body[0]);
                console.log(body[0]);
            })
    }
    else
        res.status(500).send({ message: 'error: was expecting a message body' })
})

// var requestOptions = {
//     'url': 'https://api.tiingo.com/iex/?tickers=' + ticketSys + '&token=5bcb836c60cd59fea66e70a1e77c1170a8908a57',
//     'headers': {
//         'Content-Type': 'application/json'
//     }
// };
// console.log(requestOptions);

// app.get('/',(expressrequest, response) => {
// 	request(requestOptions,
//     function(error, res, body) {
//         response.status(200).send(body);
//     })
// });

app.listen(PORT, () => console.log(`server is up at port ${PORT}`));
