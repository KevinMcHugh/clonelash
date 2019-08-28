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
#  final_question :boolean          default(TRUE)
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

    event :accept_answers do
      transitions from: :created, to: :accepting_answers
    end

    event :accept_votes do
      transitions from: :accepting_answers, to: :accepting_votes
    end
  end

  def all_votes_received?
    votes.any? && votes.all?(&:response)
  end

  def as_json(options={})
    unselectable_response_ids = []
    options ||= {}

    if accepting_votes?
      if prompt.for_all_players
        unselectable_response_ids = responses.where(player: options[:player]).pluck(:id)
      elsif options[:player]&.admin || responses.find_by(player: options[:player]) || votes.find_by(player: options[:player])
        unselectable_response_ids = responses.pluck(:id)
      end
    elsif accepting_answers?
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
