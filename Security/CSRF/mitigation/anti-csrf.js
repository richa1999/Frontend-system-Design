const express = require('express');
const bodyParser  =require('body-parser')
const session = require('express-session')
const crypto = require('crypto')

const app = express()
const port = 3000;

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res) => {
    if(!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString('hex');
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width" >
            <title>Fund Transfer Form</title>
          </head>
          <body>
             <form id="transferForm" action="/fundTransfer" method="POST" >
                <h1>Special Fund Transfer Offer!</h1>
                <p>Transfer funds now and get a free gift worth $50</p>
                <input type="hidden" name="accId" value="224422" />
                <input type="hidden" name="amount" value="50000" />

                <input type="hidden" name="csrf_token" value=${req.session.csrfToken} />

                <input type="submit" value="Click to get your gift!" />
            </form>

            <script>
                document.getElementById('transferForm').addEventListener('submit', function(event) {
                     const submittedToken = document.querySelector('input[name="csrf_token"]').value;
                     if(submittedToken !== '${req.session.csrfToken}') {
                        event.preventDefault();
                        alert('CSRF Token Validation Failed');
                     }
                    });
            </script>
         </body>
         </html>
        `);
});

app.post('/fundTransfer', (req,res) => {
    const submittedToken = req.body.csrf_token;
    if(!submittedToken || submittedToken !== req.session.csrfToken) {
        res.status(403).send('CSRF Token Validation Failed!');
        return;
    }

    delete req.session.csrfToken;

    res.send('Form Submitted');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})