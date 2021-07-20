import React, { useMemo, useState } from 'react'
import { Page, Box, Text, Button, Searchbar, zmp, useStore } from 'zmp-framework/react'
import Discount from '../components/discount'

const DiscountPage = () => {
  const discounts = useStore('discounts')

  const backHome = () => {
    zmp.views.main.router.navigate('/')
  }

  const [keyword, setKeyword] = useState('')
  const filteredDiscounts = useMemo(() => {
    if (keyword) {
      return discounts.filter(discount =>
        `${discount.name}`.toLowerCase().includes(keyword.trim().toLowerCase())
      )
    } else {
      return discounts
    }
  }, [keyword, discounts])

  return (
    <Page name="discount">
      {
        discounts.length > 0 ? <Box m={4}>
          <Searchbar value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm mã ưu đãi..." clearButton onSearchbarClear={() => setKeyword('')} />
          <Text bold className="my-4">{filteredDiscounts.length > 0 ? 'Danh sách mã ưu đãi' : 'Không tìm thấy kết quả'}</Text>
          {filteredDiscounts.map((discount) => <Box key={discount.code} mx={0} my={2}><Discount discount={discount} /></Box>)}
        </Box> : <Box className="d-flex h-100 h-center v-center text-center">
          <Box>
            <Text className="text-secondary my-4">Rất tiếc, bạn chưa có mã ưu đãi nào!</Text>
            <Button typeName="secondary" responsive onClick={backHome}>Trở lại</Button>
          </Box>
        </Box>
      }
    </Page>
  )
}
export default DiscountPage