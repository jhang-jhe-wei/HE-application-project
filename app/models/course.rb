# frozen_string_literal: true

class Course < ApplicationRecord
  has_many :groups, class_name: 'CourseTerminGroup', dependent: :destroy
  has_many :course_register_records, as: :registerable, dependent: :destroy
end
