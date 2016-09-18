class ActionLog
  include Mongoid::Document
  include Mongoid::Timestamps
  field :log, type: String
end
