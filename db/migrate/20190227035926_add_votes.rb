class AddVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes, id: :uuid  do |t|
      t.references :game_prompt, type: :uuid, foreign_key: true, null: false, index: true
      t.references :response, type: :uuid, foreign_key: true, null: false, index: true
      t.references :player, type: :uuid, foreign_key: true, index: true

      t.timestamps
    end
  end
end
