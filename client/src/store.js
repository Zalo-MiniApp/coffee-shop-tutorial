
import { createStore } from 'zmp-core/lite'
import { zmp } from 'zmp-framework/react'
import { checkout, getCurrentUser, getPlacedOrders, getProductsByCategory, login } from './services/coffee'
import { loadAddresses, loadProductsFromCache, loadUserFromCache, saveProductsToCache, saveUserToCache } from './services/storage'
import { follow, getAccessToken } from './services/zalo'

const store = createStore({
  state: {
    user: null,
    showCheckout: false,
    shipping: false,
    categories: ['Cà Phê', 'Trà', 'Bánh Ngọt', 'Thức Uống Khác'],
    loadingProducts: true,
    products: [],
    loadingOrders: true,
    orders: [],
    selectedAddress: null,
    shops: [
      {
        selected: true,
        name: 'VNG Campus D7',
        address: 'Lô Z.06 - Đường số 13, KCX Tân Thuận, P. Tân Thuận Đông, Q.7, TP Hồ Chí Minh.',
        open: { hour: 8, minute: 0 },
        close: { hour: 17, minute: 0 }
      }, {
        name: '210 Nguyễn Trãi',
        address: '210 Nguyễn Trãi, Phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh',
        open: { hour: 8, minute: 0 },
        close: { hour: 17, minute: 0 }
      }, {
        name: 'Opera House',
        address: '07 Công Trường Lam Sơn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
        open: { hour: 8, minute: 0 },
        close: { hour: 17, minute: 0 }
      }, {
        name: 'Sài Gòn Tower',
        address: '29 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
        open: { hour: 8, minute: 0 },
        close: { hour: 17, minute: 0 }
      }, {
        name: 'Sala 2',
        address: '125 Nguyễn Cơ Thạch, An Lợi Đông, Quận 2, Thành phố Hồ Chí Minh',
        open: { hour: 8, minute: 0 },
        close: { hour: 17, minute: 0 }
      }
    ],
    cart: [],
    discounts: [
      {
        code: 'GIAM20K',
        name: 'Ưu đãi 20K! Đặt Coffee Shop trên Zalo.',
        expireDate: '10/05/2021',
        image: 'discount-1'
      }, {
        code: 'GIAM35%',
        name: 'Giảm 35% cho đơn hàng từ 5 món, tối đa 59K...',
        expireDate: '10/05/2021',
        image: 'discount-2'
      }, {
        code: 'GIAM30K',
        name: 'Ưu đãi 30K cho đơn hàng 149K - Áp dụng cho dịch ...',
        expireDate: '10/05/2021',
        image: 'discount-3'
      }
    ],
    selectedDiscount: null,
    addresses: [],
    shippingTime: [new Date(), new Date().getHours(), new Date().getMinutes()],
    note: '',
  },
  getters: {
    user({ state }) {
      return state.user
    },
    categories({ state }) {
      return state.categories
    },
    products({ state }) {
      return state.products
    },
    loadingProducts({ state }) {
      return state.loadingProducts
    },
    shops({ state }) {
      return state.shops
    },
    selectedShop({ state }) {
      return state.shops.find(s => s.selected)
    },
    selectedAddress({ state }) {
      return state.selectedAddress
    },
    selectableShops({ state }) {
      return state.shops.filter(s => !s.selected)
    },
    cart({ state }) {
      return state.cart
    },
    totalQuantity({ state }) {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    totalAmount({ state }) {
      return state.cart.reduce((total, item) => total + item.subtotal, 0)
    },
    shipping({ state }) {
      return state.shipping
    },
    showCheckout({ state }) {
      return state.showCheckout
    },
    discounts({ state }) {
      return state.discounts
    },
    selectedDiscount({ state }) {
      return state.selectedDiscount
    },
    orders({ state }) {
      return state.orders
    },
    loadingOrders({ state }) {
      return state.loadingOrders
    },
    address({ state }) {
      return state.address
    },
    shippingTime({ state }) {
      return state.shippingTime
    },
    phone({ state }) {
      return state.phone
    },
    note({ state }) {
      return state.note
    },
    addresses({ state }) {
      return state.addresses
    }
  },
  actions: {
    selectShop({ state }, name) {
      state.shops = state.shops.map(shop => ({
        ...shop,
        selected: shop.name === name
      }))
    },
    selectAddress({ state }, address) {
      state.selectedAddress = address
    },
    addToCart({ state }, item) {
      state.cart = state.cart.concat(item)
    },
    updateCartItem({ state }, { index, item }) {
      state.cart[index] = item
      state.cart = [...state.cart]
    },
    removeCartItem({ state }, index) {
      state.cart = state.cart.filter((item, i) => i !== index)
      if (state.cart.length === 0) {
        state.showCheckout = false
      }
    },
    ship({ state }, value) {
      state.shipping = value
    },
    setShowCheckout({ state }, value) {
      state.showCheckout = value
    },
    useDiscount({ state }, discountCode) {
      state.selectedDiscount = discountCode
      if (state.cart.length > 0) {
        state.showCheckout = true
      }
    },
    setUser({ state }, user) {
      state.user = user
      saveUserToCache(user)
    },
    reOrder({ state }, { cart, phone, note }) {
      state.cart = cart
      state.phone = phone
      state.note = note
      state.showCheckout = true
    },
    setAddress({ state }, value) {
      state.address = value
    },
    setShippingTime({ state }, value) {
      state.shippingTime = value
    },
    setPhone({ state }, value) {
      state.phone = value
    },
    setNote({ state }, value) {
      state.note = value
    },
    async fetchProducts({ state }) {
      state.loadingProducts = true
      const cachedProducts = await loadProductsFromCache()
      if (cachedProducts.length) {
        state.products = cachedProducts
        state.loadingProducts = false
      }
      const products = await getProductsByCategory()
      state.products = products
      saveProductsToCache(products)
      state.loadingProducts = false
    },
    async fetchOrders({ state }) {
      state.loadingOrders = true
      const orders = await getPlacedOrders()
      state.orders = orders
      state.loadingOrders = false
    },
    async fetchAddresses({ state }) {
      const addresses = await loadAddresses()
      state.addresses = addresses
      if (!state.selectedAddress && addresses.length > 0) {
        state.selectedAddress = addresses[addresses.length - 1]
      }
    },
    async checkout({ state }) {
      const { cart, selectedDiscount, shipping, selectedAddress, shippingTime, note } = state
      let shop = null
      if (!shipping) {
        shop = state.shops.find(s => s.selected)
      }
      const result = await checkout({ cart, selectedDiscount, shipping, shop, address: selectedAddress, shippingTime, note })
      if (!result.error) {
        state.showCheckout = false
        state.cart = []
        if (!state.user.isFollowing) {
          zmp.dialog.create({
            title: result.message,
            content:
              'Quan tâm Official Account của Shop để nhận thông tin đặt hàng lần sau?',
            buttons: [
              {
                text: 'Không',
                close: true,
              },
              {
                text: 'Đồng Ý',
                close: true,
                onClick() {
                  follow()
                }
              },
            ],
          }).open()
        } else {
          zmp.toast.create({
            text: result.message,
            closeTimeout: 5000,
            position: 'center'
          }).open()
        }
        zmp.views.main.router.navigate('/history')
      } else {
        zmp.toast.create({
          text: 'Đã có lỗi xảy ra! Mã lỗi :' + result.message,
          closeTimeout: 3000,
          position: 'center'
        }).open()
      }
    },
    async login({ dispatch }) {
      const cachedUser = await loadUserFromCache()
      if (cachedUser) {
        dispatch('setUser', cachedUser)
      }
      const token = await getAccessToken()
      const success = await login(token)
      if (success) {
        const user = await getCurrentUser()
        if (user) {
          dispatch('setUser', user)
        }
      }
    }
  },
})

export default store
