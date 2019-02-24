class PlayerChannel < ApplicationCable::Channel
  def subscribed
    player = Player.find(params[:id])
    stream_for player
  end
end