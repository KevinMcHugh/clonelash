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

require 'rails_helper' 

RSpec.describe GamePrompt do 
  describe '#all_votes_received?' do
    let(:game) { Game.create }
    let(:prompt) { Prompt.create }
    let(:game_prompt) { GamePrompt.create(game: game, prompt: prompt) }
    subject { game_prompt.all_votes_received? }

    context 'no votes created' do
      it 'is false' do
        expect(subject).to be(false)
      end
    end
    context 'votes created' do
      let(:response_1) { nil }
      let(:response_2) { nil }
      let(:players) { 2.times.map { |i| Player.create(name: i, game: game)} }
      let!(:vote_1) { Vote.create(game_prompt: game_prompt, response: response_1)}
      let!(:vote_2) { Vote.create(game_prompt: game_prompt, response: response_2)}

      it 'is false' do
        expect(subject).to be(false)
      end

      context 'only one filled out' do
        let(:response_1) { Response.create(game_prompt: game_prompt, player: players[0]) }
        it 'is false' do
          expect(subject).to be(false)
        end
      end

      context 'all are filled out' do
        let(:response_1) { Response.create(game_prompt: game_prompt, player: players[0]) }
        let(:response_2) { Response.create(game_prompt: game_prompt, player: players[1]) }

        it 'is true' do
          expect(subject).to be(true)
        end
      end
    end
  end
end
