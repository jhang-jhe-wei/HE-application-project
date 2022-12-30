# frozen_string_literal: true

FactoryBot.define do
  factory :group_event do
    course_termin_group { nil }
    started_date_on { '2022-12-29' }
    ended_date_on { '2022-12-29' }
    csi_url { 'MyString' }
    teacher_name { 'MyString' }
    place_url { 'MyString' }
    place { 'MyString' }
    day_of_the_week { 1 }
    started_minute_at { 1 }
    ended_minute_at { 1 }
  end
end
