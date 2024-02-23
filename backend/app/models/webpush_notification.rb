class WebpushNotification < ApplicationRecord
    def push(message)
        Webpush.payload_send(
          message: message,
          endpoint: self.endpoint,
          p256dh: self.p256dh_key,
          auth: self.auth_key,
          vapid: {
            private_key: Rails.application.credentials.dig(:webpush, :private_key),
            public_key: Rails.application.credentials.dig(:webpush, :public_key)
          }
        )
      end
      
  end
  