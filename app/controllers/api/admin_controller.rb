class Api::AdminController < ApplicationController
  # tempppp
  skip_before_action :verify_authenticity_token

  def add_player
    player = Player.create(game_id: params[:game_id], name: Faker::Name.name)
    # TODO add CreatePlayer interactor to dry this up
    # After adding a single player this seems to fuck up the callers sockets.
    GameChannel.broadcast_to(player.game, player.to_socket_json)
    # Only do this if the game has actually changed state.
    GameChannel.broadcast_to(player.game, player.game.to_socket_json)

    render json: player
  end

  def answer_questions
    game = Game.find(params[:game_id])
    game.responses.where(text: nil).find_each do |response|
      UpdateResponse.call(response: response, text: response.player.name)
    end

    render json: game.as_json
  end

  def complete_votes
    game = Game.find(params[:game_id])

    game_prompt = game.current_game_prompt
    until game_prompt.all_votes_received?
      CreateVote.call(game_prompt_id: game_prompt.id, response_id: game_prompt.responses.sample.id)
    end

    CreateNextVote.call(game: game)

    render json: game.as_json
  end
end
