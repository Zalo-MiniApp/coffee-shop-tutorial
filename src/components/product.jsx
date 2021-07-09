import React from 'react';
import { Card, Text } from 'zmp-framework/react';
import { Price } from './prices';
import ProductImage from './product-image';
import ProductOrder from './product-order';

const Product = (props) => {
    const { name, price, image } = props
    return <ProductOrder product={props}>
        <Card inset style={{ textAlign: 'center' }}>
            <ProductImage image={image} style={{ width: '100%' }} />
            <Text bold>{name}</Text>
            <Price className="text-secondary" amount={price} />
        </Card>
    </ProductOrder>

}

Product.displayName = 'zmp-product'

export default Product;
