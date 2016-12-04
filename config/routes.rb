Rails.application.routes.draw do
  root to: 'home#index'
  get 'reports' => 'reports#index'
end
