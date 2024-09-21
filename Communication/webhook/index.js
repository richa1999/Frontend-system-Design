const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const payload = req.body;

    console.log('Recieved webhook payload', payload);

    res.status(200).send("Webhook recieved successfully!");
});

// app.get('/', (req,res) => {
//     res.sendFile(join(__dirname, 'index.html'));
// });

const port = process.env.PORT || 5011;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});