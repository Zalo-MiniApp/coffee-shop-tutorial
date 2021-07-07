import React from 'react';
import { Tabbar, Link } from 'zmp-framework/react';
import cup from '../../assets-src/cup.svg'
import discount from '../../assets-src/discount.svg'
import history from '../../assets-src/history.svg'

const BottomNavigation = () => {
    return <Tabbar bottom style={{ position: 'fixed', height: 80 }}>
        <Link>
            <img src={cup} />
            <span className="text-primary">Đặt món</span>
        </Link>
        <Link>
            <img src={discount} />
            Ưu đãi
        </Link>
        <Link>
            <img src={history} />
            Lịch sử
        </Link>
    </Tabbar>;
}

BottomNavigation.displayName = 'zmp-bottom-navigation'

export default BottomNavigation;
