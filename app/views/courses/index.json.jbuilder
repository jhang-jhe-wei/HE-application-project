# frozen_string_literal: true

json.array! @courses.map { |course| build_json(course) }.flatten
