import api from 'zmp-sdk';
import config from '../config'

const base = config.BASE_URL

const saveToken = token => api.setStorage({
  data: { token },
  fail: (error) => console.log('Failed to save token to storage. Details: ', error)
})

const loadToken = () => api.getStorage({
  keys: ['token'],
  fail: (error) => console.log('Failed to get token from storage. Details: ', error)
}).then(data => data.token)

export const request = async (method, url, data) => {
  const headers = { "Content-Type": "application/json" }
  const token = await loadToken()
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
    await saveToken(data.token)
  }
  return data
}

export const getCurrentUser = async () => {
  const response = await (await request('GET', 'users/logged-in')).json()
  if (response.data) {
    return response.data
  }
}

export const getProducts = async () => {
  const response = await (await request('GET', 'products')).json()
  if (response.data) {
    return response.data
  }
}