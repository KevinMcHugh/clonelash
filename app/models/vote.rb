# == Schema Information
#
# Table name: votes
#
#  id             :uuid             not null, primary key
#  game_prompt_id :uuid             not null
#  response_id    :uuid             not null
#  player_id      :uuid
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Vote < ApplicationRecord
  include SocketSendable
  belongs_to :game_prompt
  belongs_to :response
  belongs_to :player
end
