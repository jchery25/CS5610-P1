import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Row, Col, Label, Button } from 'reactstrap';
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
            playername: "",
            nextComponent: "",
            gameName: "",
            listOfGames: ["Abc","Bcd","GHUG","YGy"]
        }
    }

    start(ev){
        ev.preventDefault();
        console.log("enter start");
        let name = document.getElementById("playername").value;
        console.log(name);
        if(name === undefined || name === ""){
            alert("Please enter a valid name");
        }
        else{
            let state1 = _.extend(this.state, {playername: name, nextComponent: ev.target.value});
            this.setState(state1);
        }
    }

    got_view(view){
        console.log("success");
        console.log(view);
        
    }

    startGame(ev){
        ev.preventDefault();
        let name = document.getElementById("gameName").value;
        if(name === undefined || name === ""){
            alert("Please enter a valid name");
        }
        else{
            let state1 = _.extend(this.state, {gameName: name});
            this.setState(state1);
            window.gameName = name;
            this.channel.join()
            .receive("ok", this.got_view.bind(this))
            .receive("error", resp => { console.log("Unable to join", resp); });
        }
    }
    
    join(ev){
        ev.preventDefault();
        let name = document.getElementById("playername").value;
        if(name === undefined || name === ""){
            alert("Please enter a valid name");
        }
        else{
            let state1 = _.extend(this.state, {playername: name, nextComponent: ev.target.value});
            this.setState(state1);

        }
    }

    watch(ev){
        ev.preventDefault();
        let name = document.getElementById("playername").value;
        if(name === undefined || name === ""){
            alert("Please enter a valid name");
        }
        else{
            let state1 = _.extend(this.state, {playername: name, nextComponent: ev.target.value});
            this.setState(state1);
        }
    }

    joinGame(ev){
        ev.preventDefault();
        let selectedGame = document.getElementById("games").value;
        if(name === undefined || name === ""){
            alert("Please enter a valid name");
        }
        else{
            let state1 = _.extend(this.state, {gameName: selectedGame});
            this.setState(state1);
        }
    }

    watchGame(ev){
        ev.preventDefault();
        let selectedGame = document.getElementById("games").value;
        if(name === undefined || name === ""){
            alert("Please enter a valid name");
        }
        else{
            let state1 = _.extend(this.state, {gameName: selectedGame});
            this.setState(state1);
        }
    }

    render(){
        if(this.state.nextComponent === ""){
            return(
                <Form>
                    <Row className="form-group">
                        <Label for="playername" md={4}>Player Name:
                        <input type="text" md={8} id="playername" name="playername" />
                        </Label>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Button color="success" value="Start" onClick={this.start.bind(this)}>Start Game</Button>
                        </Col>
                        <Col>
                            <Button color="success" value="Join" onClick={this.join.bind(this)}>Join Game</Button>
                        </Col>
                        <Col>
                        <Button className="btn btn-success" value="Watch" onClick={this.watch.bind(this)}>Watch Game
                        </Button>
                        </Col>
                    </Row>
                </Form>
                );
        }
        else if(this.state.nextComponent === "Start" && this.state.gameName === ""){
            return(
                <div>
                <h1>Welcome {this.state.playerName}</h1>
                <Form>
                    <Row className="form-group">
                        <Label for="gameName" md={12}>Game Name:
                        <input type="text" id="gameName" name="gameName" />
                        </Label>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Button color="primary" onClick={this.startGame.bind(this)}>Start Game</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            );
        }
        else if(this.state.nextComponent === "Join" && this.state.gameName === ""){
            let gameNames = this.state.listOfGames;
            let names = [];
            for(let i=0; i< gameNames.length; i++){
                names.push(<option key={i} value={gameNames[i]}>{gameNames[i]}</option>);
            }
            return( 
                <div>
                <h1>Welcome {this.state.playerName}</h1>
                <Form>
                    <Row className="form-group">
                        <select id="games">
                            {names}
                        </select>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Button color="primary" onClick={this.joinGame.bind(this)}>Join Game</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            );
        }
        else if(this.state.nextComponent === "Watch" && this.state.gameName === ""){
            let gameNames = this.state.listOfGames;
            let names = [];
            for(let i=0; i< gameNames.length; i++){
                names.push(<option key={i} value={gameNames[i]}>{gameNames[i]}</option>);
            }
            return( 
                <div>
                <h1>Welcome {this.state.playerName}</h1>
                <Form>
                    <Row className="form-group">
                        <select id="games">
                            {names}
                        </select>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Button color="primary" onClick={this.watchGame.bind(this)}>Watch Game</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            );
        }
        else{
            return(<Game root={this} />);
        }
    }
}
