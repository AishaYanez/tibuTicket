class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  has_one_attached :user_image

  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
end
