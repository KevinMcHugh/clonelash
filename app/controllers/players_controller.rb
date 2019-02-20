class PlayersController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def create
    render json: Player.create(game_id: params[:game_id], name: params[:name])
  end
end