class AdvanceGameState
  include Interactor

  def call
    game = context.game

    if game.voting_opened?
      used_game_prompt_ids = game.game_prompts.pluck(:id)

      final_prompt = GamePrompt.create(prompt: Prompt.where.not(id: used_game_prompt_ids).sample,
                                       game: game,
                                       final_question: true,
                                       state: :accepting_answers)

      game.players.responding.each do |player|
        response = Response.create(player: player, game_prompt: final_prompt)

        # wait actually this is gonna kind suck it's very slow.
        PlayerChannel.broadcast_to(player, response.to_socket_json)
      end
      PlayerChannel.broadcast_to(game.players.find_by(admin: true), Response.new(game_prompt: final_prompt))
      game.open_final_question!
    elsif game.final_voting_opened?
      game.finish!
    end

    # TODO do something with the game finishing in the clients....allow starting a new game...
    GameChannel.broadcast_to(game, game.to_socket_json)
  end
end
