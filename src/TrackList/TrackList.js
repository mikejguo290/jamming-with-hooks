import './TrackList.css';
import Track from '../Track/Track'
function TrackList(props) {
    return (
        <div className="TrackList">
            {/* <!-- You will add a map method that renders a set of Track components  --> */}
            {props.searchResults.map(track => <Track key={track.id} />)}
        </div>
    );
}

export default TrackList;