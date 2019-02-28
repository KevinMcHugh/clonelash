class VotesController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def index
    votes = Vote.where(player: params[:player_id], response: nil)

    render json: votes
  end

  def update
    vote = Vote.find(params[:id])
    UpdateVote.call(vote: vote, response_id: update_params[:response_id])
    render json: vote
  end

  private

  def update_params
    params.require(:vote).permit(:response_id)
  end
end