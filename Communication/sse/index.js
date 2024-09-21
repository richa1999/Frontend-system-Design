const express = require('express');
const app = express();
const {join} = require('node:path');

app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Cache-Control', 'no-cache');

    res.write('data: Welcome to server sent event \n\n');

    const intervalId = setInterval(() => {
        res.write(`data: Server time ${new Date().toLocaleDateString()} \n\n`);
    }, 5000);

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

app.get('/', (req,res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

const port = process.env.PORT || 5011;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});