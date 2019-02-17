class AddPlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players, id: :uuid  do |t|
      t.references :game, type: :uuid, foreign_key: true, null: false, index: true
      t.string :name

      t.timestamps
    end
  end
end
