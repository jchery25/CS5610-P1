import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Label, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import _ from 'lodash';
import $ from 'jquery';

export default function index(root, channel) {
  ReactDOM.render(<Index channel={channel}/>, root);
}

class Index extends React.Component{
    constructor(props){
        super(props);
        this.channel = props.channel;
        this.state = {
            deck:[],
            players: [],
            maxPlayers: 0,
        }
        this.channel.join()
            .receive("ok", this.got_view.bind(this))
            .receive("error", resp => { console.log("Unable to join", resp); });
    }

    /*
    start(ev){
        ev.preventDefault();
        if(this.gamename.value === undefined || this.gamename.value === ""){
            alert("error");
        }
        if(this.noOfPlayers.value === undefined || this.noOfPlayers.value === ""){
            alert("error");
        }
        let playerlist = this.state.playerList;
        if(playerlist.length === 0){
            playerlist.push(this.gamename.value);
            let state1 = _.extend(this.state, {playerList : playerlist, playerNo: this.noOfPlayers.value});
            this.setState(state1);
        }
        else{
            let state1 = _.extend(this.state, {playerList : playerlist});
            this.setState(state1);
        }
        console.log(this.state);
    }

    */
    got_view(view){
        console.log("success");
        console.log(view);
        this.setState(view.game);
    }

    render(){
        if(this.state.deck.length === 0){
            return(
                <button></button>
            )

        }
        else{
        return(
        <Deck deck={this.state.deck} />
        );
        }
        /*
        if(this.state.playerList.length === 0){
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
        else{
            return(
                <Form>
                    <Row className="form-group">
                        <Label for="playername" md={4}>Player Name: 
                        <input type="text" md={8} id="playername" name="playername" ref={(c) => this.gamename = c} />
                        </Label>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Button color="success" value="Start" onClick={this.start.bind(this)}>Join Game</Button>
                        </Col>
                    </Row>
                </Form>
                );
        }
        */
    }
}

function Deck(params){
    let {deck} = params
    let convertDeck = Object.values(deck);
    let cards = [];

    for(let i = 0; i < convertDeck.length; i++){
        cards.push(<div className="card bg-info text-white" key={i}>
          <div className="card-header text-align">
            {convertDeck[i].suit}
          </div>
          <div className="card-body text-align">
            <button className="btn bg-transparent" id={i} value={convertDeck[i].symbol[i]}>{convertDeck[i].symbol[i]}</button>
          </div>
          <div className="card-footer text-align">
            {convertDeck[i].suit}
          </div>
          </div>);
      }

      return (cards);


    /*let buttons = convertDeck.map((e)=> {
        <button>e.suit</button>
    });
    // console.log(convertDeck[0].suit)
    */
    
}
