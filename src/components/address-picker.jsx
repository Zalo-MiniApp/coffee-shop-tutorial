import React, { useState } from 'react';
import { Avatar, Text, Button, Actions, ActionsGroup, ActionsLabel, ActionsButton, Row, Col, Icon, useStore } from 'zmp-framework/react';
import pickup from '../../assets-src/pickup.svg'
import delivery from '../../assets-src/delivery.svg'
import ShopPicker from './shop-picker';
import store from '../store';

const AddressPicker = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false)
  const selectedShop = useStore('selectedShop')
  const shipping = useStore('shipping')

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {shipping ? <>
        <Avatar src={delivery} />
        <div style={{ marginLeft: 16 }}>
          <Text bold className="mb-0">Giao tận nơi</Text>
          <Text className="ellipsis mb-0">
            Tài xế giao đến địa chỉ của bạn
          </Text>
        </div>
      </> : <>
        <Avatar src={pickup} />
        <div style={{ marginLeft: 16 }}>
          <Text bold className="mb-0">Tự đến lấy tại</Text>
          <Text className="ellipsis mb-0">
            {selectedShop.name} - {selectedShop.address}
          </Text>
        </div>
      </>}
      <Button style={{ marginLeft: 16 }} fill onClick={() => setShowPicker(true)}>Thay đổi</Button>

      <Actions
        opened={showPicker}
        onActionsClosed={() => setShowPicker(false)}
      >
        <ActionsGroup className="address-picker-actions">
          <Button typeName="ghost" className="close-button" onClick={() => setShowPicker(false)}>
            <Icon zmp="zi-close" size={24}></Icon>
          </Button>
          <ActionsLabel bold>
            <span className="title">Chọn phương thức nhận hàng</span>
          </ActionsLabel>
          <ActionsButton className={shipping ? 'inactive' : 'active'} onClick={() => store.dispatch('ship', false)}>
            <Avatar src={pickup} />
            <div className="description mr-2">
              <Text bold fontSize="16" className="text-primary my-1">Tự đến lấy</Text>
              <Text className="text-secondary ellipsis">
                {selectedShop.name} - {selectedShop.address}
              </Text>
            </div>
            <ShopPicker onReturn={() => setShowPicker(true)}>
              <Button typeName="secondary">Sửa</Button>
            </ShopPicker>
          </ActionsButton>
          <ActionsButton className={shipping ? 'active' : 'inactive'} onClick={() => store.dispatch('ship', true)}>
            <Avatar src={delivery} />
            <div className="description">
              <Text bold fontSize="16" className="text-primary my-1">Giao tận nơi</Text>
              <Text className="text-secondary">Tài xế giao đến địa chỉ của bạn</Text>
            </div>
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </div>
  )
};

AddressPicker.displayName = 'zmp-address-picker'

export default AddressPicker;
