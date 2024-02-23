class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  before_create :set_admin_flag

  has_one_attached :user_image

  has_many :lists, foreign_key: "list_creator_id", dependent: :destroy

  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  private

  def set_admin_flag
    self.is_admin = User.count.zero? if is_admin.nil?
    self.is_admin = true if is_admin.nil?
  end

  validates :nickname, presence: true
  validates :email, presence: true, uniqueness: true
  validates :encrypted_password, presence: true
end
