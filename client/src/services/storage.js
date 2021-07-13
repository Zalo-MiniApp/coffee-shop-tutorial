import api from 'zmp-sdk';

export const saveToken = token => api.setStorage({
  data: { token },
  fail: (error) => console.log('Failed to save token to storage. Details: ', error)
})

export const loadToken = () => new Promise(resolve => {
  api.getStorage({
    keys: ['token'],
    success: ({ token }) => {
      resolve(token)
    },
    fail: (error) => {
      console.log('Failed to get token from storage. Details: ', error)
      resolve(null)
    }
  })
})

export const saveFollowStatus = status => api.setStorage({
  data: { followed: status },
  fail: (error) => console.log('Failed to save follow status to storage. Details: ', error)
})

export const isFollowed = () => new Promise(resolve => {
  api.getStorage({
    keys: ['followed'],
    success: ({ followed }) => {
      resolve(followed)
    },
    fail: (error) => {
      console.log('Failed to get follow status from storage. Details: ', error)
      resolve(false)
    }
  })
})