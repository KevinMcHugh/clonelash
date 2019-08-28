require 'rails_helper'

RSpec.describe UpdateResponse do
  describe '#call' do
    let(:game) { Game.create(state: 'started') }
    let(:prompt) { Prompt.create }
    let(:player_1) { Player.create(game: game) }
    let(:player_2) { Player.create(game: game) }
    let!(:player_3) { Player.create(game: game) }

    let(:game_prompt) { GamePrompt.create(game: game, prompt: prompt, state: :accepting_answers) }
    let!(:response_one) { Response.create(game_prompt: game_prompt, player: player_1) }
    let!(:response_two) { Response.create(game_prompt: game_prompt, player: player_2) }
    subject { described_class.call(response: response_one, text: 'foo') }

    context 'responses to the first round of questions' do
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

        it 'updates the game state' do
          subject
          expect(game.reload.state).to eq('voting_opened')
        end
      end
    end
    context 'responses to the final question' do
      let(:game) { Game.create(state: :final_question_opened)}
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

        it 'updates the game state' do
          subject
          expect(game.reload.state).to eq('final_voting_opened')
        end
      end
    end
  end
end
