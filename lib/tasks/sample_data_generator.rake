namespace :sample_data_generator do
  desc "generates sample data"
  task execute: [:environment] do

    class User
      attr_accessor :id, :status
      def initialize
        @id = SecureRandom.uuid
        @status = %w(guest free paying).sample
      end
    end

    10.times do
      Site.create(root_url: Faker::Internet.url).tapp
    end

    site_ids = Site.all.ids
    users = 1.upto(100).map { User.new }

    1000.times do
      log = {}
      user = users.sample

      log[:site_id] = site_ids.sample
      log[:user_id] = user.id
      log[:user_status] = user.status
      log[:timestamp] = rand(24).hours.ago.to_i

      ActionLog.create!(log: log).tapp
    end
  end
end
