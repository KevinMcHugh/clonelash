require 'rails_helper'

RSpec.describe UpdateVote do
  describe '#call' do
    let(:game) { Game.create(state: :voting_opened) }
    let(:game_prompt) { GamePrompt.create(game: game, prompt: Prompt.create) }
    let(:vote) { Vote.create(game_prompt: game_prompt, player: Player.create(game: game)) }
    let(:response) { Response.create(game_prompt: game_prompt, player: Player.create(game: game)) }
    let!(:all_prompt) { Prompt.create(for_all_players: true) }

    subject { described_class.call(vote: vote, response_id: response.id) }

    it 'sets the response on the vote' do
      subject
      expect(vote.response).to eq(response)
    end

    context 'when it is the last vote needed for the game' do
      it 'advances the game state' do
        subject
        expect(game.reload.state).to eq('final_question_opened')
      end

      it 'creates a new GamePrompt' do
        game_prompt
        expect{subject}.to change{GamePrompt.where(game: game).count}.by(1)
      end
    end
  end
end
