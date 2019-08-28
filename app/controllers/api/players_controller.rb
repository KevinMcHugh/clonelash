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
    if player.admin && player.game.current_game_prompt.final_question
      response = Response.new(game_prompt: player.game.current_game_prompt, player: player)
      render json: [response]
    else
      render json: player.responses.where(text: nil)
    end
  end

  def current_game_prompt
    player = Player.find(params[:player_id])
    render json: player.game.current_game_prompt.as_json(player: player)
  end
end