# frozen_string_literal: true

class CreateGroupEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :group_events do |t|
      t.references :course_termin_group, null: false, foreign_key: true
      t.date :started_date_on
      t.date :ended_date_on
      t.string :csi_url
      t.string :teacher_name
      t.string :place_url
      t.string :place
      t.string :frequency
      t.integer :wday, comment: 'Day of week: 0 is Sunday'
      t.integer :started_minute_at
      t.integer :ended_minute_at

      t.timestamps
    end
  end
end
