import './SearchBar.css';
import { useState } from 'react';

function SearchBar(props){
    const [searchTerm, setSearchTerm] = useState('');
    /* where to keep this search term state? this is similar to playlistName 
    and yet it isn't tracked at App level? contravenes the 4th principle of thinking in react.  
    don't keep state at same level as component responsible for displaying. 
    this way. only SearchBar has access to precise searchTerm at any one time, 
    the App cannot call spotify in real time with searchTerm. Autocomplete. 
    searches that change without clicking on search button is out.
    */
    const search=()=>{
        // search is to call on App's search function passed down with props.onSearch
        props.onSearch(searchTerm);
    }

    const handleTermChange = (event) => {
        // function to call props.onChange for input's value. 
        // except state lives in searchBar atm, rather than App!
        const term = event.target.value;
        setSearchTerm(term);
    }


    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange} />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    )
}

export default SearchBar;