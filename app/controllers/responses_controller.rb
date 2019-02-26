class ResponsesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    response = Response.find(params[:id])
    UpdateResponse.call(update_params)
    render json: response.as_json
  end

  private
  def update_params
    params.require(:response).permit(:text)
  end
end
