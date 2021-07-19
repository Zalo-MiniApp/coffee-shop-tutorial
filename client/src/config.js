const env = import.meta.env.MODE || 'development';
const config = {
  development: {
    BASE_URL: 'http://localhost:5000',
    OA_ID: '4318657068771012646',
    DEFAULT_ACCESS_TOKEN: 'KYJpEX0sfnPL8VOv5J6Y4b0azpyMB_mJFaJHVouhn59jNVPmVK3mMc0KmmH5PyiiVGtfO3r9xGXX9CzdKsRUIdiIxG1QN-jDHpo_8MPtjtLHFky3QslhKdaxsIvXUCbiPn3xJdHJmmvVCVTiG5lC6s19x7XL7E0MSNMrT6aOeYLPJF9NNJp_U7DrpWr0P_mbSd3_KN4zxI5uQE5wUdxOCZWfuMf_GVGWN5BsV7GFvmvfMkSiHpBrGr9Lv3noG_9dO1U-565Bl5XIDhet4NImPnCyvouqQd4bOHeGBwOI'
  },
  production: {
    BASE_URL: 'https://coffee-shop-server-api.herokuapp.com',
    OA_ID: '4318657068771012646'
  }
}

export default config[env];