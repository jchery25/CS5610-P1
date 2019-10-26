


# Introduction
The game we are building is ONE, a generic UNO card game. ONE is a two to four player game where the goal of the game is to get rid of all the cards in one’s hand. To help make this game more engaging, like UNO, there are special cards that will gain the individual players an advantage in the game. The mechanics of the game works like UNO, the player must match the card they play to the board card either by playing the same suit or symbol. The game begins when we have 2 or more players as defined by the player who starts the game. When the game starts, there is one randomly chosen card (which is not a special card) on the game board and the players must match the suit or symbol in turns. The player who has two cards left, must say “One” before playing the penultimate card onto the game board when his turn comes. This enables other users to know that the player only has 1 card. To win the game, the player must be the first person to get rid of all their cards in their hands. Each game is timed, and each player’s turn is times. If the player does not play a card before the time runs out, the player skips the turn and the game moves on. Once, the timer on the game stops, the player with the cards that sum to the least value is declared as the winner.

## Description
The game consists of fifty-six playing cards [A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, W]. The player is asked to enter their name and are given three option: To start a new game, to join a game or to watch a game. Once the player gives the name and clicks on one of the above options, the player is redirected to appropriate components. To start a new game, the player needs to enter a game name. For join and watch, the player is provided with the existing game names. The player must select a game and can join or watch respectively. The player is taken to the lobby or the waiting room where they must wait for other players to join and start the game. Once the game begins, each player receives seven cards in their hand. Those seven cards can consist of a random set of the fifty-six playing cards. A random card is selected as the first card played by the game (except J, Q, K, W). In the ONE, there are special cards that can advance the player and hinder their opponents. Those special cards are J, Q, K, W. The card “J” allows the player to add three extra (3) cards to an opponent of their choice. The card “K” allows the player to add five extra (5) cards to an opponent of their choice. The card “Q” allows the player to skip the next player in the queue. The card “W” allows the player to choose what card symbol the game board will now take, thus overwriting the current card symbol of the game. 

The game is like UNO however, there are some added and removed mechanics that will transform this game into generic UNO. Some added mechanics are:

- The UNO cards are replaced with playing cards.
- The UNO special cards and its functions have been changed with J, Q, K, and W and J adds three extra cards to an opponent’s hand, Q skips the next player in the queue, K adds five extra cards to an opponent’s hand, and W allows the player to change the current game board’s card symbol and number. The reverse from UNO has been discarded in ONE.
- There is a game timer and a player time. The game timer is 15 minutes and counts down to 0. Once the game timer is at 0, the game is over and whoever has the least amount of points wins. The points are calculated by the card’s values. The player time is 30 seconds and counts down to 0. Once the player timer is at 0, the player loses their turn and goes to the next player in the queue.

Each player plays a card from their list. The card either must match the suit (Spade, Heart, Diamond or Club) or the value (A, 2, 3 etc.) to be considered as the valid card. Once the player plays a card, that card is removed from the player’s list and added to the played cards list. If the player has no card that matches the card on board, the player can pick the first card from the deck provided and choose to play that card or skip his turn.

## UI Design

The UI is rendered using React, HTML, Bootstrap CSS.
The player lands on the index page, where they are asked to enter a game name they wish to start, join or watch.

If the player wishes to start a new game, they will have to provide the game name and click on Start. This will take them to start page where they are asked to enter the player name and the no of players to be in the game (2,3 or 4 including the player). Once, they click on start, they are taken to the lobby where they can wait for the other players to join the game. Once, the no of players required join the game, we are automatically taken to the board or table.

If the player wishes to join a game that is already existing, they will have to provide the name of the game they wish to join and click on Join. This will take them to join page where they are asked to enter the player name. Once, they click on Join, they are also taken to the lobby where they wait for the other required players to join. If the player joining the game equals the no of the players (specified in start), they are redirected to the board or the table and the game begins.

Similarly, if a user just wishes to watch an ongoing game, they need to provide the name of the game and click on Watch. This will take them to the board where they can watch the game and chat but cannot play the game itself.
Once, the players enter the board or when the game begins, they can see 3 main components:

- A list of cards that are assigned to them.
- A card that is currently on the board.
- A card called ONE, from which they can pick a card if they do     not have any matching cards in their existing list.

Once a card is selected, they get Play Card button and are expected to hit it to play their turn. The value of this card is taken and sent to the server. If the server responds OK, the card is played, else the player must choose a different card, if the time permits

The above images depict the board of each player. The first card with value is the card that is currently on the board. Card named ONE is the deck from which user can select a card.

The 3 cards belong to the user.

Play card enables user to play a card.

When any player has only 2 cards left, the button ONE is displayed which needs to be clicked before playing the penultimate card. This broadcasts to the rest of the players that player1 has only 1 card left.

## UI To Server Protocol

Phoenix channels are used to interact with the server from the front-end. All the players playing a game connect to the same channel.

On providing the game name and hitting start, the channel calls channel.join() and the game is started.  We have a game server, backup agent and supervisor in place to maintain the persistency of the games being played.

Every time, a player joins a game, the channel handle_in method is called to add the player to the players list of the game. The handle_in function calls the function defined in game server. The game server has its own.

Similarly, for every move, there are handle_in functions defined in the channels. These functions call server-side methods to update the state of the game and the response is broadcasted to the players where only a part of the entire state is sent to each player.

The handle_in function add_player is used to add a player to the list of players for a game. This is called when a player joins a game.

As the state of the game needs to be specific to each player, we intercept the update function in the channel and the state is rendered according to each player.

Any time a player joins a game, the update is called to reset the state of the game. Once, the required no of players join a game, on update the Game component is called which loads the board.

Every time, the player plays a hand, the channel.on is called and the value of the card played is sent to the server. If either the suit or the symbol of the card matches the card that is on the board, the board card is changed to the card’s value. The card is removed from the player’s list and the updated state is broadcasted to the players.


## Data Structures on Server

The data structures used on the server side are simple lists.
The deck of cards is maintained using a list of arrays. Each element in the list contains a suit and a symbol value. The suit can range from [A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, W] and the symbols range in [Hearts, Spade, Diamond, Club]. The values of each card are same as the symbol with the special cards having higher value.

The starter card is the first card that is played automatically on the start of the game. It is an array that has a suit and the symbol.

The players list is a list of lists. It contains the player name and the list of cards that they currently hold. The list of cards is like deck as it will have symbols and suit. Initially, each player will have 7 cards and the score is set to 0. The player will be able to see their cards, score and the starter card or the board card.

## Implementation of Game Rules

We have special cards as in the game UNO. The special cards are:

- J: This card adds 3 extra cards to the player.
- Q: Skips the turn of the next player.
- K: Adds 5 extra cards to the player.
- W: Wildcard which allows the user to change the symbol.

When the game starts, the server assigns 7 cards to each player in the game, marks the winner as nil and picks up one random card as the starter card and returns the view to the players. The players can each see their set of cards but not of the opponents.

Once the player gets the turn, they can select one card which either matches the symbol or the suit of the board card and click Play Card. This calls a channel function with the symbol and suit value. This in turn calls the game server and finally the game.ex function. Here we check if the card played matches the symbol or the suit. If it does, the startercard value is changed to the new card and the new state is broadcasted to each player. Otherwise, the server returns with no change in the state and the player gets to select a new card.

If the player does not have any card that matches the starter card, they can click on One button to get a random card from the deck. This calls a function in game.ex which randomly picks a card from the deck and adds it to the player list and updates the state. Now, if the new card matches the starter card, the player can play it or keep it.

Once, any player hits ONE button which is displayed only when they have 2 cards, it is first broadcasted to every player to let them know that the player has only 1 card left. The player then plays the penultimate card.

## Challenges and Solutions

Few of the challenges faced during the time of the development are as follows:

- Deciding on the data structure for the card and to optimize the creation of cards. We now have two variable lists, one with the suit and one with the symbols. The deck is built by running each suit and each of the symbols. This results in getting 56 cards with 14 cards in each suit. (E.g.: [A: Hearts, 2: Hearts, 3: Hearts, 4: Hearts, 5: Hearts, 6: Hearts, 7: Hearts, 8: Hearts, 9: Hearts, J: Hearts, Q: Hearts, K: Hearts, W: Hearts])
- Including bootstrap as a part of the whole project.
- Deciding on how to join to a channel based on the game name and player name. Our first approach was to get the player name first and then ask the user if they want to start, join or watch the game. This was causing issues on how to save the player name and delay joining to the game channel. We then changed the approach and decided to get the game name and join to the channel. Then the player enters the name and the name is pushed to the server to be added to the players list for that game.
- Broadcasting the updated state but rendering based on the players to avoid displaying the entire board game.
- Including chat with the game.
- Implementing timer rules for each player and the whole game.
- Implementing game rules and channel functions. It turned out to be pretty difficult as the flow was getting confused.


