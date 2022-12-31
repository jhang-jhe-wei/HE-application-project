# frozen_string_literal: true

module HochschuleEsslingen
  class Converter
    def initialize(data)
      @data = data
    end

    # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    def convert
      @data.map do |course|
        {
          name: course['class_name'],
          class_url: course['class_url'],
          semester: course['semester'],
          groups: course['termin_groups'].map do |group|
            {
              name: group['name'],
              events: group['events'].map do |event|
                {
                  csi_url: event['event_csi_link'],
                  teacher_name: event['Lehrperson'],
                  place_url: event['place_link'],
                  place: event['Raum'],
                  wday: convert_wday_from(event['Tag']),
                  **parse_date_range(event['Dauer']),
                  **parse_course_time(event['Zeit'])
                }
              end
            }
          end
        }
      end
    end
    # rubocop:enable Metrics/MethodLength, Metrics/AbcSize

    private

    def convert_wday_from(wday)
      hash = {
        'Mo.' => 1,
        'Di.' => 2,
        'Mi.' => 3,
        'Do.' => 4,
        'Fr.' => 5
      }
      hash[wday]
    end

    # rubocop:disable Metrics/MethodLength
    def parse_date_range(date_range)
      case date_range
      when /^von (?<date>\d{2}.\d{2}.\d{4})/
        date_range_hash($LAST_MATCH_INFO[:date], nil)
      when /^am (?<date>\d{2}.\d{2}.\d{4})/
        date_range_hash($LAST_MATCH_INFO[:date], $LAST_MATCH_INFO[:date])
      when /^bis (?<date>\d{2}.\d{2}.\d{4})/
        date_range_hash(nil, $LAST_MATCH_INFO[:date])
      when /^(?<started_date>\d{2}.\d{2}.\d{4}) bis (?<ended_date>\d{2}.\d{2}.\d{4})/
        date_range_hash($LAST_MATCH_INFO[:started_date], $LAST_MATCH_INFO[:ended_date])
      else
        date_range_hash(nil, nil)
      end
    end
    # rubocop:enable Metrics/MethodLength

    def date_range_hash(started_date, ended_date)
      started_date_on = started_date ? Date.strptime(started_date, '%d.%m.%Y') : nil
      ended_date_on = ended_date ? Date.strptime(ended_date, '%d.%m.%Y') : nil
      {
        started_date_on:,
        ended_date_on:
      }
    end

    def parse_course_time(time_range)
      result = /^(?<started_time>\d{2}:\d{2}) bis (?<ended_time>\d{2}:\d{2})/.match(time_range)
      return { started_minute_at: nil, ended_minute_at: nil } unless result

      started_minute_at = hour_and_min_to_mins(result[:started_time])
      ended_minute_at = hour_and_min_to_mins(result[:ended_time])

      { started_minute_at:, ended_minute_at: }
    end

    def hour_and_min_to_mins(time)
      res = time.split(':')
      res[0].to_i * 60 + res[1].to_i
    end
  end
end
