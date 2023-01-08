# frozen_string_literal: true

class CreateCourseRegisterRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :course_register_records do |t|
      t.references :registerable, polymorphic: true, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
