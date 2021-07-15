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

export const loadAddresses = () => new Promise(resolve => {
  api.getStorage({
    keys: ['addresses'],
    success: ({ addresses }) => {
      if (addresses) {
        if (!addresses.filter) {
          addresses = JSON.parse(addresses)
        }
        if (addresses.filter) {
          return resolve(addresses.filter(a => !!a && !!a.address))
        }
      }
      resolve([])
    },
    fail: (error) => {
      console.log('Failed to get addresses from storage. Details: ', error)
      resolve([])
    }
  })
})

export const saveAddress = async address => {
  const addresses = await loadAddresses()
  addresses.push(address)
  api.setStorage({
    data: { addresses },
    fail: (error) => console.log('Failed to save new address to storage. Details: ', error)
  })
  return addresses
}