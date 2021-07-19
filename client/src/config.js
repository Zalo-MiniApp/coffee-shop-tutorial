const env = import.meta.env.MODE || 'development';
const config = {
  development: {
    BASE_URL: 'http://localhost:5000',
    OA_ID: '4318657068771012646',
    DEFAULT_ACCESS_TOKEN: 'gDAN4N12esglrv8ITKMcRghIanHsMy0A-SY227u0nYZ5ahOnI5xS5yQpwmrLEPyn_z_lJKSnkspKfFPn246sKPNLnryrGAfNkutvBZnYZYkDi-5NNrMsSTYgW7DXERDAlwYVVGDb_rohhBno6ZxAIxpFb5ukFwLCWyltGoPPm3luXA0SN7Rv083WpNak3_jjz-Ue3IG9vpE4zwuNLpRAROdRda4gJlLMfPEuQIHu_Mg6ayLaBdFtNVoGfsLbPD96wA7aUajLh1h5jky6R6JNAMdhfm5DS5kYRW'
  },
  production: {
    BASE_URL: 'https://coffee-shop-server-api.herokuapp.com',
    OA_ID: '4318657068771012646'
  }
}

export default config[env];