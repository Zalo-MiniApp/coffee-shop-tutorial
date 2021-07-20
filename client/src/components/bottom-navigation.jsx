import React, { useEffect, useState } from 'react'
import { Tabbar, Link, Box, Text, Button, useStore, zmp } from 'zmp-framework/react'
import { Price } from './prices'
import cup from '../static/icons/cup.svg'
import discount from '../static/icons/discount.svg'
import history from '../static/icons/history.svg'
import Checkout from './checkout'
import '../css/bottom-navigation.scss'

const BottomNavigation = () => {
  const totalQuantity = useStore('totalQuantity')
  const totalAmount = useStore('totalAmount')
  const [currentPath, setCurrentPath] = useState()

  zmp.views.main.router.on('routeChange', ({ path }) => {
    setCurrentPath(path)
  })

  const links = [
    { name: 'Đặt món', href: '/', icon: cup },
    { name: 'Ưu đãi', href: '/discount', icon: discount },
    { name: 'Lịch sử', href: '/history', icon: history },
  ]

  useEffect(() => {
    if (totalQuantity > 0) {
      document.body.classList.add('has-cart')
    } else {
      document.body.classList.remove('has-cart')
    }
  }, [totalQuantity])

  const navigateWithoutAnimation = path => {
    zmp.views.main.router.navigate(path, {
      animate: false
    })
  }

  return (
    <div className="bottom-navigation">
      {totalQuantity > 0 && <div className="cart">
        <Box>
          <Price fontSize={20} bold amount={totalAmount} className="mb-0" />
          <Text className="text-secondary">Bạn có {totalQuantity} món trong giỏ hàng.</Text>
        </Box>
        <Box className="text-right">
          <Checkout>
            <Button fill large>Giỏ hàng</Button>
          </Checkout>
        </Box>
      </div>}
      <Tabbar bottom>
        {links.map(({ name, icon, href }) => <Link key={href} className={href === currentPath ? 'active' : 'inactive'} onClick={() => navigateWithoutAnimation(href)}>
          <img src={icon} />
          {name}
        </Link>)}
      </Tabbar>
    </div>
  )
}

BottomNavigation.displayName = 'zmp-bottom-navigation'

export default BottomNavigation
