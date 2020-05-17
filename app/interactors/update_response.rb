class UpdateResponse
  include Interactor

  def call
    response = context.response
    if response.game_prompt.prompt.format == 'art'
      response.update_attributes(text: context.text, binary_content: context.binary_content)
    else
      response.update_attributes(text: context.text.first(30))
    end
    game = response.game_prompt.game
    if game.all_responses_received?
      game.open_voting!
      CreateNextVote.call(game: game)
    end
  end
end
