import config from '../config'
import { loadToken, saveToken } from './storage'

const base = config.BASE_URL

export const request = async (method, url, data) => {
  const headers = { 'Content-Type': 'application/json' }
  const token = await loadToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return fetch(`${base}/${url}`, {
    method: method,
    body: JSON.stringify(data),
    headers
  })
}

export const login = async (accessToken) => {
  try {
    const response = await (await request('POST', 'users/login', {
      accessToken
    })).json()
    if (response.data.jwt) {
      await saveToken(response.data.jwt)
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
    return null
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

export const updateFollowStatus = async (status) => {
  try {
    const response = await request('POST', 'users/followed', { status })
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error update follow OA status. Details: ', error)
    return false
  }
}

export const checkout = async (payload) => {
  try {
    const response = await request('POST', 'orders/checkout', payload)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Error placing an order. Details: ', error)
    return false
  }
}

export const getPlacedOrders = async () => {
  try {
    const response = await (await request('GET', 'orders/history')).json()
    return response.data ?? []
  } catch (error) {
    console.log('Error fetching placed orders. Details: ', error)
    return []
  }
}
