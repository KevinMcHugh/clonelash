module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
    end

    private
      def find_player
        if cookies[:player_id]
          Player.find(cookies[:player_id])
        else
          reject_unauthorized_connection
        end
      end
  end
end