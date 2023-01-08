class CoursesController < ApplicationController
  def index
    @courses = Course.includes(groups: :events).all
    if params[:q]
      @courses = @courses.where('name LIKE ?', "%#{params[:q]}%")
    else
      @courses = @courses.none
    end
  end
end
