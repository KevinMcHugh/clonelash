class CreateNextVote
  include Interactor

  def call
    game = context.game
    if game.current_game_prompt
      prompts = game.game_prompts.order(:created_at)
      current_game_prompt_index = prompts.find_index(game.current_game_prompt)
      game_prompt = prompts[current_game_prompt_index + 1]
    else
      game_prompt = game.game_prompts.order(:created_at).first
    end
    if game_prompt
      game.update_attributes(current_game_prompt: game_prompt)
      game_prompt.accept_votes!

      game.players.each do |player|
        PlayerChannel.broadcast_to(player, game_prompt.to_socket_json(player: player))
      end
    else
      AdvanceGameState.call(game: game)
    end
    GameChannel.broadcast_to(game, game.to_socket_json)
  end
end
