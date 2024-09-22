const express = require('express');

const PORT = 3011;
const app = express();

app.use((req,res,next) => {
    res.setHeader('Referrer-Policy', 'no-referrer')
    res.removeHeader('X-Powered-By')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload;')
    next();
});

const redirectToHttps = (req,res,next) => {
    if(req.headers['x-forwarded-proto'] !== 'https'){
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
}

app.use(redirectToHttps);

app.get('/list', (req,res) => {
    res.send([{
        id: 1,
        title: "Namaste FrontendSystem Design"
    }]);
})

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})