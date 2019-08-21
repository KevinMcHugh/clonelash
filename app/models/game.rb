# == Schema Information
#
# Table name: games
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  state         :string
#  started_by_id :uuid
#

class Game < ApplicationRecord
  include AASM
  include SocketSendable

  belongs_to :started_by, class_name: Player.name, optional: true
  has_many :players
  has_many :game_prompts
  has_many :responses, through: :game_prompts

  scope :joinable, -> { where.not(state: ['created','canceled','finished']) }

  aasm column: :state do
    state :created, initial: true
    state :started
    state :voting_opened
    state :final_question_opened
    state :final_voting_opened
    state :finished
    state :canceled

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

    event :cancel do
      transitions to: :canceled
    end
  end

  def as_json(options={})
    {
      id: id,
      state: state,
      created_at: created_at,
      updated_at: updated_at,
      startable: startable?,
      started_by_id: started_by_id
    }
  end

  def startable?
    created? && players.count > 3
  end

  def all_responses_received?
    responses.any? && responses.count == responses.where.not(text: nil).count
  end

  def all_votes_received?
    game_prompts.any? && game_prompts.all?(&:all_votes_received?)
  end
end
