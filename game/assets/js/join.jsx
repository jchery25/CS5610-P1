import React from 'react';
import { Form, Row, Col, Label, Button } from 'reactstrap';
import _ from 'lodash';

import Game from "./game";

class Join extends React.Component{
    constructor(props){
        super(props);
        this.channel = props.channel;
        this.playerNAME = "";
        this.state = {
            players: [],
            maxPlayers: 0,
            watchers: []
        }
        this.channel.join()
            .receive("ok", this.got_view.bind(this))
            .receive("error", resp => { console.log("Unable to join", resp); });

        this.channel.on("update", this.got_view.bind(this));
    }

    join(ev){
        let name = this.playername.value;
        if(name === undefined || name === ""){
            alert("error");
        }
        else{
            this.playerNAME = name;
            this.channel.push("add_new_player", {player_name: name})
            .receive("ok", this.got_view.bind(this));
        }

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
        if((this.state.players.length === parseInt(this.state.maxPlayers,10))){
            
            return(<Game root={this} />);
        }
        else if(this.playerNAME === undefined || this.playerNAME === ""){
            return(
                <Form>
                    <Row className="form-group">
                        <Label for="playername" md={4}>Player Name: 
                            <input type="text" md={8} id="playername" name="playername" ref={(c) => this.playername = c} />
                        </Label>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Button color="success" value="Start" onClick={this.join.bind(this)}>Join Game</Button>
                        </Col>
                    </Row>
                </Form>
            );
        }
        else{
            return(
                <div className="row justify-content-center">
                    <p className="col justify-content-center">Waiting for other players to join</p>
                    <div className="col-12">
                        <div className="spinner-grow text-success" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Join;