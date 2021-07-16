let accessToken;
const clientID='0a66fe9778db4fa8923d80227cc6f6d9';
const redirectURI='http://localhost:3000/';

const Spotify = {
    //create Spotify module as an object
    getAccessToken(){
        // return access_token if it exists. if not, extract it. 
        // call this function after final URL is obtained. this happens only after User logs in and authorizes app access 
        // this is doesnt start with the first step, which for the app is to redirect the user to authorize endpoint to request authorization from Spotify Accounts Service.
        /* 
        Step 80 of jamming tutorial is hard because it is five steps in one. 
        Dealing with authorization but doesn't implement the first step, as you might expect. (and doesn't help you locate which step).
        Uses Regex 
        Leans heavily into a previously untaught API - Uses windows API three times 
        to implement it this way, I should have an idea of what getAccessToken should return, then think though how it might deal with each scenario.
        and finaly in which order. 
        the getAccessToken function returns either an accessToken to the module, or extract it from final url, or get the final url. with a few redirects too. 
        It returns three disparate things. almost as if it is trying to do too much.

        ONE MORE THING
        if by now, you are tired of trying for yourself and hitting a brick wall. you start to follow
        the instructions instead. well, it never mentions where and how to use Spotify.getAccessToken!
        */

         // using implicit grant flow
        // documentation - https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow

        // 1. Redirect the user to the /authorize endpoint of the Accounts service:
        // https://accounts.spotify.com/authorize?client_id={}&redirect_uri={}&scope={}?state={}

        // 2. get access token from the final url if user grants permission. 
        //https://example.com/callback#access_token=NwAExz...

        // check if accessToken is already set in global variable, if so, return it 
        if(accessToken){
            return accessToken;
        };
        
        // if access token isn't set, check if the final URL for the access token.
        if(window.location.href.indexOf('access_token')!==-1 && window.location.href.indexOf('expires_in')!==-1){ // newer method String.includes(substring), 
            // if access token is in the final url, extract access_token, set expiry time for access token.
            
            const url = window.location.href;
            // extract access_token parameter value

            const accessTokenRegex = '[#&]access_token=([^&]+).*';
            accessToken = url.match(accessTokenRegex)[1]; // this affects global variable accessToken.
            // extract expires_in parameter value
            const expiresInRegex = '[#&]expires_in=([^&]+).*';
            const expiresIn = parseInt(url.match(expiresInRegex)[1]);
            
            // set access token to expire at a time
            window.setTimeout(()=> accessToken='', expiresIn*1000 ); // window.setTimeout executes a function after a delay, note setTimeout accepts delay arg in miliseconds.
            
            // clean the url of its parameters
            window.history.pushState({}, null, '/'); // window.history.pushState creates a new browser history entry setting the state, title, and url. i.e. set url without the parameters.
        }else{
            //accessToken is empty AND the final URL doesn't contain accessToken as a parameter.
            // Step 1 of authentication hasn't happened. Redirect the user to the /authorize endpoint of the Accounts service:
            // redirect the user with the redirect url
            const redirectURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=playlist-modify-public`
            window.location.href = redirectURL;
            // Spotify redirects user back to redirectURI WITH access_token, after user authorizes access.
        }


        // using implicit grant flow
        // documentation - https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow

        // 1. Redirect the user to the /authorize endpoint of the Accounts service:
        // https://accounts.spotify.com/authorize?client_id={}&redirect_uri={}&scope={}?state={}

        // 2. get access token from the final url if user grants permission. 
        //https://example.com/callback#access_token=NwAExz...
        

    },

    async search(searchTerm){
        // function to accept a search term input, use it to make a Spotify request and then return
        // response as a list of tracks.
        const type = 'track';
        const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=${type}&limit=20`;
        
        // make function async ... await. wrap fetch in try ... catch block.
        try{
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if(response.ok){
                const jsonResponse = await response.json();
                console.log(jsonResponse); // testing code
                
                // map the jsonResponse to App's state - searchResult's track's data structure before returning
                const tracks = jsonResponse.tracks.items().map(t => {
                    return {
                        name: t.name,
                        artist: t.artists[0].name,
                        album: t.album.name,
                        }
                    });
                return tracks;
                }
            throw new Error('Request has failed!');
        }catch(error){
            console.log(error);
        }
    },

}

export default Spotify;
