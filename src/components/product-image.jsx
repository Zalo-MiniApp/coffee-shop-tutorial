import React from 'react';
import blackCoffee from '../../assets-src/black-coffee.png';
import milkCoffee from '../../assets-src/milk-coffee.png'

const productImages = {
    'black-coffee': blackCoffee,
    'milk-coffee': milkCoffee
}

const ProductImage = ({ image, ...props }) => {
    return <img {...props} src={productImages[image]} />
}

ProductImage.displayName = 'zmp-product-image'

export default ProductImage;
