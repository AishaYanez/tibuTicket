class ListSerializer < ActiveModel::Serializer
  attributes :id, :list_name, :list_image, :list_current_number
  # , :list_creator
end
