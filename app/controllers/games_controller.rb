class GamesController < ApplicationController
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

  def update
    render json: Game.find(params[:id]).update_attributes(update_params).as_json
  end

  private
  def update_params
    params.require(:game).permit(:state)
  end
end