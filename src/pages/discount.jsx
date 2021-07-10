import React from 'react';
import { Page, Box, Text, Button, zmp } from 'zmp-framework/react';

const Discount = () => {
  const discounts = []

  const backHome = () => {
    zmp.views.main.router.navigate('/')
  }

  return (
    <Page name="discount">
      {
        discounts.length > 0 ? <></> : <Box style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <Box>
            <Text className="text-secondary my-4">Rất tiếc, bạn chưa có mã ưu đãi nào!</Text>
            <Button typeName="secondary" responsive onClick={backHome}>Trở lại</Button>
          </Box>
        </Box>
      }
    </Page>
  );
}
export default Discount;