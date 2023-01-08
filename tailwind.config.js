module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.{js,ts,tsx,jsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        'scale-x': {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.1, 1)' },
        }
      }
    }
  }
}
