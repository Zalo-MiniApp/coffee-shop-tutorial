import React from 'react';
import { Tabbar, Link, Box, Text, Button, useStore } from 'zmp-framework/react';
import { Price } from './prices'
import cup from '../../assets-src/cup.svg'
import discount from '../../assets-src/discount.svg'
import history from '../../assets-src/history.svg'
import Checkout from './checkout'

const BottomNavigation = () => {
    const totalQuantity = useStore('totalQuantity')
    const totalAmount = useStore('totalAmount')

    return <div className="bottom-navigation">
        {totalQuantity > 0 && <div className="cart">
            <Box>
                <Price fontSize={20} bold amount={totalAmount} className="mb-0" />
                <Text className="text-secondary">Bạn có {totalQuantity} món trong giỏ hàng.</Text>
            </Box>
            <Box style={{ textAlign: 'right' }}>
                <Checkout>
                    <Button fill large>Giỏ hàng</Button>
                </Checkout>
            </Box>
        </div>}
        <Tabbar bottom>
            <Link className="active">
                <img src={cup} />
                Đặt món
            </Link>
            <Link>
                <img src={discount} />
                Ưu đãi
            </Link>
            <Link>
                <img src={history} />
                Lịch sử
            </Link>
        </Tabbar>
    </div>;
}

BottomNavigation.displayName = 'zmp-bottom-navigation'

export default BottomNavigation;
