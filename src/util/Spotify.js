let accessToken;

const Spotify = {
    //create Spotify module as an object
    getAccessToken(){
        // return access_token if it exists. if not, extract it. 
        // call this function after final URL is obtained. 

        // check if access_token is already set, if so, return it 
        if(accessToken){
            return accessToken;
        };
        
        // if access token isn't set, check if the final URL for the access token.
        if(window.location.href.indexOf('access_token')!==-1 && window.location.href.indexOf('expires_in')!==-1){ // newer method String.includes(substring), 
            // if access token is in the final url, extract access_token, set expiry time for access token.
            
            const url = Window.location.href;
            // extract access_token parameter value

            const accessTokenRegex = '[#&]access_token=([^&]+).*';
            accessToken = url.match(accessTokenRegex)[1];
            // extract expires_in parameter value
            const expiresInRegex = '[#&]expires_in=([^&]+).*';
            const expiresIn = parseInt(url.match(expiresInRegex)[1]);
            
            // set access token to expire at a time
            window.setTimeout(()=> accessToken='', expiresIn*1000 ); // window.setTimeout executes a function after a delay, note setTimeout accepts delay arg in miliseconds.
            
            // clean the url of its parameters
            window.history.pushState({}, null, '/'); // window.history.pushState creates a new browser history entry setting the state, title, and url. i.e. set url without the parameters.
        }


        // using implicit grant flow
        //https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow

        // 1. Redirect the user to the /authorize endpoint of the Accounts service:
        // https://accounts.spotify.com/authorize?client_id={}&redirect_uri={}&scope={}?state={}

        // 2. get access token from the final url if user grants permission. 
        //https://example.com/callback#access_token=NwAExz...
        const clientID='0a66fe9778db4fa8923d80227cc6f6d9';
        const redirectURI='something';
        const scope='playlist-read-private%20playlist-modify-private'

    }

}

export default Spotify;
