import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist(props){
    
    const handleNameChange = (event) =>{
        // on every input change, call updatePlaylistName passed down from App to update state playlistName.
        const name = event.target.value;
        props.onNameChange(name);
    };

    return (
        <div className="Playlist">
            <input value={props.playlistName} onChange={handleNameChange}/>
            {/* Add a TrackList component */}
            <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true} />
            <button className="Playlist-save">SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;