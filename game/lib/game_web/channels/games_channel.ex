defmodule GameWeb.GamesChannel do
  use GameWeb, :channel

  alias One.Game
  alias One.BackupAgent
  alias One.GameServer

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      GameServer.start(name)
      game = GameServer.peek(name)
      BackupAgent.put(name, game)
      socket = socket
            |> assign(:game, game)
            |> assign(:name, name)
            {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}

    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("add_player", %{"player_name" => player_name, "max_players" => max_players}, socket) do
    name = socket.assigns[:name]
    game = GameServer.add_player(name, player_name, max_players)
    socket = assign(socket, :game, game)
    BackupAgent.put(name, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  def handle_in("add_new_player", %{"player_name" => player_name}, socket) do
    name = socket.assigns[:name]
    game = GameServer.add_new_player(name, player_name)
    BackupAgent.put(name, game)
    broadcast!(socket, "update", %{ "game" => Game.client_view(game) })
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
