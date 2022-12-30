require_relative '../hochschule_esslingen/converter'
require_relative '../hochschule_esslingen/parser'

namespace :course do
  desc 'Load Course data from online'
  task load_data_from_online: :environment do
    HochschuleEsslingen::Converter
      .new(HochschuleEsslingen::Parser.new.parse)
      .convert
      .each do |course_|
        course = Course.find_or_create_by(name: course_[:name])
        course_[:groups_attributes].each do |group_|
          group = course.groups.find_or_create_by(name: group_[:name])
          group.events.destroy_all
          group_[:events_attributes].each do |event_|
            group.events.create!(event_)
          end
        end
      end
  end
end
