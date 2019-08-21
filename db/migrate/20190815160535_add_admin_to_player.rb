class AddAdminToPlayer < ActiveRecord::Migration[5.2]
  def change
    add_column :players, :admin, :boolean, default: false
    add_reference :games, :started_by, references: :players, index: true, type: :uuid
  end
end
