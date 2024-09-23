const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));


// Middleware to check referrer.
app.use((req, res, next) => {
    const referrer = req.get('Referer');

    if(referrer && referrer.startsWith('https://yourwebsite.com')){
        next();
    } else {
        res.status(403).send('Forbidden');
    }
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen()