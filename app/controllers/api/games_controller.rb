class Api::GamesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Game.all.map(&:as_json)
  end

  def show
    render json: Game.find(params[:id]).as_json
  end

  def players
    render json: Game.find(params[:game_id]).players
  end

  def create
    game = Game.create
    player = Player.create(game: game, name: create_params[:player_name], admin: true)
    game.update_attributes(started_by: player)
    # No one could be subscribed to this, right?
    # GameChannel.broadcast_to(game, game.to_socket_json)
    render json: game.as_json
  end

  def update
    game = Game.find(params[:id])
    game.update_attributes(update_params)
    if update_params[:state] == "started"
      create_prompts(game)
    end
    GameChannel.broadcast_to(game, game.to_socket_json)
    render json: game.as_json
  end

  private
  def update_params
    params.require(:game).permit(:state)
  end

  def create_params
    params.require(:game).permit(:player_name)
  end

  def create_prompts(game)
    CreateGamePrompts.call(game: game)
  end
end
