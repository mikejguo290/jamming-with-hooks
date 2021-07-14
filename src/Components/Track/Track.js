import './Track.css';

// not good practice to define functions inside other functions. as these are redefined each time the container function is called
// not possible to have methods in stateless functional components.
// so define a class method outside the function and call it with functionName.bind(null, parameters) in Track.

const renderAction = (isRemoval)=>{
    // displays a <button> element with - as its content if the isRemoval property is true, and a + <button> element if the isRemoval property is false
    if (isRemoval){
        return (<button className="Track-action">-</button>);
    }else{
        return (<button className="Track-action">+</button>);
    };    
}; 

function Track (){
    let isRemoval; // temporary solution
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{/* track name will go here */}</h3>
                <p>{/* <-- track artist will go here--> | <!-- track album will go here --> */}</p>
            </div>
            {/* button <!-- + or - will go here --> */}
            {renderAction.bind(null, isRemoval)}
        </div>
    );
}

export default Track;
