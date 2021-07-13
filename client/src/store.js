
import { createStore } from 'zmp-core/lite';
import { zmp } from 'zmp-framework/react';
import { getCurrentUser, getProductsByCategory, login } from './services/coffee';
import { getAccessToken } from './services/zalo';

const store = createStore({
  state: {
    showCheckout: false,
    shipping: false,
    categories: ['Cà Phê', 'Trà', 'Bánh Ngọt', 'Thức Uống Khác'],
    loadingProducts: true,
    products: [],
    shops: [{
      selected: true,
      name: 'VNG Campus D7',
      address: 'Lô Z.06 - Đường số 13, KCX Tân Thuận, P. Tân Thuận Đông, Q.7, TP Hồ Chí Minh.',
      open: {
        hour: 8,
        minute: 0
      },
      close: {
        hour: 17,
        minute: 0
      }
    }, {
      name: '210 Nguyễn Trãi',
      address: '210 Nguyễn Trãi, Phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh',
      open: {
        hour: 8,
        minute: 0
      },
      close: {
        hour: 17,
        minute: 0
      }
    }, {
      name: 'Opera House',
      address: '07 Công Trường Lam Sơn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
      open: {
        hour: 8,
        minute: 0
      },
      close: {
        hour: 17,
        minute: 0
      }
    }, {
      name: 'Sài Gòn Tower',
      address: '29 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
      open: {
        hour: 8,
        minute: 0
      },
      close: {
        hour: 17,
        minute: 0
      }
    }, {
      name: 'Sala 2',
      address: '125 Nguyễn Cơ Thạch, An Lợi Đông, Quận 2, Thành phố Hồ Chí Minh',
      open: {
        hour: 8,
        minute: 0
      },
      close: {
        hour: 17,
        minute: 0
      }
    }],
    cart: [],
    discounts: [{
      code: 'GIAM20K',
      name: 'Ưu đãi 20K! Đặt Highlands Coffee trên Zalo.',
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
    }],
    selectedDiscount: null
  },
  getters: {
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
      return state.shops;
    },
    selectedShop({ state }) {
      return state.shops.find(s => s.selected)
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
    }
  },
  actions: {
    selectShop({ state }, name) {
      state.shops = state.shops.map(shop => ({
        ...shop,
        selected: shop.name === name
      }))
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
    async fetchProducts({ state }) {
      state.loadingProducts = true
      const products = await getProductsByCategory()
      state.products = products
      state.loadingProducts = false
    },
    async login({ state }) {
      const token = await getAccessToken()
      const success = await login(token)
      if (success) {
        const user = await getCurrentUser()
        if (user) {
          zmp.toast.create({
            text: `Chào mừng bạn quay trở lại, ${user.name}`,
            closeTimeout: 3000,
          }).open()
        }
      }
    }
  },
})

export default store;
