# frozen_string_literal: true

if ENV['SLOW'].present?
  require 'selenium-webdriver'
  module ::Selenium
    module WebDriver
      module Remote
        class Bridge
          alias old_execute execute

          def execute(*args)
            sleep(0.1)
            old_execute(*args)
          end
        end
      end
    end
  end
end
