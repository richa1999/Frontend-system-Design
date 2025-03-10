function setPreferences() {
    var preferences = document.getElementById("preferences").value;
    setCookie('userPreferences', preferences, 1);

    displayRecommendations(preferences);

    document.getElementById('preferences-container').style.display = 'none';
    document.getElementById('recommendations-container').style.display = 'block';
}

function displayRecommendationsOnLoad() {
    var preferences = getCookie('userPreferences');
    if(preferences){
        displayRecommendations(preferences);

        document.getElementById('preferences-container').style.display = 'none';
        document.getElementById('recommendations-container').style.display = 'block';
    }
}

function displayRecommendations(preferences){
    var recommendations = getRecommendations(preferences);
    document.getElementById('recommendation').innerHTML = recommendations;
}

function setCookie(name, value, hours){
    var expires = '';
    if(hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires;
}

function getCookie(name){
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');
    for(var i=0;i<cookies.length;i++){
        var cookie = cookies[i];
        while(cookie.charAt(0) === ' '){
            cookie = cookie.substring(1, cookie.length);
        }

        if(cookie.indexOf(nameEQ) === 0){
            return cookie.substring(nameEQ.length);
        }
    }

    return null;
}

function getRecommendations(preferences) {
    // make a request to the server to get recommendations
    // based on the user's preferences
    switch(preferences){
        case 'movies': 
            return 'Check out these movies...';

        case 'music':
            return 'Check out these songs...';

        case 'books':
            return 'Check out these books...';
        
        default:
            return 'No recommendations...';
    }
}

function logoutUser(){
    eraseCookie('userPreferences');

    document.getElementById('preferences-container').style.display = 'block';
    document.getElementById('recommendations-container').style.display = 'none';
}

function eraseCookie(name){
    document.cookie = name + '=; Max-Age=-99999999;';
}

window.onload = displayRecommendationsOnLoad;