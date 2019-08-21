# == Schema Information
#
# Table name: players
#
#  id         :uuid             not null, primary key
#  game_id    :uuid             not null
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  admin      :boolean          default(FALSE)
#

# TODO: add admin?
class Player < ApplicationRecord
  include SocketSendable
  belongs_to :game
  has_many :responses

  def score
    Vote.where(response: responses).count
  end

  def as_json(options={})
    super.merge('score' => score)
  end
end
