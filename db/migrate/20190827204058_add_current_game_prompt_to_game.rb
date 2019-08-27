class AddCurrentGamePromptToGame < ActiveRecord::Migration[5.2]
  def change
     add_reference :games, :current_game_prompt, references: :game_prompts, index: true, type: :uuid
  end
end
