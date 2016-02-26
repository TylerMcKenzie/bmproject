class Game < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :player, class_name: "User"

end
