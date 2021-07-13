const env = import.meta.env.MODE || 'development';
const config = {
  development: {
    BASE_URL: 'http://localhost:5000',
  },
  production: {
    BASE_URL: 'https://coffee-shop-server-api.herokuapp.com',
  }
}

export default config[env];