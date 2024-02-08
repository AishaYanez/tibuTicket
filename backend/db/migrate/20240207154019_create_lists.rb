class CreateLists < ActiveRecord::Migration[7.1]
  def change
    create_table :lists do |t|
      t.string :list_name
      t.string :list_image
      t.integer :list_current_number
      t.integer :list_creator

      t.timestamps
    end
  end
end
