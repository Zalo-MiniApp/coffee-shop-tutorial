import React, { useEffect } from 'react'
import { Page, Box, Text, Button, zmp, useStore, List, ListItem, Avatar } from 'zmp-framework/react'
import store from '../store'
import Loading from '../components/loading'
import PlacedOrder from '../components/placed-order'

const Heading = () => {
  const user = useStore('user')

  if (!user) return null

  return (
    <List className="m-0">
      <ListItem>
        <Avatar src={user.picture} />
        <div className="flex-1 ml-4">
          <Text bold className="mb-0">{user.name}</Text>
          <Text className="ellipsis mb-0">ID: {user.zaloId}</Text>
        </div>
      </ListItem>
    </List>
  )
}

const Empty = () => <Box className="d-flex h-100 h-center v-center text-center">
  <Box>
    <Text bold>Bạn chưa có đơn hàng!</Text>
    <Text className="text-secondary mt-4 mb-8">Hãy đặt món để thưởng thức dịch vụ hấp dẫn tại Coffee Shop nhé!</Text>
    <Button className="m-auto" typeName="primary" onClick={() => zmp.views.main.router.navigate('/')} large>Đặt món ngay</Button>
  </Box>
</Box>

const Orders = () => {
  const orders = useStore('orders')

  return (
    <Box m={4}>
      <Text bold className="my-4">Lịch sử đơn hàng</Text>
      {orders.map((order) => <Box key={order._id} mx={0} my={2}><PlacedOrder order={order} /></Box>)}
    </Box>
  )
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
  )
}
export default History