# == Schema Information
#
# Table name: game_prompts
#
#  id         :uuid             not null, primary key
#  game_id    :uuid             not null
#  prompt_id  :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GamePrompt < ApplicationRecord
  include SocketSendable
  belongs_to :game
  belongs_to :prompt
  has_many :responses
end
