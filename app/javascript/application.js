// Entry point for the build script in your package.json
import './pages/CourseSimulator'
import 'react_ujs';
import axios from 'axios'

const csrfToken = document.querySelector("meta[name=csrf-token]").content
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
