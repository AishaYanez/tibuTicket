class List < ApplicationRecord
  has_one_attached :list_image

  belongs_to :list_creator, class_name: "User", foreign_key: "list_creator_id"
end
