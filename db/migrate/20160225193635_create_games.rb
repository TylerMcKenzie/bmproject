class CreateGames < ActiveRecord::Migration
  def change
  	create_table :games do |t|
  		t.integer :user_id
  		t.integer :survival_time
  		t.date :played_at
  	end
  end
end
