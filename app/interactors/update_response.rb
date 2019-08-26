class UpdateResponse
  include Interactor

  def call
    response = context.response
    response.update_attributes(text: context.text)
    game = response.game_prompt.game
    if game.all_responses_received?
      game.open_voting!
      CreateNextVote.call(game: game)
    end
  end
end
