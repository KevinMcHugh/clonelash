class UpdateResponse
  include Interactor

  def call
    response = context.response
    response.update_attributes(text: context.text)

    if response.game.all_responses_received?
      GameChannel.broadcast
    end
  end
end
