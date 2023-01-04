# frozen_string_literal: true

class CourseTerminGroup < ApplicationRecord
  belongs_to :course
  has_many :events, class_name: 'GroupEvent', dependent: :destroy
  has_many :course_register_records, as: :registerable, dependent: :destroy
end
