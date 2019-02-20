class GamesController < ApplicationController

  def index 
    render json: Game.all
  end

  def show
    render json: Game.find(params[:id])
  end

  def players
    render json: Game.find(params[:game_id]).players
  end
end