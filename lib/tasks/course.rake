# frozen_string_literal: true

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
        course.update!(course_.except(:groups))
        group_names = course_[:groups].map { |group| group[:name] }
        course.groups.where.not(name: group_names).or(course.groups.where(name: nil)).destroy_all
        course_[:groups].each do |group_|
          group = course.groups.find_or_create_by(name: group_[:name])
          group.events.destroy_all
          group_[:events].each do |event_|
            group.events.create!(event_)
          end
        end
      end
  end
end
