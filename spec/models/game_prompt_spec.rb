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
  let(:game) { Game.create }
  let(:prompt) { Prompt.create }
  let(:game_prompt) { described_class.create(game: game, prompt: prompt) }
  let(:players) { 4.times.map { |i| Player.create(name: i, game: game)} }

  let!(:response_1) { Response.create(game_prompt: game_prompt, player: players[0]) }
  let!(:response_2) { Response.create(game_prompt: game_prompt, player: players[1]) }

  describe '#all_votes_received?' do
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
    subject { game_prompt.as_json(player: player) }

    context 'player is provided' do
      let(:player) { Player.create(game: game, admin: admin) }

      context 'player is an admin' do
        let(:admin) { true }
        it 'says no responses are selectable' do
          expect(subject[:responses].map { |r| r[:selectable] }).to eq([false,false])
        end
      end

      context 'player is not an admin' do
        let(:admin) { false }

        context 'player has not voted' do
          context 'final question' do
            let!(:player_response) { Response.create(player: player, game_prompt: game_prompt)}
            let(:game_prompt) { described_class.create(game: game, prompt: prompt, final_question: true) }
            it 'allows responses by everyone other than the player' do
              expect(subject[:responses].reject { |r| r[:id] == player_response.id }.map{|r| r[:selectable]}).to eq([true,true])
              expect(subject[:responses].find { |r| r[:id] == player_response.id }[:selectable]).to eq(false)
            end
          end
          context 'not final question' do
            context 'player has responded' do
              let!(:player_response) { Response.create(player: player, game_prompt: game_prompt)}

              it 'says no responses are selectable' do
                expect(subject[:responses].map { |r| r[:selectable] }).to eq([false,false,false])
              end
            end
            context 'player has not responded' do
              it 'says all responses are selectable' do
                expect(subject[:responses].map { |r| r[:selectable] }).to eq([false,false])
              end
            end
          end
        end

        context 'player has voted' do
          # TODO this is the stuff that's actually broken I think
          let!(:player_vote) { Vote.create(game_prompt: game_prompt, player: player, response: response_1) }
          context 'final question' do
            let!(:player_response) { Response.create(player: player, game_prompt: game_prompt)}
            let(:game_prompt) { described_class.create(game: game, prompt: prompt, final_question: true) }
            it 'says no responses are selectable' do
              expect(subject[:responses].map{|r| r[:selectable]}).to eq([false,false,false])
            end
          end
          context 'not final question' do
            context 'player has not responded' do
              it 'says all responses are selectable' do
                expect(subject[:responses].map { |r| r[:selectable] }).to eq([false,false])
              end
            end
          end
        end
      end
    end

    context 'player is not provided' do
      # TODO: this essentially represents the audience member state. This
      # will have to change to support that behavior - once that behavior exists.
      let(:player) { nil }
      it 'says no responses are selectable' do
        expect(subject[:responses].map { |r| r[:selectable] }).to eq([false,false])
      end
    end
  end
end
