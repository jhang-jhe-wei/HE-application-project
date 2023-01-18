# frozen_string_literal: true

module ApplicationHelper


  def build_events_json(group)
    group.events.map do |event|
      {
        id: event.id,
        startedMinuteAt: event.started_minute_at,
        endedMinuteAt: event.ended_minute_at,
        place: event.place,
        wday: event.wday
      }
    end
  end

  def build_groups_json(course)
    course.groups.map do |group|
      {
        id: group.id,
        type: 'CourseTerminGroup',
        className: course.name,
        groupName: group.name,
        events: build_events_json(group)
      }
    end
  end

  def build_course_json(course)
    {
      id: course.id,
      type: 'Course',
      className: course.name,
      groupName: 'No Grouping',
      events: []
    }
  end

  def build_json(course)
    if course.groups.present?
      build_groups_json(course)
    else
      build_course_json(course)
    end
  end
end
