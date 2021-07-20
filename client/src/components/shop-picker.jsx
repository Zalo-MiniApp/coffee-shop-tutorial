import React, { useMemo, useState } from 'react'
import { Avatar, Button, Text, ActionsGroup, ActionsLabel, ActionsButton, Row, Col, Icon, Searchbar, useStore, Link, Box } from 'zmp-framework/react'
import shop from '../static/icons/shop.svg'
import store from '../store'

export const Shop = ({ name, address, selected, open, close }) => {
  const padZero = number => String(number).padStart(2, 0)
  const selectShop = () => {
    store.dispatch('selectShop', name)
  }

  const closed = useMemo(() => {
    const now = new Date()
    const hour = now.getHours()
    const minute = now.getMinutes()
    let closed = false
    if (hour < open.hour) {
      closed = true
    } else if (hour === open.hour && minute < open.minute) {
      closed = true
    }
    if (hour > close.hour) {
      closed = true
    } else if (hour === close.hour && minute > close.minute) {
      closed = true
    }
    return closed
  }, [open, close])

  return (
    <ActionsButton className={`bg-white ${selected ? 'active' : 'inactive'}`} onClick={selectShop}>
      <Avatar src={shop} size="24" />
      <div className="description">
        <Text bold fontSize="16">{name}</Text>
        <Text className="text-secondary">{address}</Text>
        <Text>Mở bán từ {padZero(open.hour)}h{padZero(open.minute)} - {padZero(close.hour)}h{padZero(close.minute)}
          {closed && <span className="text-danger"> (Đã đóng cửa)</span>}
        </Text>

      </div>
    </ActionsButton>
  )
}

const ShopPicker = ({ onBack }) => {
  const [keyword, setKeyword] = useState('')
  const selectedShop = useStore('selectedShop')
  const selectableShops = useStore('selectableShops')
  const shops = useMemo(() => {
    if (keyword) {
      return selectableShops.filter(shop =>
        `${shop.name} ${shop.address}`.toLowerCase().includes(keyword.trim().toLowerCase())
      )
    } else {
      return selectableShops
    }
  }, [keyword, selectableShops])

  return (
    <>
      <ActionsGroup>
        <Button typeName="ghost" className="close-button" onClick={onBack}>
          <Icon zmp="zi-arrow-left" size={24}></Icon>
        </Button>
        <ActionsLabel bold>
          <span className="title">Chọn cửa hàng</span>
        </ActionsLabel>
      </ActionsGroup>
      <ActionsGroup>
        <ActionsLabel bold>
          <Searchbar value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm địa chỉ, tên chi nhánh..." clearButton onSearchbarClear={() => setKeyword('')} />
        </ActionsLabel>
        {keyword ? <>
          <ActionsLabel className="p-0">
            <Box>
              {
                shops.length ?
                  <Text bold className="text-left">Kết quả</Text> :
                  <Text bold>Không tìm thấy</Text>
              }
            </Box>
          </ActionsLabel>
          {shops.map(shop => <Shop key={shop.name} {...shop} />)}
        </> : <>
          <ActionsLabel className="p-0">
            <Box>
              <Row>
                <Col width="70" className="text-left">
                  <Text bold className="mb-0">Cửa hàng đang chọn</Text>
                </Col>
                <Col width="30" className="text-right">
                  <Link className="text-primary">
                    Tìm gần nhất
                  </Link>
                </Col>
              </Row>
            </Box>
          </ActionsLabel>
          <Shop {...selectedShop} />
          <ActionsLabel className="p-0">
            <Box className="text-left"><Text bold>Cửa hàng khác</Text></Box>
          </ActionsLabel>
          {shops.map(shop => <Shop key={shop.name} {...shop} />)}
        </>}
      </ActionsGroup>
    </>
  )
}

ShopPicker.displayName = 'zmp-shop-picker'

export default ShopPicker
