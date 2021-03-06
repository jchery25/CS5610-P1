defmodule GameWeb.Router do
  use GameWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", GameWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "lobby/:name", PageController, :lobby
    get "start/:name", PageController, :start
    get "join/:name", PageController, :join
    get "/watch", PageController, :watch
    get "tablename/:tablename", PageController, :tablename


  end

  # Other scopes may use custom stacks.
  # scope "/api", GameWeb do
  #   pipe_through :api
  # end
end
