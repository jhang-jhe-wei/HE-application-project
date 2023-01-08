# frozen_string_literal: true

json.nextPage @courses.next_page
json.courses @courses.map { |course| build_json(course) }.flatten
