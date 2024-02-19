class UserImageSerializer
  include Rails.application.routes.url_helpers

  def initialize(user)
    @user = user
  end

  def user_image
    if @user.user_image.attached?
      {
        url: rails_blob_url(@user.user_image),
      }
    end
  end
end
