class CoursesController < ApplicationController
  def index
    @courses = Course.includes(groups: :events).all
    page = params[:page].to_i || 1
    if params[:q]
      @courses = @courses.where('name LIKE ?', "%#{params[:q]}%")
    else
      @courses = @courses.none
    end
    @courses = @courses.page(page)
  end
end
