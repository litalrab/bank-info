const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const http = require('http');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
var fs = require('fs');
var https = require('https');

// var xmlfile = __dirname + "/../public/xmlfiles/booksxml.xml";
var xmlfile = "snifim_dnld_he.xml";
var books;
fs.readFile(xmlfile, "utf-8", function (error, text) {
    if (error) {
        throw error;
    }else {
        parser.parseString(text, function (err, result) {
            if(error === null) {
                 books = result['BRANCHES']['BRANCH'];
            }
            else {
                console.log(error);
            }
        });
    }
});

app.get('/names/:char', (req, res) => {

    try {
        const { char  } = req.params;
        var afterFilter=books.filter(b => b['Bank_Name'].toString().includes(char)).map(b=> b.Bank_Name)
        res.status(200);
        res.json(afterFilter);
    }
    catch (ex) {
        res.status(500);
    }

})
app.get('/branch/:bankName', (req, res) => {

    try {
        const { bankName  } = req.params;
        var afterFilter=books.filter(b => b['Bank_Name'].toString().includes(bankName)).map(b=> b.Branch_Code)
        res.status(200);
        res.json(afterFilter);
    }
    catch (ex) {
        res.status(500);
    }

})


app.get('/details/:bankName/:branchNumber', (req, res) => {

    try {
        const { bankName ,branchNumber  } = req.params;
        var afterFilter=books.filter(b => b['Bank_Name'].toString().includes(bankName)&&  b['Branch_Code'].toString() === branchNumber  )
        res.status(200);
        res.json(afterFilter);
    }
    catch (ex) {
        res.status(500);
    }

})

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');

