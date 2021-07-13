import React from 'react';
import discount1 from '../../assets-src/discount-1.png'
import discount2 from '../../assets-src/discount-2.png'
import discount3 from '../../assets-src/discount-3.png'

const mockImages = {
    'discount-1': discount1,
    'discount-2': discount2,
    'discount-3': discount3
}

const MockImage = ({ image, ...props }) => {
    return <img {...props} src={mockImages[image]} />
}

MockImage.displayName = 'zmp-mock-image'

export default MockImage;
