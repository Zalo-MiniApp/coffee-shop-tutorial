const base = 'https://coffee-shop-server-api.herokuapp.com'

export const request = (method, url, data) => fetch(`${base}/${url}`, {
  method: method,
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" }
})

export const login = async (access_token) => {
  const data = await request('POST', 'login', {
    access_token
  })
  console.log(data)
  return data
}