const express = require('express');
const app = express();

app.use((req,res,next) => {
    res.setHeader('Permissions-Policy', 'geolocation=()');
    next();
})

app.get('/page', (req,res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width; initial-scale=1.0">
          <title>Fetch geolocation permission Example</title>
        </head>
        <body>
            <h1>Fetch geolocation permission Example</h1>
            <button onclick="getGeolocation()">Fetch data</button>
            <div id="result"></div>

            <script>
                function getGeolocation() {
                    if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(
                            function(position){
                                const latitude = position.coords.latitude;
                                const longitude = position.coords.longitude;

                                console.log('Latitude: ', latitude);
                                console.log('Longitude: ', longitude);
                            },
                            function(error){
                                switch(error.code){
                                    case error.PERMISSION_DENIED:
                                        console.log('User Denied the request for geolocation.');
                                        break;
                                }
                            }
                        )
                    }
                }
            </script>
        </body>
        `)
})

const PORT = 3011;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});