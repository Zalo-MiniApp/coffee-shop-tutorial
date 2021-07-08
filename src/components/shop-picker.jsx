import React, { useMemo, useState } from 'react';
import { Avatar, Button, Text, Actions, ActionsGroup, ActionsLabel, ActionsButton, Row, Col, Icon, Searchbar, useStore } from 'zmp-framework/react';
import shop from '../../assets-src/shop.svg'
import store from '../store'

const Shop = ({ name, address, selected, open, close }) => {
  const padZero = number => String(number).padStart(2, 0)
  const selectShop = () => {
    store.dispatch('selectShop', name)
  }

  return <ActionsButton className={selected ? 'active' : 'inactive'} style={{ backgroundColor: 'white' }} onClick={selectShop}>
    <Avatar src={shop} size="24" />
    <div className="description">
      <Text bold fontSize="16">{name}</Text>
      <div className="text-secondary mt-2">{address}</div>
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
            <ActionsLabel>
              <Row>
                <Col style={{ textAlign: 'left' }}>
                  <Text bold className="mb-0">Kết quả</Text>
                </Col>
              </Row>
            </ActionsLabel>
            {shops.map(shop => <Shop key={shop.name} {...shop} />)}
          </> : <>
            <ActionsLabel>
              <Row>
                <Col width="70" style={{ textAlign: 'left' }}>
                  <Text bold className="mb-0">Cửa hàng đang chọn</Text>
                </Col>
                <Col width="30" style={{ textAlign: 'right' }}>
                  <a className="text-primary">
                    Tìm gần nhất
                  </a>
                </Col>
              </Row>
            </ActionsLabel>
            <Shop {...selectedShop} />
            <ActionsLabel>
              <Row>
                <Col style={{ textAlign: 'left' }}>
                  <Text bold className="mb-0">Cửa hàng khác</Text>
                </Col>
              </Row>
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
