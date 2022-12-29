class CreateCourseTerminGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :course_termin_groups do |t|
      t.references :course, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
