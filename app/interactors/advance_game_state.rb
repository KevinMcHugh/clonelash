class AdvanceGameState
  include Interactor

  def call
    game = context.game

    if game.voting_opened?
      final_prompt = GamePrompt.create(prompt: Prompt.find_by(for_all_players: true), game: game, final_question: true)
      game.players.responding.each do |player|
        response = Response.create(player: player, game_prompt: final_prompt)

        # wait actually this is gonna kind suck it's very slow.
        PlayerChannel.broadcast_to(player, response.to_socket_json)
      end
      game.open_final_question!
    elsif game.final_voting_opened?
      game.finish!
    end

    GameChannel.broadcast_to(game, game.to_socket_json)
  end
end
