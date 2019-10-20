defmodule One.Game do
  def new do
    deck = initial_deck()
    %{
      deck: deck
    }
  end

  def client_view(game) do
    %{
      deck: game.deck
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
          %{suit: "#{suit}", symbol: "#{symbol}", value: "#{value}"}
    end


    IO.inspect(deck, label: "Testing")
      # deck = [
    #   %{suit: "A", symbol: "\u2660", value: 1}
    #   %{suit: "A", symbol: "\u2665", value: 2}
    #   %{suit: "A", symbol: "\u2666", value: 3}
    #   %{suit: "A", symbol: "\u2663", value: 4}
    #   %{suit: "2", symbol: "\u2660", value: 5},
    #   %{suit: "2", symbol: "\u2665", value: 6},
    #   %{suit: "2", symbol: "\u2666", value: 7},
    #   %{suit: "2", symbol: "\u2663", value: 8},
    #   %{suit: "3", symbol: "\u2660", value: 9},
    #   %{suit: "3", symbol: "\u2665", value: 10},
    #   %{suit: "3", symbol: "\u2666", value: 11},
    #   %{suit: "3", symbol: "\u2663", value: 12},
    #   %{suit: "4", symbol: "\u2660", value: 13},
    #   %{suit: "4", symbol: "\u2665", value: 14},
    #   %{suit: "4", symbol: "\u2666", value: 15},
    #   %{suit: "4", symbol: "\u2663", value: 16},
    # ]
    # deck = Enum.shuffle(deck)
  end

end
