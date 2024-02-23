class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created_at, :is_admin, :nickname
end
