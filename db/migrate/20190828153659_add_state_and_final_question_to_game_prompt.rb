class AddStateAndFinalQuestionToGamePrompt < ActiveRecord::Migration[5.2]
  def change
    add_column :game_prompts, :state, :string
    add_column :game_prompts, :final_question, :boolean, null: false, default: false
  end
end
