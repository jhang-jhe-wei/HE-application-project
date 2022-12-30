# README

## Ruby version
- 3.1.2

## System dependencies
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- [SQLite](https://www.sqlite.org/download.html)
- [Chromedriver](https://chromedriver.chromium.org/downloads)(for test)

## Configuration
```sh
bundle install
yarn install
rails db:migrate
bin/dev
```

## Database initialization
```sh
rails db:create
rails db:migrate
```

## How to run the test suite
```sh
cucumber
rspec
```
