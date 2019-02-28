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
    {
      id: id,
      response_id: response&.id,
      game_prompt: {
        text: game_prompt.prompt.text
      },
      responses: game_prompt.responses.map do |response|
        {
          id: response.id,
          text: response.text
        }
      end
    }
  end
end
