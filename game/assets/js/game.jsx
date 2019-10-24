import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = { 
      cards: ["A","2","3","4"],
      score: 0,
      messageList: [],
      boardCard: "3",
    };

    //this.channel
    //.join()
    //.receive("ok", this.got_view.bind(this))
    //.receive("error", resp => { console.log("Unable to join", resp); });

    this.createCards = this.createCards.bind(this);
    //this.renderCards = this.renderCards.bind(this);
    //this.disableAll = this.disableAll.bind(this);
    //this.enableAll = this.enableAll.bind(this);
    this.click = this.click.bind(this);
    this.select = this.select.bind(this);
    //this.restart = this.restart.bind(this);
    

  }
  /*
  got_view(view) {
    console.log("new view", view);
    //this.disableAll();
    this.setState(view.game);
    if(this.state.firstCardID.length === 1 && this.state.secondCardID.length === 1){
      this.disableAll();
      setTimeout(() => {
        this.channel.push("compare")
      .receive("ok", this.got_view.bind(this));
      this.enableAll();
      }, 1000);
      
    }
    //this.enableAll();
  }
  */

  cardClick(ev){
    let value = ev.target.value;
    console.log(value);
    //let state1 = _.extend(this.state, {selectedValue: value});
    //this.setState(state1);
  }

  /*
  This function is used to create a grid of 4*4 16 buttons with values ranging from A to H.
  Each button is created as a column and added to an array.
  Then 4 rows are created and the array containing the columns is sliced by 4 each time and added to the row to get the 4*4 grid.

  */
  createCards(){
    let values = this.state.cards;
    let cards = [];
    for(let i = 0; i < values.length; i++){
      cards.push(<div className="card bg-info text-white" key={i}>
        <div className="card-header text-align">
          {"\u2660"}
        </div>
        <div className="card-body text-align">
          <button className="btn bg-transparent" id={i} onClick={this.cardClick.bind(this)} value={values[i]}>{values[i]}</button>
        </div>
        <div className="card-footer text-align">
          {"\u2660"}
        </div>
        </div>);
    }
    return cards;
  }

  click(){
    console.log("User has 2 cards to go");
  }

  select(){
    console.log(this.state.selectedValue);
  }

  /*
  This is the render function to display the different components required for this game.
  */
  render() {
    let cards = this.createCards();
    let boardCard = this.state.boardCard;
    //let score = "Your score so far: " + this.state.score;
    return(
      <div className="container">
        <HeaderComponent />
        <div className= "row">
          <div className="col-5 col-md-4">

          </div>
          <div className="col col-md-2">
            <div className="card bg-info text-white">
              <div className="card-header text-align">
                {"\u2660"}
              </div>
              <div className="card-body text-align">
                {boardCard}
              </div>
              <div className="card-body text-align">
                {"\u2660"}
              </div>
            </div>
          </div>
          <div className="col-offset-4 col-2 col-md-2">
            <div className="card bg-info text-white">
              <div className="card-body text-align">
                ONE
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <br></br>
        </div>
        <div className="row">
          <br></br>
        </div>
        <div className="row">
          <div className="card-deck">
          {cards}
          </div>
          <OneButton root={this} />
        </div>
        <div className="row">

        </div>
        <div className="row">
          <PlayButton root={this} />
        </div>
      </div>
    );
  }
}

/*
This is the presentational component for displaying the header of the game.
*/

function HeaderComponent(){
	return(
		<div className="row">
		   <div className="col">
		      <p><strong>ONE</strong></p>
		   </div>
		</div>
	);
}

function PlayButton(params){
  let root= params.root;
  let selectedValue = root.state.selectedValue;
  if(selectedValue !== ""){
    return(<div className="col col-md-2 col-offset-5"><button className="btn btn-success" onClick={root.select}>Play Card</button></div>);
  }
  else{
    return(<div className="col"></div>)
  }
}

function OneButton(params){
  let root = params.root;
  let cards = root.state.cards;
  if(cards.length == 2){
    return(<div className="col col-md-2 col-offset-5"><button className="btn btn-warning" onClick={root.click}>ONE</button></div>);
  }
  else{
    return(<div className="col"></div>);
  }
}

export default Game;

