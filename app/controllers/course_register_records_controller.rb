class CourseRegisterRecordsController < ApplicationController
  before_action :set_course_register_record, only: %i[ destroy ]

  # GET /course_register_records
  # GET /course_register_records.json
  def index
    @course_register_records = current_user.course_register_records.all
  end

  # POST /course_register_records
  # POST /course_register_records.json
  def create
    course_register_record = current_user.course_register_records.build(course_register_record_params)

    if course_register_record.save
      @course_register_records = current_user.course_register_records.all
      render :index, status: :created, location: course_register_record
    else
      render json: course_register_record.errors, status: :unprocessable_entity
    end
  end

  # DELETE /course_register_records/1
  # DELETE /course_register_records/1.json
  def destroy
    @course_register_record.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_course_register_record
    @course_register_record = CourseRegisterRecord.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def course_register_record_params
    params.require(:course_register_record).permit(:registerable_id, :registerable_type)
  end
end
