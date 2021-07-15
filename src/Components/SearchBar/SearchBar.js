import './SearchBar.css';
import { useState } from 'react';

function SearchBar(props){
    const [searchTerm, setSearchTerm] = useState('');
    /* where to keep this search term state? this is similar to playlistName 
    and yet it isn't tracked at App level? contravenes the 4th principle of thinking in react.  
    don't keep state at same level as component responsible for displaying. 
    this way. only SearchBar has access to precise searchTerm at any one time, 
    the App does not and cannot call real time methods on searchTerm. 
    */
    const search=()=>{
        // search is to call on App's search function passed down with props.onSearch
        props.onSearch(searchTerm);
    }

    // function to call props.onChange for input's value. 

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    )
}

export default SearchBar;