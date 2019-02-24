class CreateGamePrompts
  include Interactor

  def call
    game = context.game
    unique_permutations = game.players.to_a.permutation(2).map(&:sort).uniq.shuffle
    pairs_by_player = {}
    pairs = []
    game.players.each { |p| pairs_by_player[p] = [] }
    unique_permutations.each do |permutation|
      if pairs_by_player[permutation.first].count < 4 && pairs_by_player[permutation.last].count < 4
        pairs_by_player[permutation.first] << permutation
        pairs_by_player[permutation.last] << permutation
        pairs << permutation
      end
    end

    prompts = Prompt.order(Arel.sql("RANDOM()")).first(pairs.count)

    pairs.each_with_index do |permutation, index|
      game_prompt = GamePrompt.create(prompt: prompts[index], game: game)
      permutation.each do |player|
        response = Response.create(player: player, game_prompt: game_prompt)
        # wait actually this is gonna kind suck it's very slow.
        PlayerChannel.broadcast_to(player, response.to_socket_json)
      end
    end
  end
end
