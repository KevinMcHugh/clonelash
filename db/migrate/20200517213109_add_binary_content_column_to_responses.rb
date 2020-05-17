class AddBinaryContentColumnToResponses < ActiveRecord::Migration[5.2]
  def change
    add_column :responses, :binary_content, :binary
  end
end
