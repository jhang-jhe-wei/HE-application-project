require 'rails_helper'
require "#{Rails.root.join('lib/hochschule_esslingen/converter')}"

RSpec.describe HochschuleEsslingen::Converter do
  describe '#parse_date_range' do
    subject(:result) { described_class.new(nil).send(:parse_date_range, arg) }

    context 'when date range is am 29.11.2022' do
      let(:arg) { 'am 29.11.2022' }
      let(:date) { Date.new(2022, 11, 29) }

      it 'expects to get started_date_on and ended_date_on are 29.11.2022' do
        expect(result).to eq(
          started_date_on: date,
          ended_date_on: date
        )
      end
    end

    context 'when date range is von 29.11.2022' do
      let(:arg) { 'von 29.11.2022 ' }
      let(:date) { Date.new(2022, 11, 29) }

      it 'expects to get started_date_on is 29.11.2022' do
        expect(result).to eq(
          started_date_on: date,
          ended_date_on: nil
        )
      end
    end

    context 'when date range is bis 29.11.2022' do
      let(:arg) { 'bis 29.11.2022 ' }
      let(:date) { Date.new(2022, 11, 29) }

      it 'expects to get ended_date_on is 29.11.2022' do
        expect(result).to eq(
          started_date_on: nil,
          ended_date_on: date
        )
      end
    end

    context 'when date range is 28.09.2022 bis 16.11.2022' do
      let(:arg) { '28.09.2022 bis 16.11.2022' }
      let(:started_date_on) { Date.new(2022, 9, 28) }
      let(:ended_date_on) { Date.new(2022, 11, 16) }

      it 'expects to get started_date_on is 28.09.2022 and ended_date_on is 16.11.2022' do
        expect(result).to eq(
          started_date_on:,
          ended_date_on:
        )
      end
    end

    context 'when date range is empty string' do
      let(:arg) { '' }

      it 'expects to get started_date_on  and ended_date_on are nil' do
        expect(result).to eq(
          started_date_on: nil,
          ended_date_on: nil
        )
      end
    end

    context 'when date range is nil' do
      let(:arg) { nil }

      it 'expects to get started_date_on  and ended_date_on are nil' do
        expect(result).to eq(
          started_date_on: nil,
          ended_date_on: nil
        )
      end
    end
  end

  describe '#parse_course_time' do
    subject(:result) { described_class.new(nil).send(:parse_course_time, arg) }

    context 'when time range is 09:15 bis 12:30' do
      let(:arg) { '09:15 bis 12:30' }

      it 'expects to get started_minute_at is 555 and ended_minute_at is 750' do
        expect(result).to eq(
          started_minute_at: 555,
          ended_minute_at: 750
        )
      end
    end
  end
end
