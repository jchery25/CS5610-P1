import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Label, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import _ from 'lodash';
import $ from 'jquery';

import Game from "./game";

export default function index(root, channel) {
  ReactDOM.render(<Index channel={channel}/>, root);
}

class Index extends React.Component{
    constructor(props){
        super(props);
        this.channel = props.channel;
        this.state = {
            players: [],
            maxPlayers: 0,
        }
        this.channel.join()
            .receive("ok", this.got_view.bind(this))
            .receive("error", resp => { console.log("Unable to join", resp); });

        this.channel.on("update", this.got_view.bind(this));
    }

    start(ev){
        ev.preventDefault();
        let name = this.gamename.value;
        let num = this.noOfPlayers.value;
        if(this.gamename.value === undefined || this.gamename.value === ""){
            alert("error");
        }
        if(this.noOfPlayers.value === undefined || this.noOfPlayers.value === ""){
            alert("error");
        }
        this.playername = name;
        this.channel.push("add_player", {player_name: name, max_players: num})
        .receive("ok", this.got_view.bind(this));
    }


    got_view(view){
        this.setState(view.game);
        console.log(view.game);
        if (this.state.players.length === parseInt(this.state.maxPlayers, 10)){
            //render Game
            console.log("should render game now");
        }
    }

    render(){
        if(this.state.players.length === 0){
            return(
                <Form>
                    <Row className="form-group">
                        <Label for="playername" md={4}>Player Name: 
                        <input type="text" md={8} id="playername" name="playername" ref={(c) => this.gamename = c} />
                        </Label>
                    </Row>
                    <Label for = "noofplayers" md={4}>Game Name: 
                            <select id="noofplayers" md={8} ref={(d) => this.noOfPlayers = d}>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                    </Label>
                    <Row className="form-group">
                        <Col>
                            <Button color="success" value="Start" onClick={this.start.bind(this)}>Start Game</Button>
                        </Col>
                    </Row>
                </Form>
                );
            }
        else if(this.state.players.length === parseInt(this.state.maxPlayers,10)){
            return(<Game root={this} />);
        }
        else{
            return(
                <div>
                    Waiting for other players to join
                </div>
            );
        }
    }
}
/*

function Deck(params){
    let {deck} = params
    let convertDeck = Object.values(deck);
    let cards = [];

    for(let i = 0; i < convertDeck.length; i++){
        cards.push(<div className="row">
        <div className="card col-md-1 bg-info text-white" key={i}>
          <div className="card-header text-align">
            {convertDeck[i].suit}
          </div>
          <div className="card-body text-align">
            <button className="btn bg-transparent" id={i} value={convertDeck[i].symbol[i]}>{convertDeck[i].symbol[i]}</button>
          </div>
          <div className="card-footer text-align">
            {convertDeck[i].suit}
          </div>
          </div>
          </div>);
      }

      return (cards);


    /*let buttons = convertDeck.map((e)=> {
        <button>e.suit</button>
    });
    // console.log(convertDeck[0].suit)
    */
    
