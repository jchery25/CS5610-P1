defmodule One.GameServer do
    use GenServer
  
    def reg(name) do
      {:via, Registry, {One.GameReg, name}}
    end
  
    def start(name) do
      spec = %{
        id: __MODULE__,
        start: {__MODULE__, :start_link, [name]},
        restart: :permanent,
        type: :worker,
      }
      One.GameSup.start_child(spec)
    end
  
    def start_link(name) do
      game = One.BackupAgent.get(name) || One.Game.new()
      GenServer.start_link(__MODULE__, game, name: reg(name))
    end
  
    def add_player(name, player_name, max_players) do
      GenServer.call(reg(name), {:add_player, name, player_name, max_players})
    end

    def add_new_player(name, player_name) do
      GenServer.call(reg(name), {:add_new_player, name, player_name})
    end
  
    def peek(name) do
      GenServer.call(reg(name), {:peek, name})
    end
  
    def init(game) do
      {:ok, game}
    end
  
    def handle_call({:add_player, name, player_name, max_players}, _from, game) do
      game = One.Game.add_player(game, player_name, max_players)
      One.BackupAgent.put(name, game)
      {:reply, game, game}
    end

    def handle_call({:add_new_player, name, player_name}, _from, game) do
      game = One.Game.add_new_player(game, player_name)
      One.BackupAgent.put(name, game)
      {:reply, game, game}
    end
  
    def handle_call({:peek, _name}, _from, game) do
      {:reply, game, game}
    end
  end