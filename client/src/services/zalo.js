import api from 'zmp-sdk';
import config from '../config';

export const getAccessToken = () => new Promise(resolve => {
  api.login({
    success: async () => {
      api.getAccessToken({
        success: (token) => {
          if (token === 'DEFAULT ACCESS TOKEN' && config.DEV_TOKEN) {
            token = config.DEV_TOKEN
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