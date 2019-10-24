defmodule One.Game do
  def new(starter_player,numOfPlayers) when is_integer(numOfPlayers) do
    deck = initial_deck()

    %{
      deck: deck,
      players: [starter_player],
      numOfPlayers: numOfPlayers,
      starter_card: choose_starter_card(deck),
      winner: nil
    }
  end

  def client_view(game) do
    %{
      deck: game.deck,
      players: game.players,
      numOfPlayers: game.numOfPlayers,
      starter_card: game.starter_card,
      winner: game.winner
    }
  end

  def add_player(game, player) do
    player = game.players
        |> MapSet.new()
        |> MapSet.put(player)
        |> MapSet.to_list

      game = Map.put(game, :players, player)

    if(length(game.players) === game.numOfPlayers) do
      start_game(game)
    else
      game
    end
  end

  # No longer need this.
  # def add_new_player(game, player_name) do
  #   fc = game.players
  #       |> MapSet.new()
  #       |> MapSet.put(player_name)
  #       |> MapSet.to_list

  #   game = Map.put(game, :players, fc)
  #   game
  # end

  def start_game(game) do
    players = for player <- game.players do
      %{player: "#{player}", cards: Enum.take_random(game.deck, 7)}
    end

    game = Map.put(game, :players, players)
    game
  end

  def initial_deck do
    suit = [
      "A", 2, 3, 4, 5, 6, 7, 8, 9 ,10, "J", "Q", "K", "W"
    ]

    symbol = [
      "\u2660",  "\u2665", "\u2666", "\u2663"
    ]

    deck = for suit <- suit,
        symbol <- symbol do
          %{suit: "#{suit}", symbol: "#{symbol}"}
    end
    deck = Enum.shuffle(deck)
    deck
  end

  def choose_starter_card(deck) do
    card = Enum.take_random(deck, 1)
    suitCard = get_in(card, [Access.at(0), :suit])

    if (suitCard == "J" || suitCard == "Q" || suitCard == "K" || suitCard == "W") do
      choose_starter_card(game.deck)
    end

    card
  end
end
