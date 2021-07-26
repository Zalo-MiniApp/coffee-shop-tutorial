import React from 'react'
import {
  zmpready,
  App,
  View,
} from 'zmp-framework/react'
import store from '../store'
import BottomNavigation from './bottom-navigation'

const MyApp = () => {

  // ZMP Parameters
  const zmpparams = {
    name: 'Coffee Shop', // App name
    theme: 'auto', // Automatic theme detection
    // App store
    store: store,
  }

  zmpready(() => {
    // Call ZMP APIs here
    store.dispatch('login')
  })

  return (
    <App {...zmpparams} >

      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />
      <BottomNavigation />
    </App>
  )
}
export default MyApp