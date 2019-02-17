# == Schema Information
#
# Table name: games
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Game < ApplicationRecord
  has_many :players

  aasm column: :state do
    state :created, initial: true
    state :started
    state :finished

    event :start do
      transitions from: :requested, to: :started
    end

    event :finish do
      transitions from: :started, to: :finished
    end
  end
end
