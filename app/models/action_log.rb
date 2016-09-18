class ActionLog
  include Mongoid::Document
  include Mongoid::Timestamps
  field :site_id, type: String
  field :user_id, type: String
  field :user_status, type: String
  field :timestamp, type: Integer
end
