helpers do
  # This will return the current user, if they exist

  def current_user
    User.find(session[:id]) if session[:id]
  end

end