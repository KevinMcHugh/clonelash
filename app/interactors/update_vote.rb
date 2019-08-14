class UpdateVote
  include Interactor

  def call
    vote = context.vote

    vote.update_attributes(response_id: context.response_id)

    GameChannel.broadcast_to(game, vote.response.player)
    if vote.game_prompt.all_votes_received?
      # this should probably just create the next set of votes.
      # check all game_prompt's have received all votes.
      if vote.game_prompt.game.all_votes_received?
        # TODO create final question
        game.close_voting!
        GameChannel.broadcast_to(game, game.to_socket_json)
      end
    end
  end
end
