class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.boolean :is_admin, null: false
      # t.string :user_image, null: false, default: "default_user.png"

      t.timestamps
    end
  end
end
