# frozen_string_literal: true

class CourseRegisterRecord < ApplicationRecord
  belongs_to :registerable, polymorphic: true
  belongs_to :user
  validates :user_id,
            uniqueness: { scope: %i[registerable_id registerable_type],
                          message: 'You have already registered this course.' }
end
