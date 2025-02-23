import axios from 'axios'

export const baseURL = 'https://react-blog-5nn6.onrender.com/api'

export const API = axios.create({
  baseURL,
})

API.interceptors.request.use(
  (config) => {
    const API_TOKEN = localStorage.getItem('blog_auth_token_react') || ''
    config.headers = config.headers || {}
    config.headers['access_token'] = API_TOKEN
    return config
  },
  (error) => Promise.reject(error),
)