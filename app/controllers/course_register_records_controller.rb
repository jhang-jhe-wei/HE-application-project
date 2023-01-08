# frozen_string_literal: true

class CourseRegisterRecordsController < ApplicationController
  before_action :set_course_register_record, only: %i[destroy]

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
      render json: course_register_record.errors.full_messages, status: :unprocessable_entity
    end
  end

  # DELETE /course_register_records/1
  # DELETE /course_register_records/1.json
  def destroy
    raise 'Forbidden' unless current_user.course_register_records.include?(@course_register_record)

    @course_register_record.destroy
    @course_register_records = current_user.course_register_records.all
    render :index
  rescue StandardError => e
    if e.message == 'Forbidden'
      render json: { error: 'Forbidden' }, status: :forbidden
    else
      render json: { error: e.message }, status: :forbidden
    end
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
