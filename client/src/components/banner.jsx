import React from 'react';
import backgroundStore from '../../assets-src/background-store.png'

const Banner = () => {
    return <img src={backgroundStore} style={{ width: '100%' }} />
}

Banner.displayName = 'zmp-banner'

export default Banner;
