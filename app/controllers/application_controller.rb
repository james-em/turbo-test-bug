class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def home
  end

  def page2
    if request.get?
      render :page2
    else
      render :page2, status: :unprocessable_entity
    end
  end
end
