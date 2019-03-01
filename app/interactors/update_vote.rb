class UpdateVote
  include Interactor

  def call
    vote = context.vote

    vote.update_attributes(response_id: context.response_id)

    if vote.game_prompt.all_votes_received?
      # this should probably just create the next set of votes.
      # check all game_prompt's have received all votes.
      vote.game_prompt.game.open_final_question!
      # TODO create final question, send question/state to channels.
    end
  end
end