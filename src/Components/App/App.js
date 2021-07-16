import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { useState }from 'react';
import Spotify from '../../util/Spotify';

function App(props) {
  const [searchResults, setSearchResults] = useState([
    {id: '3dhjNA0jGA8vHBQ1VdD6vV', name:'I Feel It Coming', artist:'The Weeknd', album:'Starboy', uri:'spotify:track:3dhjNA0jGA8vHBQ1VdD6vV'},
    {id: '3AzjcOeAmA57TIOr9zF1ZW', name:'Physical', artist:'Dua Lipa', album:'Future Nostalgia', uri:'spotify:track:3AzjcOeAmA57TIOr9zF1ZW'},
    {id: '6ocbgoVGwYJhOv1GgI9NsF', name:'7 rings', artist:'Ariana Grande', album:'thank u, next', uri:'spotify:track:6ocbgoVGwYJhOv1GgI9NsF'}
  ]);
  
  
   const search = async (searchTerm) =>{
    // function that takes in a search term and use it to fetch data from spotify API
    Spotify.getAccessToken(); // getAccessToken is called before every search request!
    // use the results from calling Spotify.search to set state searchResults.;
    const tracks = await Spotify.search(searchTerm); 
    // when variable is assigned an expression. it tries to get the value that instant. need async await. 
    
    // update state searchResults with state setter. 
    console.log(tracks);
    setSearchResults(tracks);
  }
  
  const [playlistName, setPlaylistName] = useState('New Playlist');

  const savePlaylist=()=>{
    //save a user’s playlist to their Spotify account and resets the state of the playlist name and tracks array.
    const trackURIs = playlistTracks.map(t => t.uri);
    console.log(playlistName); // placeholder for util's Spotify method's first paramter - playlistName
    console.log(trackURIs)// placeholder for util's Spotify method - second parameter - playlistName
    setPlaylistName('');
    setPlaylistTracks([]);
  }
  
  const [playlistTracks, setPlaylistTracks] = useState([
    {id:'1U5XoeYZ4oOftvEKpAJUmP', name:'Hang With Me', artist:'Robyn', album:'Body Talk', uri:'spotify:track:1U5XoeYZ4oOftvEKpAJUmP'},
    {id:'15hut9fX33giUAMyycwvsV', name:'Call Your Girlfriend', artist:'Robyn', album:'Body Talk', uri:'spotify:track:15hut9fX33giUAMyycwvsV'},
    {id:'0ugOBAIRdG3Mto4SSxGr5r', name:'Be Mine!', artist:'Robyn', album:'Robyn', uri:'spotify:track:0ugOBAIRdG3Mto4SSxGr5r'}
  ])

  const addTrack = (track) =>{
    // provides a way to add to playlistTracks state. adding a track to list of existing tracks.
    if(!playlistTracks.some(result => result.id === track.id)){
      // if playlistTracks can find at least one instance. then track is already in the playlist
      setPlaylistTracks((prev)=>[...prev, track ]) // pass statesetter a statesetter callback function. 
    }
  }

  const removeTrack = (track)=>{
    if(playlistTracks.filter(result => result.id === track.id)){
      setPlaylistTracks((prev)=> prev.filter(t => t.id !== track.id)); // prev.filter returns a list. incorrect to write [prev.filter()] ,[...prev.filter()] is acceptable. 
    }
  }

  const updatePlaylistName = (name) => {
    // accepts a name and updates the playlistName state with it.
    // pass updatePlaylistName as prop onNameChange to Playlist.
    setPlaylistName(name);
  }
  
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* Add a SearchBar component */}
        <SearchBar onSearch={search}/>
        <div className="App-playlist">
          { /* Add a SearchResults component */ } 
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          { /* Add a Playlist component */}
          <Playlist playlistName={playlistName} playlistTracks={playlistTracks} onNameChange={updatePlaylistName} onRemove={removeTrack}/>
        </div>
      </div>
    </div>
  );
}

export default App;