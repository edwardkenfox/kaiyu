class RootController < ApplicationController
  def index
    @sites = Site.all
  end

  def load_log
    result = ActionLog.aggregates([
      { "$match": {site_id: "25"} },
      { "$sort": {timestamp: 1} }
    ])
    binding.pry
    render json: {test: "test"}
  end
end
