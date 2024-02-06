class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.binary :user_image
      t.boolean :is_admin
      t.json :suscriptor
      t.timestamps
    end
  end
end
