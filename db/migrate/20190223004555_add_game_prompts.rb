class AddGamePrompts < ActiveRecord::Migration[5.2]
  def change
    create_table :game_prompts, id: :uuid  do |t|
      t.references :game, type: :uuid, foreign_key: true, null: false, index: true
      t.references :prompt, type: :uuid, foreign_key: true, null: false, index: true
      t.timestamps
    end
  end
end
