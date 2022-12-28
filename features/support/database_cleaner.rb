# frozen_string_literal: true

begin
  Before do |_|
    DatabaseCleaner.strategy = [:truncation]
  end

  After do |_|
    DatabaseCleaner.clean
  end

  AfterAll do |_|
    DatabaseCleaner.clean_with :truncation
  end
rescue NameError
  raise 'You need to add database_cleaner to your Gemfile (in the :test group) if you wish to use it.'
end
