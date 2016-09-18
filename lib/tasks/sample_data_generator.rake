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

    class SiteData
      attr_accessor :domain, :path_names
      def initialize(domain)
        @domain = domain
        @path_names = %w(news artciles events)
      end

      def random_url
        r = rand

        if r < 0.2
          "/"
        elsif r < 0.5
          "/#{path_names.sample}"
        else
          "/#{path_names.sample}/#{rand(10)}"
        end
      end
    end

    sites = 1.upto(10).map { SiteData.new(Faker::Internet.domain_name) }
    sites.each { |site| Site.create(root_url: site.domain).tapp }

    users = 1.upto(100).map { User.new }

    1000.times do
      log = {}

      user = users.sample
      site = sites.sample

      user_id = user.id
      user_status = user.status

      site_id = Site.find_by(root_url: site.domain).id
      url = site.random_url

      timestamp = rand(24).hours.ago.to_i

      ActionLog.create!({
        site_id: site_id,
        url: url,
        user_id: user.id,
        user_status: user.status,
        timestamp: rand(24).hours.ago.to_i
      }).tapp
    end
  end
end
