class CreateNextVote
  include Interactor

  def call
    game = context.game
    game_prompt = game.game_prompts.order(:created_at).reject(&:all_votes_received?).first

    # TODO: show all players the question and options. Don't allow admin or submitters to vote.
    # For the final question, send non-submitted responses.
    game.players.each do |player|
      vote = Vote.find_or_create_by(player: player, game_prompt: game_prompt, response: nil)
      PlayerChannel.broadcast_to(player, vote.to_socket_json(player: player))
    end
    GameChannel.broadcast_to(game, game.to_socket_json)
  end
end
