class Api::V1::ListsController < ApplicationController
  before_action :authenticate_user!, only: %i[ create destroy ]
  before_action :set_list, only: %i[ show update destroy ]

  # GET /api/v1/lists
  def index
    @lists = List.all
    serialized_lists = @lists.map do |list|
      {
        list_description: ListSerializer.new(list).serializable_hash[:data][:attributes],
        list_image: ListImageSerializer.new(list).list_image,
      }
    end

    render json: serialized_lists
  end

  # GET /api/v1/lists/1
  def show
    render json: {
             status: { code: 200, message: "Created list sucessfully." },
             data: {
               list: ListSerializer.new(@list).serializable_hash[:data][:attributes],
               list_image: ListImageSerializer.new(@list).list_image,
             },
           }, status: :ok
  end

  # POST /api/v1/lists
  def create
    @list = List.new(list_params)
    @list.list_creator = current_user

    if @list.save
      render json: {
        status: { code: 200, message: "Created list sucessfully." },
        data: {
          list: ListSerializer.new(@list).serializable_hash[:data][:attributes],
          list_image: ListImageSerializer.new(@list).list_image,
        },
      }, status: :ok
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/lists/1
  def update
    if @list.update(list_params)
      render json: @list
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/increase_number/1
  # def update_increase_number
  #   if @list.update(list_params)
  #     render json: @list
  #   else
  #     render json: @list.errors, status: :unprocessable_entity
  #   end
  # end

  #   PATCH/PUT /api/v1/decrease_number/1
  #   def update_decrease_number
  #     if @list.update(list_params)
  #       render json: @list
  #     else
  #       render json: @list.errors, status: :unprocessable_entity
  #     end
  #   end

  # DELETE /api/v1/lists/1
  def destroy
    @list.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_list
    @list = List.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def list_params
    params.require(:list).permit(:list_name, :list_image, :list_current_number)
  end
end
