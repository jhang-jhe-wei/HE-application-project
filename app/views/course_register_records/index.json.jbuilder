# frozen_string_literal: true

json.array! @course_register_records do |course_register_record|
  json.id course_register_record.id
  register_record = course_register_record.registerable
  case register_record
  when Course
    json.className register_record.name
    json.groupName 'No Grouping'
  when CourseTerminGroup
    json.className register_record.course.name
    json.groupName register_record.name
  end
end
