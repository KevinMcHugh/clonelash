# == Schema Information
#
# Table name: games
#
#  id         :uuid             not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  state      :string
#

require 'rails_helper'

RSpec.describe Game do 

  describe '#all_responses_received?' do
    subject { game.all_responses_received? }
    let(:game) { Game.create }
    let(:prompts) { 5.times.map { |i| Prompt.create(text: i)} }
    let(:game_prompts) { 5.times.map { |i| GamePrompt.create(prompt: prompts[i], game: game)} }
    let(:players) { 5.times.map { |i| Player.create(name: i, game: game)} }
    let!(:responses) { 5.times.map { |i| Response.create(game_prompt: game_prompts[i], player: players[i]) } }

    it 'requires all responses to have text' do
      expect(subject).to be(false)
    end
  end
end
