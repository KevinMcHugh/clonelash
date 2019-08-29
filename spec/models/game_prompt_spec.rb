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

require 'rails_helper'

RSpec.describe GamePrompt do
  describe '#all_votes_received?' do
    let(:game) { Game.create }
    let(:prompt) { Prompt.create }
    let(:game_prompt) { GamePrompt.create(game: game, prompt: prompt) }
    let(:players) { 4.times.map { |i| Player.create(name: i, game: game)} }

    let!(:response_1) { Response.create(game_prompt: game_prompt, player: players[0]) }
    let!(:response_2) { Response.create(game_prompt: game_prompt, player: players[1]) }
    let(:vote_1) { Vote.create(game_prompt: game_prompt, response: response_1)}

    subject { game_prompt.all_votes_received? }
    # TODO check on final question as well
    context 'no votes created' do
      it 'is false' do
        expect(subject).to be(false)
      end
    end
    context 'one vote created' do
      before { vote_1 }
      it 'is false' do
        expect(subject).to be(false)
      end
    end
    context 'enough votes created' do
      before { vote_1 }
      let!(:vote_2) { Vote.create(game_prompt: game_prompt, response: response_2)}
      it 'is true' do
        expect(subject).to be(true)
      end
    end
  end

  describe '#as_json' do

  end
end
