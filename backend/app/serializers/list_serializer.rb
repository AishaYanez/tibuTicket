class ListSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer
  attributes :id, :list_name, :list_current_number

  # attribute :list_creator do |list|
  #   UserSerializer.new(list.list_creator).serializable_hash[:data][:attributes]
  # end
end
