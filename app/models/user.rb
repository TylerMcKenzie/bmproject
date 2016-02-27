class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :games
  validates :name, presence: true
  validates :name, uniqueness: true

  has_secure_password

  def best_game
  	if self.games.any?
	  	games = self.games
	  	scores = []
	  	games.each do |game|
	  		scores << game.survival_time
	  	end
	  	best = scores.max
	  	best_game = games.select { |game| game.survival_time = best}[0]
	  end
  end

  def self.leader_board
    users = User.all
    users = users.sort {|a, b| b.best_game.survival_time <=> a.best_game.survival_time}
  end

  # def latest_time
  # 	if self.games.any?
  # 		games = self.games
  # 		times = []
  # 		games.each do |game|
  # 			times << game.played_at
  # 		end
  # 		latest = times.max
  # 		latest_time = games.select{|game| game.played_at = latest}[0]
  # 		latest_time.survival_time
  # 	end
  # end
  
end
