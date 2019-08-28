class CreateVote
  include Interactor

  def call
    game_prompt = GamePrompt.find(context.game_prompt_id)
    if game_prompt.accepting_votes?

      vote = Vote.create(player_id: context.player_id,
                         response_id: context.response_id,
                         game_prompt: game_prompt)

      GameChannel.broadcast_to(game_prompt.game, vote.response.player)
    end

    if game_prompt.all_votes_received?
      # this should probably just create the next set of votes.
      game_prompt.finish!

      CreateNextVote.call(game: game_prompt.game)
    end
  end
end
