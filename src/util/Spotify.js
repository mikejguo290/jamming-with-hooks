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
