class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :games
  validates :name, presence: true, uniqueness: true

  has_secure_password
end
