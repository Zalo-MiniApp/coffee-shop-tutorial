import config from '../config'

const base = config.BASE_URL

export const request = (method, url, data) => {
  const headers = { "Content-Type": "application/json" }
  const token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return fetch(`${base}/${url}`, {
    method: method,
    body: JSON.stringify(data),
    headers
  })
}

export const login = async (accessToken) => {
  const response = await request('POST', 'users/login', {
    accessToken
  })
  const data = await response.json()
  if (data.token) {
    localStorage.setItem('token', data.token)
  }
  return data
}

export const getCurrentUser = async () => {
  const data = await (await request('GET', 'users/logged-in')).json()
  return data
}