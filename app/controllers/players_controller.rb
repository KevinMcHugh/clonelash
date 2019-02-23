class PlayersController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def create
    player = Player.create(game_id: params[:game_id], name: params[:name])
    cookies.permanent[:player_id] = player.id
    PlayerChannel.broadcast_to(player.game, player.as_json)
    GameChannel.broadcast_to(player.game, player.game.as_json)

    render json: player
  end

  def show
    player = Player.find(params[:id])

    render json: player
  end
end