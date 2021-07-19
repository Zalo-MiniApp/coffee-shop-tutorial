import React, { useEffect } from 'react';
import { Page, Box, Text, Button, zmp, useStore, SkeletonText, SkeletonBlock, Row, Col, Searchbar, List, ListItem, Avatar } from 'zmp-framework/react';
import store from '../store';
import Loading from '../components/loading'
import PlacedOrder from '../components/placed-order';

const Heading = () => {
  const user = useStore('user')

  if (!user) {
    return <></>
  }

  return (
    <List style={{ margin: 0 }}>
      <ListItem>
        <Avatar src={user.picture} />
        <div style={{ marginLeft: 16, flex: 1 }}>
          <Text bold className="mb-0">{user.name}</Text>
          <Text className="ellipsis mb-0">ID: {user.zaloId}</Text>
        </div>
      </ListItem>
    </List>
  )
};

const Empty = () => <Box style={{ height: 'calc(100% - 96px)', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
  <Box>
    <Text bold>Bạn chưa có đơn hàng!</Text>
    <Text className="text-secondary mt-4 mb-8">Hãy đặt món để thưởng thức dịch vụ hấp dẫn tại Highlands Coffee nhé!</Text>
    <Button typeName="primary" onClick={() => zmp.views.main.router.navigate('/')} large style={{ width: 200, margin: 'auto' }}>Đặt món ngay</Button>
  </Box>
</Box>

const Orders = () => {
  const orders = useStore('orders')

  return <Box m={4}>
    <Text bold className="my-4">Lịch sử đơn hàng</Text>
    {orders.map((order) => <Box key={order._id} mx={0} my={2}><PlacedOrder order={order} /></Box>)}
  </Box>
}

const History = () => {

  const orders = useStore('orders')
  const loading = useStore('loadingOrders')

  useEffect(() => {
    store.dispatch('fetchOrders')
  }, [])

  return (
    <Page name="history">
      <Heading />
      {loading ? <Loading /> : <>
        {
          orders.length > 0 ? <Orders /> : <Empty />
        }
      </>}
    </Page>
  );
}
export default History;