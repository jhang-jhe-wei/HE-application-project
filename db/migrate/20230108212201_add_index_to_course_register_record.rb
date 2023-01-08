# frozen_string_literal: true

class AddIndexToCourseRegisterRecord < ActiveRecord::Migration[7.0]
  def change
    add_index(
      :course_register_records,
      %i[user_id registerable_id registerable_type],
      unique: true,
      name: 'idx_course_register_records_on_user_id_and_registerable'
    )
  end
end
