get '/play' do 
	if current_user
		erb :'game/play'
	else
		redirect '/'
	end
end