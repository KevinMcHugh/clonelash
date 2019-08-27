# == Schema Information
#
# Table name: game_prompts
#
#  id         :uuid             not null, primary key
#  game_id    :uuid             not null
#  prompt_id  :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GamePrompt < ApplicationRecord
  include SocketSendable
  belongs_to :game
  belongs_to :prompt
  has_many :responses
  has_many :votes

  def all_votes_received?
    votes.any? && votes.all?(&:response)
  end

  def as_json(options={})
    unselectable_response_ids = []
    options ||= {}

    if prompt.for_all_players
      unselectable_response_ids = responses.where(player: options[:player]).pluck(:id)
    elsif options[:player]&.admin || responses.find_by(player: options[:player])
      # TODO disallow voting for someone who already voted
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
