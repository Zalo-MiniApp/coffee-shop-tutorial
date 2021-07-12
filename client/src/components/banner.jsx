import React from 'react';
import backgroundStore from '../../assets-src/background-store.png'

const Banner = () => {
    return <div>
        <img src={backgroundStore} style={{ width: '100%' }} />
    </div>
}

Banner.displayName = 'zmp-banner'

export default Banner;
