Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/reels/index'
      post '/reels/create'
      put '/update/:id', to: 'reels#update'
      delete '/destroy/:id', to: 'reels#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
