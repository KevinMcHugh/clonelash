class Api::PlayersController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def create
    player = Player.create(game_id: params[:game_id], name: params[:name])
    GameChannel.broadcast_to(player.game, player.to_socket_json)
    GameChannel.broadcast_to(player.game, player.game.to_socket_json)

    render json: player
  end

  def show
    player = Player.find(params[:id])

    render json: player
  end

  def prompts
    player = Player.find(params[:player_id])

    render json: player.responses.where(text: nil)
  end
end