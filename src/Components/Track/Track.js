import './Track.css';

// not good practice to define functions inside other functions. as these are redefined each time the container function is called
// not possible to have methods in stateless functional components.
// so define a class method outside the function and call it with functionName.bind(null, parameters) in Track.

function Track (props){
    const {name, artist, album } = props.track;
    const isRemoval = props.isRemoval;

    const renderAction = () =>{
        // displays a <button> element with - as its content if the isRemoval property is true, and a + <button> element if the isRemoval property is false
        if (isRemoval){
            return (<button className="Track-action" onClick={removeTrack}>-</button>);
        }else{
            return (<button className="Track-action" onClick={addTrack}>+</button>);
        };
    };

    const addTrack = () => {
        // wrapper for the function passed down from App of the same name. 
        props.onAdd(props.track);
    }

    const removeTrack = () => {
        // wrapper for the function passed down from App of the same name. 
        props.onRemove(props.track);
    }

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist} | {album}</p>
            </div>
            {/* button <!-- + or - will go here --> */}
            {renderAction()}
        </div>
    );
}

export default Track;
