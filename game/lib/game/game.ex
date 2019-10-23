defmodule One.Game do
  def new do
    deck = initial_deck()
    %{
      deck: deck,
      players: [],
      maxPlayers: 2 
    }
  end

  def client_view(game) do
    %{
      deck: game.deck,
      players: game.players,
      maxPlayers: game.maxPlayers
    }
  end

  def initial_deck do
    suit = [
      "A", 2, 3, 4, 5, 6, 7, 8, 9 ,10, "J", "Q", "K", "W"
    ]

    symbol = [
      "\u2660",  "\u2665", "\u2666", "\u2663"
    ]

    value = [
      1,2,3,4,5,6,7,8,9,10
    ]

    deck = for suit <- suit,
        symbol <- symbol do
          %{suit: "#{suit}", symbol: "#{symbol}"}
    end
    deck = Enum.shuffle(deck)
  end

end
