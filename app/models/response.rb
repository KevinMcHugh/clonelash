# == Schema Information
#
# Table name: respondents
#
#  id             :uuid             not null, primary key
#  response       :string
#  game_prompt_id :uuid             not null
#  player_id      :uuid             not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Response < ApplicationRecord
  belongs_to :game_prompt
  belongs_to :player
end
