
import { createStore } from 'zmp-core/lite';
const store = createStore({
  state: {
    showCheckout: false,
    shipping: false,
    categories: ['Cà Phê', 'Trà', 'Bánh Ngọt', 'Thức Uống Khác'],
    products: [{
      id: 1,
      name: 'Phin Đen Đá',
      price: 29000,
      image: "black-coffee",
      sizes: [
        { name: 'S', extra: 0 },
        { name: 'M', extra: 6000 },
        { name: 'L', extra: 10000 }
      ],
      toppings: [
        { name: 'Thạch Vải', extra: 9000 },
        { name: 'Vải', extra: 9000 }
      ]
    },
    {
      id: 2,
      name: 'Phin Sữa Đá',
      price: 29000,
      image: "milk-coffee",
      sizes: [
        { name: 'S', extra: 0 },
        { name: 'M', extra: 6000 },
        { name: 'L', extra: 10000 }
      ],
      toppings: [
        { name: 'Thạch Vải', extra: 9000 },
        { name: 'Vải', extra: 9000 }
      ]
    }],
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
    cart: []
  },
  getters: {
    categories({ state }) {
      return state.categories
    },
    products({ state }) {
      return state.products
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
    }
  },
})

export default store;
