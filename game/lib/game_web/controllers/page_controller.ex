defmodule GameWeb.PageController do
  use GameWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def start(conn, _params) do
    render(conn, "start.html")
  end

  def lobby(conn, _params) do
    render(conn, "lobby.html")
  end

  def join(conn, _params) do
    render(conn, "join.html")
  end

  def watch(conn, _params) do
    render(conn, "watch.html")
  end

  def tablename(conn, %{"tablename" => tablename}) do
    render(conn, "tablename.html", tablename: tablename)
  end
end
