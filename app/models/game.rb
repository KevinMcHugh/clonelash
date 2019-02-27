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
  has_many :responses, through: :game_prompts

  aasm column: :state do
    state :created, initial: true
    state :started
    state :voting_opened
    state :final_question_opened
    state :final_voting_opened
    state :finished

    event :start do
      transitions from: :requested, to: :started
    end

    event :open_voting do
      transitions from: :started, to: :voting_opened
    end

    event :open_final_question do
      transitions from: :voting_opened, to: :final_question_opened
    end

    event :open_final_voting do
      transitions from: :final_question_opened, to: :final_voting_opened
    end

    event :finish do
      transitions from: :final_voting_opened, to: :finished
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
