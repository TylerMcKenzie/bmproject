get '/' do 
	erb :'index'
end

get '/logout' do
	session.clear
	redirect '/'
end

post '/login' do
	if user = User.find_by(name: params[:name]).try(:authenticate, params[:password])
		session[:id] = user.id
		redirect '/'
	else
		@login_fail = "Can't find that user"
		erb :'index'
	end
end

post '/register' do 
	user = User.new({name: params[:name], password: params[:password]})
	if user.save
		redirect '/'
	else
		@errors = user.errors.full_messages
		erb :'index'
	end
end
