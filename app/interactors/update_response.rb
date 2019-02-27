class UpdateResponse
  include Interactor

  def call
    response = context.response
    response.update_attributes(text: context.text)
    game = response.game_prompt.game
    if game.all_responses_received?
      players = game.players
      game.game_prompts.each do |game_prompt|
        get_to_vote = players - game_prompt.responses.map(&:player)
        get_to_vote.each do |player|
          Vote.create(player: player, game_prompt: game_prompt, response: nil)
        end
      end
      game.open_voting
      GameChannel.broadcast_to(game, game.to_socket_json)
    end
  end
end
