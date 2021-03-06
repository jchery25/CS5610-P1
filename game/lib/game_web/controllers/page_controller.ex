defmodule GameWeb.PageController do
  use GameWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def start(conn, %{"name" => name}) do
    render(conn, "start.html", name: name)
  end

  def lobby(conn, %{"name" => name}) do
    render(conn, "lobby.html", name: name)
  end

  def join(conn, %{"name" => name}) do
    render(conn, "join.html", name: name)
  end

  def watch(conn, _params) do
    render(conn, "watch.html")
  end

  def tablename(conn, %{"tablename" => tablename}) do
    render(conn, "tablename.html", tablename: tablename)
  end
end
