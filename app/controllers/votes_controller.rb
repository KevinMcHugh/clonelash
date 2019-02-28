class VotesController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def index
    votes = Vote.where(player: params[:player_id], response: nil)

    render json: votes
  end
end