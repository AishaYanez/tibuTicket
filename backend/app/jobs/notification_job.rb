
class NotificationJob < ApplicationJob
    queue_as :default
  
    def perform(message)
        WebpushNotification.last.push(message)
    end
  end
  