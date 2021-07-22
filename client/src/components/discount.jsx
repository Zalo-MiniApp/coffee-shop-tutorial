import React from 'react'
import { Text, Button, Card, zmp } from 'zmp-framework/react'
import MockImage from '../components/mock-image'
import store from '../store'
import '../css/discount.scss'

const Discount = ({ discount }) => {
  const { image, name, expireDate, code } = discount

  const useDiscount = () => {
    store.dispatch('useDiscount', code).then(() => {
      zmp.toast.create({
        text: 'Đã áp dụng mã ưu đãi ' + code,
        closeTimeout: 3000,
        position: 'center'
      }).open()
      zmp.views.main.router.navigate('/')
    })
  }

  return (
    <Card className="discount-card" inset>
      <MockImage image={image} className="discount-image" />
      <div className="discount-summary">
        <Text bold>{name}</Text>
        <Text className="text-secondary">HSD: {expireDate}</Text>
        <Button fill responsive onClick={useDiscount}>Áp dụng ngay</Button>

        <div className="pie top"></div>
        <div className="pie bottom"></div>
      </div>
    </Card>
  )
}

Discount.displayName = 'zmp-discount'

export default Discount
