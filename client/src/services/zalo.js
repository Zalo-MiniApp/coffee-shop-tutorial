import api from 'zmp-sdk';
import config from '../config';
import store from '../store';

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


export const follow = () => {
  api.followOA({
    id: config.OA_ID,
    success: () => {
      store.dispatch('setUser', {
        ...store.state.user,
        isFollowing: true
      })
      zmp.toast.create({
        text: `Cảm ơn bạn đã theo dõi OA thành công!`,
        closeTimeout: 3000,
      }).open()
      // updateFollowStatus(true) // Không cần gửi status về backend vì mình đã có webhook
    },
    fail: (err) => {
      console.log("Failed to follow OA. Details: ", err)
    }
  })
}