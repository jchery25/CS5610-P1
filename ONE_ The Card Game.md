


# ONE: The Card Game
>Created By Prateeksha Lingashettar & Jonathan Chery

## What game are you going to build?
The game we are building is ONE, a generic UNO card game. ONE is a two to four player game where the goal of the game is to get rid of all the cards in one’s hand. To help make this game more engaging, similar to UNO, there are special cards that will gain the individual players an advantage in the game. The mechanics of the game works similar to UNO, the player must match the card they play to the board card either by playing the same number or symbol. The game begins with one randomly chosen card (which is not a special card) on the game board and the players have to match the number or symbol. The player who has two cards left, must say “One” before playing the penultimate card onto the game board. To win the game, the player must be the first person to get rid of all their cards in their hands. 

 The game consist of fifty-six playing cards [A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, W]. Each player receives seven cards in their hand. Those seven cards can consist of a random set of the fifty-six playing cards. In the ONE, there are special cards that can advance the player and hinder their opponents. Those special cards are J, Q, K, W. The card “J” allows the player to add three extra (3) cards to an opponent of their choice. The card “K” allows the player to add five extra (5) cards to an opponent of their choice. The card “Q” allows the player to skip the next player in the queue. The card “W” allows the player to choose what card symbol the game board will now take, thus overwriting the current card symbol of the game. 

## Is the game well specified (e.g. Reversi) or will it require some game work (e.g. a monster battle game)?

The game is well-specified. The game is similar to UNO however, there are some added and removed mechanics that will transform this game into generic UNO. Some added mechanics are:

- The UNO cards are replaced with playing cards.
- The UNO special cards and its functions have been changed with J, Q, K, and W and J adds three extra cards to an opponent’s hand, Q skips the next player in the queue, K adds five extra cards to an opponent’s hand, and W allows the player to change the current game board’s card symbol and number. The reverse from UNO has been discarded in ONE.
- There is a game timer and a player time. The game timer is 15 minutes and counts down to 0. Once the game timer is at 0, the game is over and whoever has the least amount of points wins. The points are calculated by the card’s values. The player time is 30 seconds and counts down to 0. Once the player timer is at 0, the player loses their turn and goes to the next player in the queue. 


## Is there any game functionality that you’d like to include but may need to cut if you run out of time?

Some game functionality we would like to include but may need to cut if we run out of time would be a scoreboard. This scoreboard will hold the top five players of the day. The board would be calculated by the number of wins that player received in a round. At the end of the day, the scoreboard will reset. Another functionality we would like included but may need to cut would be the possibility of having a team game. At most two players can be on the same team.

## What challenges do you expect to encounter?

Some of the challenges that we are expecting to encounter are:

-   Creating the game board.
    
-   Creating a chat room among the players.
    
-   Creating a chat room for everyone watching the game.
    
-   Having our ReactJS communicate with the server and vice versa.
    
-   Project planning and organization.
    
-   Special card functionalities.
    
-   Creating a scoreboard.
    
-   Creating players that have seven cards in their hand.
    
-   Keeping the state of cards each player have in their hands.
    
-   Having the special cards take effect on a specific player.
    
-   Card design and implementing those designs to work with ReactJS.
    
-   Having each player agree to end game or restart game.

- Forcing the player to choose a card if they don’t have a matching symbol or number card in their current set.
