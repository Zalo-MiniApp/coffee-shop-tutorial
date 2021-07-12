import React from 'react';
import blackCoffee from '../../assets-src/black-coffee.png';
import milkCoffee from '../../assets-src/milk-coffee.png'
import discount1 from '../../assets-src/discount-1.png'
import discount2 from '../../assets-src/discount-2.png'
import discount3 from '../../assets-src/discount-3.png'

const productImages = {
    'black-coffee': blackCoffee,
    'milk-coffee': milkCoffee,
    'discount-1': discount1,
    'discount-2': discount2,
    'discount-3': discount3
}

const ProductImage = ({ image, ...props }) => {
    return <img {...props} src={productImages[image]} />
}

ProductImage.displayName = 'zmp-product-image'

export default ProductImage;
