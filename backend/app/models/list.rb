class List < ApplicationRecord
  has_one_attached :list_image
  after_create_commit { broadcast_changes }
  after_update_commit { broadcast_changes }
  after_destroy_commit { broadcast_changes }

  def broadcast_changes
    ActionCable.server.broadcast("ListChannel", { message: "List updated", type: "broadcast" })
  end

  belongs_to :list_creator, class_name: "User", foreign_key: "list_creator_id"
end
