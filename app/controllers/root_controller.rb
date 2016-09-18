class RootController < ApplicationController
  def index
    @sites = Site.all
  end

  def load_log
    raw_logs = ActionLog.collection.aggregate([
      { "$match": { site_id: params[:site_id] } },
      { "$sort": { timestamp: 1 } }
    ])

    result = ActionLogFilter.new.filter_logs(raw_logs)

    render json: result
  end
end
