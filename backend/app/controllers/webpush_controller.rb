class WebpushController < ApplicationController
    def vapid_public_key
      render json: { vapid_public_key: Rails.application.credentials.dig(:webpush, :public_key) }
    end
  end