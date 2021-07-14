import React from 'react';
import { Text, Box, Button, Card, zmp } from 'zmp-framework/react';
import store from '../store';
import { Price } from './prices'

const PlacedOrder = ({ order }) => {
    const { cart, createdAt, selectedDiscount, total, shipping, shop, address } = order

    const reOrder = () => {
        store.dispatch('reOrder', order)
    }

    return <Card className="discount-card" className="discount-card" inset>
        <img className="discount-image" src={cart[0].product.image} />
        <div className="discount-summary">
            <Text className="text-secondary">
                {new Date(createdAt).toLocaleDateString()} - {new Date(createdAt).toLocaleTimeString()}
            </Text>
            <Text bold>{shipping ? address : shop.name}</Text>
            <div style={{ display: 'flex' }}>
                <Price bold amount={total} />
                {selectedDiscount && <Text className="text-secondary">&nbsp;- {selectedDiscount}</Text>}
            </div>
            <Button fill responsive onClick={reOrder}>Đặt lại</Button>
        </div>
    </Card>
}

PlacedOrder.displayName = 'zmp-placed-order'

export default PlacedOrder;
