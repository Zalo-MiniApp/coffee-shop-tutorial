import React from 'react';
import { Card, Text } from 'zmp-framework/react';
import blackCoffee from '../../assets-src/black-coffee.png'

const Product = () => {
    return <div>
        <Card inset style={{ textAlign: 'center' }}>
            <img src={blackCoffee} style={{ width: '100%' }} />
            <Text bold>Phin Đen Đá</Text>
            <Text>29,000 VNĐ</Text>
        </Card>
    </div>
}

Product.displayName = 'zmp-product'

export default Product;
