class List < ApplicationRecord
  has_one_attached :list_image

  belongs_to :list_creator, class_name: "User", foreign_key: "list_creator_id"

  after_create_commit { broadcast_changes }
  after_update_commit { broadcast_changes }
  after_destroy_commit { broadcast_changes }

  def broadcast_changes
    ActionCable.server.broadcast("ListChannel", { message: "List updated", type: "broadcast" })
  end

  validates :list_name, presence: true
  validates :list_current_number, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :list_limit_number, presence: true, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :list_creator_id, presence: true
end
