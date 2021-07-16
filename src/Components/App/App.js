import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { useState }from 'react';
import Spotify from '../../util/Spotify';

function App(props) {
  const [searchResults, setSearchResults] = useState([
    {id: 1, name:'I feel it coming', artist:'The Weeknd', album:'Starboy'},
    {id: 2, name:'Physical', artist:'Dua Lipa', album:'Club Future Nostalgia'},
    {id: 3, name:'7 rings', artist:'Ariana Grande', album:'thank u, next'}
  ]);
  
  
   const search = async (searchTerm) =>{
    // function that takes in a search term and use it to fetch data from spotify API
    Spotify.getAccessToken(); // getAccessToken is called before every search request!
    // use the results from calling Spotify.search to set state searchResults.;
    const tracks = await Spotify.search(searchTerm); 
    // when variable is assigned an expression. it tries to get the value that instant. need async await. 
    
    // update state searchResults with state setter. 
    setSearchResults(tracks);
  }
  
  const [playlistName, setPlaylistName] = useState('New Playlist');
  
  const [playlistTracks, setPlaylistTracks] = useState([
    {id:4, name:'Hang with me', artist:'Robyn', album:'Body Talk Pt. 1'},
    {id:5, name:'Call your girlfriend', artist:'Robyn', album:'Body Talk'},
    {id:6, name:'Be mine', artist:'Robyn', album:'Robyn'}
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