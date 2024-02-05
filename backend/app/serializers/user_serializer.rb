class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created_at

  # ,:user_image
  # def user_image
  #   if object.user_image.attached?
  #     {
  #       url: rails_blob_url(object.user_image)
  #     }
  #   end
  # end

  # attribute :created_date do |user|
  #   user.created_at && user.created_at.strftime("%m/%d/%Y")
  # end
end
