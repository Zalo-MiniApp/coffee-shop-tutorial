import React from 'react'
import { Text, useStore } from 'zmp-framework/react'
import backgroundStore from '../static/images/background-store.png'
import '../css/banner.scss'

const Banner = () => {
  const selectedShop = useStore('selectedShop')
  const { open, close } = selectedShop
  const padZero = number => String(number).padStart(2, 0)

  return (
    <div className="banner">
      <img src={backgroundStore} />
      <Text className="open-time">Giờ mở cửa: {padZero(open.hour)}h{padZero(open.minute)} - {padZero(close.hour)}h{padZero(close.minute)}</Text>
    </div>
  )
}

Banner.displayName = 'zmp-banner'

export default Banner
