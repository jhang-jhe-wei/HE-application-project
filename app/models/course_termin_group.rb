# frozen_string_literal: true

class CourseTerminGroup < ApplicationRecord
  belongs_to :course
  has_many :events, class_name: 'GroupEvent', dependent: :destroy
end
