class UpdateVote
  include Interactor

  def call
    vote = context.vote

    vote.update_attributes(response_id: context.response_id)

    game = vote.game_prompt.game
    GameChannel.broadcast_to(game, vote.response.player)
    if vote.game_prompt.all_votes_received?
      # this should probably just create the next set of votes.
      # check all game_prompt's have received all votes.
      if game.all_votes_received?
        # TODO should mark this final prompt somehow
        final_prompt = GamePrompt.create(prompt: Prompt.find_by(for_all_players: true), game: game)
        game.players.each do |player|
          response = Response.create(player: player, game_prompt: final_prompt)
          # wait actually this is gonna kind suck it's very slow.
          PlayerChannel.broadcast_to(player, response.to_socket_json)
        end
        game.open_final_question!

        GameChannel.broadcast_to(game, game.to_socket_json)
      end
    end
  end
end
