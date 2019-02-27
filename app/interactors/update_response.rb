class UpdateResponse
  include Interactor

  def call
    response = context.response
    response.update_attributes(text: context.text)

    if response.game_prompt.game.all_responses_received?
      GameChannel.broadcast(game, game.to_socket_json)
    end
  end
end
