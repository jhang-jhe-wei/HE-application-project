# frozen_string_literal: true

class CourseRegisterRecordService
  def initialize(new_record, current_records)
    @new_record = new_record
    @current_records = current_records
  end

  def check_events_conflict!
    return if @new_record.registerable.is_a?(Course)

    @current_records.each do |record|
      next if record.registerable.is_a?(Course)
      next if record == @new_record

      @new_record.registerable.events.each do |event|
        if conflict?(event, record.registerable.events)
          raise StandardError, "This course has conflicts with #{record.registerable.course.name}"
        end
      end
    end
  end

  private

  # rubocop:disable Metrics/MethodLength, Metrics/AbcSize, Metrics/CyclomaticComplexity
  def conflict?(new_event, events)
    events.find do |event|
      return false unless new_event.wday == event.wday

      (
        new_event.started_minute_at >= event.started_minute_at &&
        new_event.started_minute_at < event.ended_minute_at
      ) || (
        new_event.ended_minute_at > event.started_minute_at &&
        new_event.ended_minute_at <= event.ended_minute_at
      ) || (
        new_event.started_minute_at <= event.started_minute_at &&
        new_event.ended_minute_at >= event.ended_minute_at
      )
    end
  end
  # rubocop:enable Metrics/MethodLength, Metrics/AbcSize, Metrics/CyclomaticComplexity
end
