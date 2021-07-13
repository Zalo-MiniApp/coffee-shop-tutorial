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
  accessToken = '6aRT3XwNs4KTGzWD6v3TGHX6sGiOZemQGW7j5IANc1bCCDvNGwU_OnqBmrqThy5ESXd5Un6idrLFBPnPG8hjHKKly0eOZf8OGW-RAYE-x3DXCvfxFwN3KsfmfKmuuD9yNakzDXZAm1nx0ROZ9AtJF28KeGrMd-49BK2MG2xyddTgJi4wA_6u54iayJq_cu8gF4c58NhNrd5xGxDy9SFpO4qNj5mvfCuJTZV8BGFadY5QR9Sc5x_TFMaoenShkFOBSnod71IYhWDm4UWq9PcT04zCD-OmVHwEsK4'
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