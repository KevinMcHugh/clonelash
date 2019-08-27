class Api::VotesController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def index
    votes = Vote.where(player_id: params[:player_id], response: nil)

    render json: votes.map { |v| v.as_json(player: Player.find(params[:player_id]))}
  end

  def create
    vote = CreateVote.call(create_params).vote
    render json: vote
  end

  private

  def create_params
    params.require(:vote).permit(:response_id, :player_id, :game_prompt_id)
  end
end