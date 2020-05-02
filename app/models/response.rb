# == Schema Information
#
# Table name: responses
#
#  id             :uuid             not null, primary key
#  text           :string
#  game_prompt_id :uuid             not null
#  player_id      :uuid             not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Response < ApplicationRecord
  include SocketSendable

  belongs_to :game_prompt
  belongs_to :player
  has_many :votes

  def as_json(options={})
    {
      id: id,
      text: text,
      game_prompt: {
        text: game_prompt.prompt.text,
        format: game_prompt.prompt.format
      },
      player: {
        id: player&.id,
        name: player&.name
      }
    }
  end
end
