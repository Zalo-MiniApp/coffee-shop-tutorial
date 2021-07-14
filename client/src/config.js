const env = import.meta.env.MODE || 'development';
const config = {
  development: {
    BASE_URL: 'http://localhost:5000',
    OA_ID: '4318657068771012646',
    DEV_TOKEN: 'a0G-QqBCsoAN0JjeHylU9f84Ecv4rOzKznmQQ6A5i7hWGZzlMTcmLezmLNeen_1EfNjFIotGzKxx7sjrJAVDNPiTQ4jArEToyN5uGbRym7JkUMTzN__TL8niJ485ySLIraPZ50AKt06C6LaMAzxe1vWPLHuNX_rCaIySNoAJj4EW5X8H4eYT2PaDAnezmwe3bKmm5131bG_3IYCARi244Bb70JvlYhGbqIOMCbgIe1s9EoGE0uQk7AyGAGX_mg4It5915tJNg06cVHKHA-EmGsPBuV_GVqBLsYO'
  },
  production: {
    BASE_URL: 'https://coffee-shop-server-api.herokuapp.com',
    OA_ID: '4318657068771012646'
  }
}

export default config[env];