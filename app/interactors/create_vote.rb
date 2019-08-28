class CreateVote
  include Interactor

  def call
    vote = Vote.create(player_id: context.player_id,
                       response_id: context.response_id,
                       game_prompt_id: context.game_prompt_id)

    game = vote.game_prompt.game
    GameChannel.broadcast_to(game, vote.response.player)

    # This doesn't work since now not everyone is voting.....
    # It'll just advance when the first person votes...
    if vote.game_prompt.all_votes_received?
      # this should probably just create the next set of votes.

      CreateNextVote.call(game: game)
    end
  end
end
