import api from 'zmp-sdk';
import config from '../config'

const base = config.BASE_URL
console.log(base)

const saveToken = token => api.setStorage({
  data: { token },
  fail: (error) => console.log('Failed to save token to storage. Details: ', error)
})

const loadToken = () => new Promise(resolve => {
  api.getStorage({
    keys: ['token'],
    success: ({ token }) => {
      resolve(token)
    },
    fail: (error) => {
      console.log('Failed to get token from storage. Details: ', error)
      resolve(null)
    }
  })
})

export const request = async (method, url, data) => {
  const headers = { "Content-Type": "application/json" }
  const token = await loadToken()
  console.log('alo', token)
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
  try {
    const response = await request('POST', 'users/login', {
      accessToken
    })
    const data = await response.json()
    if (data.token) {
      await saveToken(data.token)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log('Error logging in. Details: ', error)
    return false
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await (await request('GET', 'users/logged-in')).json()
    return response.data
  } catch (error) {
    console.log('Error get current user info. Details: ', error)
  }
}

export const getProductsByCategory = async () => {
  try {
    const response = await (await request('GET', 'products/by-category')).json()
    return response.data
  } catch (error) {
    console.log('Error fetching products. Details: ', error)
    return []
  }
}