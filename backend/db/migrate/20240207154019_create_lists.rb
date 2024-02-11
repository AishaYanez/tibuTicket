class CreateLists < ActiveRecord::Migration[7.1]
  def change
    create_table :lists do |t|
      t.string :list_name, null: false
      t.integer :list_current_number, default: 0
      t.references :list_creator, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
