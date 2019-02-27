class AdminController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def add_player
    player = Player.create(game_id: params[:game_id], name: Faker::Name.name)
    GameChannel.broadcast_to(player.game, player.to_socket_json)

    render json: player
  end
end