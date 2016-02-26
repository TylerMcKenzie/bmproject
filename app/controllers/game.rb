get '/play' do 
	if current_user
		erb :'game/play'
	else
		redirect '/'
	end
end

post '/play' do 
	data = JSON.parse(request.body.read)
	now = DateTime.now
	Game.create(user_id: current_user.id, survival_time: data["survived_time"].to_i, played_at: now)
	erb :'game/_game_over', layout: false
end