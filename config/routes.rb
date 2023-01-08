# frozen_string_literal: true

Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  resources :courses, only: [:index]
  resources :course_register_records, only: %i[index create destroy]
end
