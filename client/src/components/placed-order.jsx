import React from 'react';
import { Text, Box, Button, Card, zmp } from 'zmp-framework/react';
import store from '../store';
import { Price } from './prices'

const PlacedOrder = ({ order }) => {
    const { cart, createdAt, selectedDiscount, total, shipping, shop, address } = order

    const reOrder = () => {
        store.dispatch('reOrder', cart)
    }

    return <Card inset className="pt-0">
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
            {cart.map((item, i) => <Box key={i} style={{ textAlign: 'center' }}>
                <img src={item.product.image} style={{ width: 50 }} />
                <Text className="mb-0" bold>
                    <span style={{ color: '#B22830' }}>x{item.quantity}</span>
                </Text>
            </Box>)}
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Box style={{ flex: 1 }}>
                <Text className="text-secondary">Giao đến</Text>
                <Text>
                    {shipping ? address : shop.name}
                </Text>
                <Text className="text-secondary">
                    {new Date(createdAt).toLocaleDateString()} - {new Date(createdAt).toLocaleTimeString()}
                </Text>
            </Box>
            <Box style={{ flex: 'none', textAlign: 'right' }}>
                <Text className="text-secondary">Tổng cộng</Text>
                <Price bold amount={total} />
                {selectedDiscount && <Text className="text-secondary">{selectedDiscount}</Text>}
            </Box>
        </Box>
        <Button fill responsive onClick={reOrder}>Đặt lại</Button>
    </Card>
}

PlacedOrder.displayName = 'zmp-placed-order'

export default PlacedOrder;
