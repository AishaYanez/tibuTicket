class Api::V1::ListsController < ApplicationController
  before_action :authenticate_user!, only: %i[ create destroy ]
  before_action :set_list, only: %i[ show getTicket increaseNumber decreaseNumber destroy ]

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
             data: {
               list: ListSerializer.new(@list).serializable_hash[:data][:attributes],
               list_image: ListImageSerializer.new(@list).list_image,
             },
           }
  end

  # POST /api/v1/lists
  def create
    @list = List.new(list_params)
    @list.list_creator = current_user

    if @list.save
      render json: {
        status: { code: 200, message: "Lista creada correctamente" },
        data: {
          list_description: ListSerializer.new(list).serializable_hash[:data][:attributes],
          list_image: ListImageSerializer.new(@list).list_image,
        },
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "No se pudo crear una nueva lista" },
      }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/lists/1
  def getTicket
    @list.list_limit_number += 1

    if @list.save
      list_ticket = "#{@list.list_name}:#{@list.list_limit_number}"
      render json: {
        data: {
          list_ticket: list_ticket,
        },
      }
    else
      render json: {
        status: { code: 422, message: "No se reservar un número" },
      }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/list/1/increaseNumber
  def increaseNumber
    @list.list_current_number += 1

    if @list.save
      render json: {
        status: { code: 200, message: "Número aumentado correctamente" },
        data: {
          list_description: ListSerializer.new(@list).serializable_hash[:data][:attributes],
          list_image: ListImageSerializer.new(@list).list_image,
        },
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "No se pudo aumentar el número" },
      }, status: :unprocessable_entity
    end
  end

  #   PATCH/PUT /api/v1/list/1/decreaseNumber
  def decreaseNumber
    @list.list_current_number -= 1

    if @list.save
      render json: {
        status: { code: 200, message: "Número disminuido correctamente" },
        data: {
          list_description: ListSerializer.new(@list).serializable_hash[:data][:attributes],
          list_image: ListImageSerializer.new(@list).list_image,
        },
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "No se pudo disminuir el número" },
      }, status: :unprocessable_entity
    end
  end

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
    params.require(:list).permit(:list_name, :list_image, :list_current_number, :list_limit_number)
  end
end
