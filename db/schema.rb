# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_29_150557) do
  create_table "course_termin_groups", force: :cascade do |t|
    t.integer "course_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_course_termin_groups_on_course_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.string "class_url"
    t.string "semester"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "group_events", force: :cascade do |t|
    t.integer "course_termin_group_id", null: false
    t.date "started_date_on"
    t.date "ended_date_on"
    t.string "csi_url"
    t.string "teacher_name"
    t.string "place_url"
    t.string "place"
    t.string "frequency"
    t.integer "wday"
    t.integer "started_minute_at"
    t.integer "ended_minute_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_termin_group_id"], name: "index_group_events_on_course_termin_group_id"
  end

  add_foreign_key "course_termin_groups", "courses"
  add_foreign_key "group_events", "course_termin_groups"
end
