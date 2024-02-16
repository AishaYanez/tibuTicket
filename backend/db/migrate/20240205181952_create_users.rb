class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :nickname, null: false
      t.boolean :is_admin, null: false
      t.json :suscriptor

      t.timestamps
    end
  end
end
