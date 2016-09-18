class Site < ActiveRecord::Base
  validates :root_url, presence: true
end
