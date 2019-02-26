# == Schema Information
#
# Table name: games
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  state      :string
#

class Game < ApplicationRecord
  include AASM
  include SocketSendable
  has_many :players
  has_many :game_prompts
  has_many :responses, through: :game_prompts, source: :game_prompt

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

  def as_json(options={})
    {
      id: id,
      state: state,
      created_at: created_at,
      updated_at: updated_at,
      startable: startable?
    }
  end

  def startable?
    created? && players.count > 3
  end

  def all_responses_received?
    game_prompts.any? && game_prompts.flat_map(&:responses).all? { |r| r.text.present? }
  end
end
