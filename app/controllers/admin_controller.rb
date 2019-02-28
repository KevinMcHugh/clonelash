class AdminController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def add_player
    player = Player.create(game_id: params[:game_id], name: Faker::Name.name)
    GameChannel.broadcast_to(player.game, player.to_socket_json)

    render json: player
  end

  def answer_questions
    game = Game.find(params[:game_id])
    game.responses.where(text: nil).find_each do |response|
      UpdateResponse.call(response: response, text: Faker::FunnyName.two_word_name)
    end

    render json: game.as_json
  end

  def complete_votes
    game = Game.find(params[:game_id])
    # TODO make this bit work with a nice join-based query
    game.game_prompts.find_each do |game_prompt|
      game_prompt.votes.where(response: nil).each do |vote|
        UpdateVote.call(vote: vote, response_id: vote.game_prompt.responses.first.id)
      end
    end

    render json: game.as_json
  end


end