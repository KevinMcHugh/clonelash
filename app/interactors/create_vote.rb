class CreateVote
  include Interactor

  def call
    vote = Vote.create(player_id: context.player_id,
                       response_id: context.response_id,
                       game_prompt_id: context.game_prompt_id)

    game = vote.game_prompt.game
    GameChannel.broadcast_to(game, vote.response.player)
    # This doesn't work since now not everyone is voting.....
    if vote.game_prompt.all_votes_received?
      # this should probably just create the next set of votes.
      # check all game_prompt's have received all votes.
      CreateNextVote.call(game: game)
      AdvanceGameState.call(game: game)
    end
  end
end
