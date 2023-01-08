# frozen_string_literal: true

class CoursesController < ApplicationController
  def index
    @courses = Course.includes(groups: :events).all
    page = params[:page].to_i || 1
    @courses = if params[:q]
                 @courses.where('name LIKE ?', "%#{params[:q]}%")
               else
                 @courses.none
               end
    @courses = @courses.page(page)
  end
end
