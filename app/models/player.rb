# == Schema Information
#
# Table name: players
#
#  id         :uuid             not null, primary key
#  game_id    :uuid             not null
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Player < ApplicationRecord
  include SocketSendable
  belongs_to :game
end
