class NotificationsController < ApplicationController

  
    def create
      @notification = WebpushNotification.new(
        endpoint: params[:endpoint],
        auth_key: params[:keys][:auth],
        p256dh_key: params[:keys][:p256dh],
      )
      
      if @notification.save
        render json: @notification
      else
        render json: @notification.errors.full_messages, status: :unprocessable_entity
      end
    end
  end
  