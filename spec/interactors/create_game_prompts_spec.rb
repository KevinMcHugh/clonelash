require 'rails_helper'

RSpec.describe CreateGamePrompts do
  describe '#call' do
    let(:game) { Game.create }
    let(:names) { ['Alan','Beth','Chaz','Deonte','Elmer']}
    let!(:players) { 5.times.map { |i| Player.create(game: game, name: names[i]) } }
    let!(:prompts) { 10.times { |i| Prompt.create(text: i, format: :misc) }}
    subject { described_class.call(game: game) }

    it 'creates 4 prompts per player' do
      expect{subject}.to change{GamePrompt.count}.by(4 + 3 + 2 + 1)
    end

    it 'creates 4 Responses per player' do
      subject
      players.each do |player|
        expect(Response.where(player: player).count).to eq(4)
      end
    end
  end
end
