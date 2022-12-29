# frozen_string_literal: true

class HochschuleEsslingenCoursesParser
  HE_WEBSITE = <<~URL
    https://www3.hs-esslingen.de/qislsf/rds?
    state=wsearchv&
    search=1&
    subdir=veranstaltung&
    choice.veranstaltung.verartid=y&
    veranstaltung.verartid=9&
    veranstaltung.semester=20222&
    P_start=0&
    P_anzahl=10&
    P.sort=&
    _form=display
  URL

  COURSE_URLS_PATH = Rails.root.join('tmp/courses_urls.json')
  COURSES_PATH = Rails.root.join('tmp/courses.json')

  def initialize
    Capybara.default_max_wait_time = 1
    Capybara.default_driver = :selenium_chrome_headless
    @b = Capybara.current_session
  end

  def perform
    cache = load_cache_file(COURSES_PATH)
    return cache if cache

    data = class_urls.map do |class_url|
      Rails.logger.info("Parsing #{class_url}")
      extract_class_data_on(class_url)
    end
    cache_json_to_file(COURSES_PATH, data.to_json)
    Capybara.current_session.driver.quit
    data
  end

  private

  # rubocop:disable Metrics/MethodLength,  Metrics/AbcSize
  def extract_class_data_on(class_url)
    @b.visit(class_url)
    {
      class_url:,
      class_name: @b.find('h1').text,
      semester: @b.find('td[headers=basic_5]').text,
      termin_groups: @b.all('table[summary="Übersicht über alle Veranstaltungstermine"]').map do |table|
        title_hash = {}
        table.all('tr:first-child th:not(:first-child)').each_with_index { |th, i| title_hash[th.text] = i + 1 }
        {
          group: /Termine Gruppe: (.*)/.match(table.find('caption').text)[1],
          events: table.all('tr:not(:first-child)').map do |tr|
            tds = tr.all('td')
            hash = {}
            title_hash.each do |k, v|
              hash[k] = tds[v].text
            end
            hash[:event_csi_link] = tds[0].all('a')[-1][:href]
            hash[:place_link] = tds[title_hash['Raum']].all('a')[0][:href] if tds[title_hash['Raum']].all('a').present?
            hash
          end
        }
      end
    }
  end
  # rubocop:enable Metrics/MethodLength,  Metrics/AbcSize

  def class_urls
    cache = load_cache_file(COURSE_URLS_PATH)
    return cache if cache

    urls = []
    urls.push(*extract_class_links_on(HE_WEBSITE))
    extract_page_links.each do |page_link|
      urls.push(*extract_class_links_on(page_link))
    end
    cache_json_to_file(COURSE_URLS_PATH, urls.to_json)
    urls
  end

  def extract_class_links_on(page_link)
    @b.visit(page_link)
    Rails.logger.info("Get Class URL from #{page_link}")
    @b.all('table tr td:nth-child(2) a').map { |a| a[:href] }
  end

  def extract_page_links
    @extract_page_links ||= @b.all('a.linkAsButton').map { |a| a[:href] }
  end

  def load_cache_file(file_name)
    return nil unless File.exist?(file_name)

    JSON.parse(File.read(file_name))
  end

  def cache_json_to_file(path, json)
    File.open(path, 'w:UTF-8') do |f|
      f.write(json)
    end
  end
end
