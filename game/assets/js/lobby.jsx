import React from 'react';
import ReactDOM from 'react-dom';

class Lobby extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
    return(
            <div>
            <div className="row">
                <Header />
            </div>
                <Rules />
        </div>
    );
    }
}

function Header(){
    return(
        <div className="col col-md-12">
            <p>Welcome to One</p>
            <p>Please take a look at the rules while we wait for the rest of the players or you can chat with the other players here.</p>
        </div>
    );
}

function Rules(){
    return(
        <div className="row">
            <div className="col">
                <p>You will receive a set of 7 cards. And a card is displayed on the board.</p>
            </div>
        </div>
    );
}

export default Lobby;