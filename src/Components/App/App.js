import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import useState from 'react';

function App(props) {
  const [searchResults, setSearchResults] = useState([
    {name:'I feel it coming', artist:'The Weeknd', album:'Starboy'},
    {name:'Physical', artist:'Dua Lipa', album:'Club Future Nostalgia'},
    {name:'7 rings', artist:'Ariana Grande', album:'thank u, next'}
  ]);

  const [playlistName, setPlaylistName] = useState('New Playlist');
  
  const [playlistTracks, setPlaylistTracks] = useState([
    {name:'Hang with me', artist:'Robyn', album:'Body Talk Pt. 1'},
    {name:'Call your girlfriend', artist:'Robyn', album:'Body Talk'},
    {name:'Be mine', artist:'Robyn', album:'Robyn'}
  ])
  
  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        {/* Add a SearchBar component */}
        <SearchBar />
        <div className="App-playlist">
          { /* Add a SearchResults component */ } 
          <SearchResults searchResults={searchResults}/>
          { /* Add a Playlist component */}
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;