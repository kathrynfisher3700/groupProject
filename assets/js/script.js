$(function () {
/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
//------------------------------------------Variables-----------------------------------------//
/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

let genreKeyword = "jazz funk";

// Variables for querying Spotify API
let token = '';
let genreQuery = 'genre:Jazz';

// These are Kurt's personal keys. Keep them safe please! We will find a way to hide them at deployment
const clientId = '9b02b31eb7e14eaf81a656da43032fd4';
const clientSecret = '8fc2d6a117fe42f0a1eb4c97ba4c1b8f';

// Base64 encode the client ID and client secret
const base64Credentials = btoa(`${clientId}:${clientSecret}`);

// Set up the request headers
const headers = {
    Authorization: `Basic ${base64Credentials}`,
    'Content-Type': 'application/x-www-form-urlencoded',
};

// Set up the request body
const body = 'grant_type=client_credentials';





/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
//------------------------------------------Functions-----------------------------------------//
/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

function getArtistsInGenre() {
    const accessToken = token;
    // const genreKeyword = 'jazz'; // Replace with the desired genre keyword
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(genreKeyword)}&type=artist`;

    fetch(searchEndpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    })
        .then(response => response.json())
        .then(data => {
            const artists = data.artists.items;
            console.log('Artists in the specified genre:', artists);
        })
        .catch(error => console.error('Error:', error));
}

// Make the token request
const getToken = async () => {
    await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: headers,
        body: body,
    })
        .then((response) => response.json())
        .then((data) => {
            // Extract the access token from the response
            console.log(data);
            const accessToken = data.access_token;
            token = accessToken;
            console.log('Access Token:', accessToken);
            // Use this access token to make requests to the Spotify API
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getSpotifyData() {
    // Your Spotify API endpoint for genres
    const genresEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(genreQuery)}&type=artist`;

    // Make the API request to get a list of genres
    fetch(genresEndpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to fetch genres');
            }
        })
        .then(data => {
            console.log(data);
            const genres = data.genres;
            console.log('List of Spotify genres:', genres);
        })
        .catch(error => console.error('Error:', error));
}

async function generate() {
    await getToken();
    getSpotifyData();
    getArtistsInGenre();
}

generate();





/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
//-------------------------------------Event listeners----------------------------------------//
/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
    // var genreBtn = document.querySelector("")

});