class AddPrompts < ActiveRecord::Migration[5.2]
  def change
    create_table :prompts, id: :uuid  do |t|
      t.string :text
      t.integer :format
      t.boolean :for_all_players, default: false
      t.timestamps
    end
  end
end
