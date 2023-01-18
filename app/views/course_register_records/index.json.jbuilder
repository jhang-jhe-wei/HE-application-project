# frozen_string_literal: true

json.array! @course_register_records do |course_register_record|
  json.id course_register_record.id
  register_record = course_register_record.registerable
  case register_record
  when Course
    json.className register_record.name
    json.groupName 'No Grouping'
    json.events []
  when CourseTerminGroup
    json.className register_record.course.name
    json.groupName register_record.name
    json.events register_record.events do |event|
      json.id event.id
      json.started_date_on event.started_date_on
      json.ended_date_on event.ended_date_on
      json.startedMinuteAt event.started_minute_at
      json.endedMinuteAt event.ended_minute_at
      json.place event.place
      json.wday event.wday
      json.csi_url event.csi_url
      json.place_url event.place_url
      json.frequency event.frequency
    end
  end
end
