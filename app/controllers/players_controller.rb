class PlayersController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def create
    player = Player.create(game_id: params[:game_id], name: params[:name])
    cookies.permanent[:player_id] = player.id
    GameChannel.broadcast_to(player.game, player.to_socket_json)

    render json: player
  end

  def show
    player = Player.find(params[:id])

    render json: player
  end
end