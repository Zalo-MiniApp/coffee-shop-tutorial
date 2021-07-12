import api from 'zmp-sdk';

export const getAccessToken = () => new Promise(resolve => {
  api.login({
    success: async () => {
      api.getAccessToken({
        success: (token) => {
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