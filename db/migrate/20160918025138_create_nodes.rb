class CreateNodes < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.string :root_url
    end
  end
end
