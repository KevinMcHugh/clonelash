class AddGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games, id: :uuid  do |t|
      t.timestamps
    end
  end
end
