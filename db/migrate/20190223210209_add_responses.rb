class AddRespondents < ActiveRecord::Migration[5.2]
  def change
    create_table :responses, id: :uuid  do |t|
      t.string :text
      t.references :game_prompt, type: :uuid, foreign_key: true, null: false, index: true
      t.references :player, type: :uuid, foreign_key: true, null: false, index: true
      t.timestamps
    end
  end
end
