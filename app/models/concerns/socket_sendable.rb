module SocketSendable
  extend ActiveSupport::Concern

  def to_socket_json(options={})
    as_json(options).merge('message_type' => self.class.name)
  end
end