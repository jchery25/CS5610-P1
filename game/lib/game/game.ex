defmodule One.Game do
  def new do
    deck = initial_deck()
    %{
      players: [],
      maxPlayers: 2 
    }
  end

  def client_view(game) do
    %{
      players: game.players,
      maxPlayers: game.maxPlayers
    }
  end

  def add_player(game, player_name, max_players) do

    game = Map.put(game, :maxPlayers, max_players)

    fc = game.players
        |> MapSet.new()
        |> MapSet.put(player_name)
        |> MapSet.to_list

    game = Map.put(game, :players, fc)
  end

  def add_new_player(game, player_name) do
    fc = game.players
        |> MapSet.new()
        |> MapSet.put(player_name)
        |> MapSet.to_list

    game = Map.put(game, :players, fc)
    
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
