require 'rails_helper'

RSpec.describe UpdateResponse do
  describe '#call' do
    let(:game) { Game.create }
    let(:prompt) { Prompt.create }
    let(:player) { Player.create(game: game) }
    let(:game_prompt) { GamePrompt.create(game: game, prompt: prompt) }
    let!(:response_one) { Response.create(game_prompt: game_prompt, player: player) }
    let!(:response_two) { Response.create(game_prompt: game_prompt, player: player) }
    subject { described_class.call(response: response_one, text: 'foo') }

    context 'not the final response' do
      it 'updates the response' do
        subject
        expect(response_one.text).to eq('foo')
      end

      it 'does not make a broadcast' do
        expect(GameChannel).not_to receive(:broadcast_to)
        subject
      end
    end

    context 'the final response' do
      before { response_two.update_attributes(text: 'foo') }
      it 'updates the response' do
        subject
        expect(response_one.text).to eq('foo')
      end

      it 'makes a broadcast' do
        expect(GameChannel).to receive(:broadcast_to)
        subject
      end
    end
  end
end
