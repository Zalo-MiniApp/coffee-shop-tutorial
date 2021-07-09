import React, { useMemo, useState } from 'react';
import { Avatar, Button, Text, Actions, ActionsGroup, ActionsLabel, ActionsButton, Row, Col, Icon, Searchbar, useStore, Link, Box } from 'zmp-framework/react';
import shop from '../../assets-src/shop.svg'
import store from '../store'

export const Shop = ({ name, address, selected, open, close }) => {
  const padZero = number => String(number).padStart(2, 0)
  const selectShop = () => {
    store.dispatch('selectShop', name)
  }

  return <ActionsButton className={selected ? 'active' : 'inactive'} style={{ backgroundColor: 'white' }} onClick={selectShop}>
    <Avatar src={shop} size="24" />
    <div className="description">
      <Text bold fontSize="16">{name}</Text>
      <Text className="text-secondary">{address}</Text>
      <Text>Mở bán từ {padZero(open.hour)}h{padZero(open.minute)} - {padZero(close.hour)}h{padZero(close.minute)}</Text>
    </div>
  </ActionsButton>
}

const ShopPicker = ({ value, onChange, children, onReturn }) => {
  const [showPicker, setShowPicker] = useState(false)
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
      <div onClick={() => setShowPicker(true)}>{children}</div>
      <Actions
        opened={showPicker}
        onActionsClosed={() => setShowPicker(false)}
        onActionsClose={() => {
          if (onReturn) {
            onReturn()
          }
        }}
        onActionsOpen={() => {
          console.log("opening");
        }}
        onActionsOpened={() => {
          console.log("opened");
        }}
      >
        <ActionsGroup className="address-picker-actions">
          <Button typeName="ghost" className="close-button" onClick={() => setShowPicker(false)}>
            <Icon zmp="zi-arrow-left" size={24}></Icon>
          </Button>
          <ActionsLabel bold>
            <span className="title">Chọn cửa hàng</span>
          </ActionsLabel>
          <ActionsLabel bold>
            <Searchbar value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="Tìm địa chỉ, tên chi nhánh..." clearButton />
          </ActionsLabel>
          {keyword ? <>
            <ActionsLabel className="p-0">
              <Box>
                {
                  shops.length ?
                    <Text bold style={{ textAlign: 'left' }}>Kết quả</Text> :
                    <Text bold>Không tìm thấy</Text>
                }
              </Box>
            </ActionsLabel>
            {shops.map(shop => <Shop key={shop.name} {...shop} />)}
          </> : <>
            <ActionsLabel className="p-0">
              <Box>
                <Row>
                  <Col width="70" style={{ textAlign: 'left' }}>
                    <Text bold className="mb-0">Cửa hàng đang chọn</Text>
                  </Col>
                  <Col width="30" style={{ textAlign: 'right' }}>
                    <Link className="text-primary">
                      Tìm gần nhất
                    </Link>
                  </Col>
                </Row>
              </Box>
            </ActionsLabel>
            <Shop {...selectedShop} />
            <ActionsLabel className="p-0">
              <Box style={{ textAlign: 'left' }}><Text bold>Cửa hàng khác</Text></Box>
            </ActionsLabel>
            {shops.map(shop => <Shop key={shop.name} {...shop} />)}
          </>}
        </ActionsGroup>
      </Actions>
    </>
  )
};

ShopPicker.displayName = 'zmp-shop-picker'

export default ShopPicker;
