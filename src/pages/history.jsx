import React from 'react';
import { Page, Box, Text, Button, zmp } from 'zmp-framework/react';

const History = () => {
  const histories = []

  const backHome = () => {
    zmp.views.main.router.navigate('/')
  }

  return (
    <Page name="history">
      {
        histories.length > 0 ? <></> : <Box style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <Box>
            <Text bold>Bạn chưa có đơn hàng!</Text>
            <Text className="text-secondary mt-4 mb-8">Hãy đặt món để thưởng thức dịch vụ hấp dẫn tại Highlands Coffee nhé!</Text>
            <Button typeName="primary" onClick={backHome} large style={{ width: 200, margin: 'auto' }}>Đặt món ngay</Button>
          </Box>
        </Box>
      }
    </Page>
  );
}
export default History;