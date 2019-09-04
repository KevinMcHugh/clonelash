# == Schema Information
#
# Table name: game_prompts
#
#  id             :uuid             not null, primary key
#  game_id        :uuid             not null
#  prompt_id      :uuid             not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  state          :string
#  final_question :boolean          default(FALSE), not null
#

class GamePrompt < ApplicationRecord
  include AASM
  include SocketSendable
  belongs_to :game
  belongs_to :prompt
  has_many :responses
  has_many :votes


  aasm column: :state do
    state :created, initial: true
    state :accepting_answers
    state :accepting_votes
    state :finished

    event :accept_answers do
      transitions from: :created, to: :accepting_answers
    end

    event :accept_votes do
      transitions from: :accepting_answers, to: :accepting_votes
    end

    event :finish do
      transitions from: :accepting_votes, to: :finished
    end
  end

  def all_votes_received?
    if final_question
      votes_needed = game.players.responding.count
    else
      votes_needed = game.players.responding.count - responses.count
    end

    votes.count >= votes_needed
  end

  def as_json(options={})
    unselectable_response_ids = []
    options ||= {}

    if final_question?
      unselectable_response_ids = responses.where(player: options[:player]).pluck(:id)
    end

    if !options[:player] ||
        options[:player]&.admin ||
        !accepting_votes? ||
        votes.find_by(player: options[:player]) ||
        (!final_question? && responses.find_by(player: options[:player]))
      unselectable_response_ids = responses.pluck(:id)
    end

    {
      id: id,
      text: prompt.text,
      responses: responses.map do |response|
        {
          id: response.id,
          text: response.text,
          selectable: !unselectable_response_ids.include?(response.id)
        }
      end
    }
  end
end
