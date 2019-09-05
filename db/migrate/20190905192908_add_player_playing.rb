class AddPlayerPlaying < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :playing, :boolean, default: true
  end
end
