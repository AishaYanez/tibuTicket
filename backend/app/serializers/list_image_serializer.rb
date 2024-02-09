class ListImageSerializer
  include Rails.application.routes.url_helpers

  def initialize(list)
    @list = list
  end

  def list_image
    if @list.list_image.attached?
      {
        url: rails_blob_url(@list.list_image),
      }
    end
  end
end
