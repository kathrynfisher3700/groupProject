$(function () {
    /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
    //------------------------------------------Variables-----------------------------------------//
    /*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

    let genreKeyword = "jazz funk";

    // Variables for querying Spotify API
    let token = '';
    let genreNeeded = 'Jazz';
    let genreQuery = `genre:${genreNeeded}`;

    // These are Kurt's personal keys. Keep them safe please! We will find a way to hide them at deployment
    const clientId = '838b3be49dbd4b3fbeee945d6a9894cc';
    const clientSecret = '21f201cfdb0a474baf535b148e91e24e';


    // API suffices
    // Main suffix passed into getSpotifyData function
    // Update this to desired string, then pass to getSpotifyData
    let apiSuffix = `search?q=${encodeURIComponent(genreKeyword)}&type=artist`;

    let listGenresSuffix = 'recommendations/available-genre-seeds';


    /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
    //------------------------------------------Functions-----------------------------------------//
    /*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

    // Make the token request
    const getToken = async () => {
        // Convert client ID and client secret to base64 for token request (required)
        const base64Credentials = btoa(`${clientId}:${clientSecret}`);

        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${base64Credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
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

    function getArtistsInGenre() {
        const accessToken = token;
        // const genreKeyword = 'jazz'; // Replace with the desired genre keyword
        const searchEndpoint = `https://api.spotify.com/v1/${apiSuffix}`;

        fetch(searchEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // const artists = data.artists.items;
                // console.log('Artists in the specified genre:', artists);
            })
            .catch(error => console.error('Error:', error));
    }

    function getSpotifyData(apiSuffix) {
        // Spotify API endpoint
        console.log(`suffix is ${apiSuffix}`);
        const spotifyEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(genreQuery)}&type=artist`;

        // Make the API request to get a list of genres
        fetch(spotifyEndpoint, {
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
        getSpotifyData(apiSuffix);
        getArtistsInGenre();
    }

    generate();





    /*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
    //-------------------------------------Event listeners----------------------------------------//
    /*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
    // var genreBtn = document.querySelector("")

});