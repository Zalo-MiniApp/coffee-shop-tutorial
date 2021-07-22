import React from 'react'
import { Text, Button, Card, zmp } from 'zmp-framework/react'
import store from '../store'
import { Price } from './prices'
import '../css/discount.scss'

const PlacedOrder = ({ order }) => {
  const { cart, createdAt, selectedDiscount, total, shipping, shop, address } = order

  const reOrder = () => {
    zmp.views.main.router.navigate('/')
    store.dispatch('reOrder', order)
  }

  return (
    <Card className="discount-card" inset>
      <img className="discount-image" src={cart[0].product.image} />
      <div className="discount-summary">
        <Text className="text-secondary">
          {new Date(createdAt).toLocaleDateString()} - {new Date(createdAt).toLocaleTimeString()}
        </Text>
        {shipping ?
          (address && <>
            <Text bold>{address.name} - {address.phone}</Text>
            <Text>{address.address}</Text></>
          ) :
          <Text bold>{shop.name}</Text>
        }
        <div className="d-flex">
          <Price bold amount={total} />
          {selectedDiscount && <Text className="text-secondary">&nbsp;- {selectedDiscount}</Text>}
        </div>
        <Button fill responsive onClick={reOrder}>Đặt lại</Button>
      </div>
    </Card>
  )
}

PlacedOrder.displayName = 'zmp-placed-order'

export default PlacedOrder
