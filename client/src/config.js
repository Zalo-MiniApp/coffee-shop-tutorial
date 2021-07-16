const env = import.meta.env.MODE || 'development';
const config = {
  development: {
    BASE_URL: 'http://localhost:5000',
    OA_ID: '4318657068771012646',
    DEFAULT_ACCESS_TOKEN: 'dfo54clF8mwPcO0HRiWc2foSWHTjrcLEskkt9rheGMxEluOEPgziIE6AgWT_lmXXrUdqSsNYE6p6v-42PCaU7jgOt7rNiJLwr9_YENYP8oECaCaa3PyWEFgIW7jOWJuVygl-HmsU0Zw5owXB2_btAu_UbKGWvMuAr-B5J5FJDIpNpl1F9PfE0ekcg41r-dCTdkgAO0-ZIXtxi-rQ3-Sp0QphadfV_5KbpVBnHcBt12NiqirkJ8PfCCUBla1CsMaRwEIfIscv0mJZaCDCRvCb97buncIJAclM8We'
  },
  production: {
    BASE_URL: 'https://coffee-shop-server-api.herokuapp.com',
    OA_ID: '4318657068771012646'
  }
}

export default config[env];