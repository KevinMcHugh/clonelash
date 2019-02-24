module SocketSendable
  extend ActiveSupport::Concern

  def to_socket_json
    as_json.merge('message_type' => self.class.name)
  end
end