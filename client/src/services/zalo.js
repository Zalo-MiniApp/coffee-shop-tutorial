import api from 'zmp-sdk';
import config from '../config';

export const getAccessToken = () => new Promise(resolve => {
  api.login({
    success: async () => {
      api.getAccessToken({
        success: (token) => {
          if (token === 'DEFAULT ACCESS TOKEN' && config.DEFAULT_ACCESS_TOKEN) {
            token = config.DEFAULT_ACCESS_TOKEN
          }
          resolve(token)
        },
        fail: (error) => {
          console.error(error)
        }
      });
    },
    fail: (error) => {
      console.error(error)
    }
  });
})