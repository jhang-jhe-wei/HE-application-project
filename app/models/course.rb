# frozen_string_literal: true

class Course < ApplicationRecord
  has_many :groups, class_name: 'CourseTerminGroup', dependent: :destroy
end
