# == Schema Information
#
# Table name: votes
#
#  id             :uuid             not null, primary key
#  game_prompt_id :uuid             not null
#  response_id    :uuid
#  player_id      :uuid
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Vote < ApplicationRecord
  include SocketSendable
  belongs_to :game_prompt
  belongs_to :response, optional: true
  belongs_to :player, optional: true

  def as_json(options={})
    unselectable_response_ids = []

    if game_prompt.prompt.for_all_players
      unselectable_response_ids = game_prompt.responses.where(player: options[:player]).pluck(:id)
    elsif options[:player].admin || response || game_prompt.responses.find_by(player: options[:player])
      unselectable_response_ids = game_prompt.responses.pluck(:id)
    end

    {
      id: id,
      response_id: response&.id,
      game_prompt: {
        text: game_prompt.prompt.text
      },
      responses: game_prompt.responses.map do |response|
        {
          id: response.id,
          text: response.text,
          selectable: unselectable_response_ids.include?(response.id)
        }
      end
    }
  end
end
