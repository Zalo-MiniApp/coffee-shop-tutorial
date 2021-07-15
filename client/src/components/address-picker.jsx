import React, { useEffect, useState } from 'react';
import { Avatar, Text, Button, Actions, ActionsGroup, ActionsLabel, ActionsButton, List, ListItem, Icon, useStore } from 'zmp-framework/react';
import pickup from '../../assets-src/pickup.svg'
import delivery from '../../assets-src/delivery.svg'
import ShopPicker from './shop-picker';
import store from '../store';

const AddressPicker = ({ children, onReturn, onOpen }) => {
  const [showPicker, setShowPicker] = useState(false)
  const selectedShop = useStore('selectedShop')
  const shipping = useStore('shipping')

  const [mode, setMode] = useState()
  useEffect(() => {
    setMode('address')
  }, [showPicker])
  const selectShop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setMode('shop')
  }

  return <>
    <div onClick={() => setShowPicker(true)}>{children}</div>
    <Actions
      className="address-picker-actions"
      opened={showPicker}
      onActionsClosed={() => setShowPicker(false)}
      onActionsClose={() => {
        if (mode === 'shop') {
          setMode('address')
        } else if (onReturn) {
          onReturn()
        }
      }}
      onActionsOpen={() => {
        if (onOpen) {
          onOpen()
        }
      }}
    > {
        mode === 'address' ? <>
          <ActionsGroup>
            <Button typeName="ghost" className="close-button" onClick={() => setShowPicker(false)}>
              <Icon zmp="zi-close" size={24}></Icon>
            </Button>
            <ActionsLabel bold>
              <span className="title">Chọn phương thức nhận hàng</span>
            </ActionsLabel>
          </ActionsGroup>
          <ActionsGroup>
            <ActionsButton className={shipping ? 'inactive' : 'active'} onClick={() => store.dispatch('ship', false)}>
              <Avatar src={pickup} />
              <div className="description mr-2">
                <Text bold fontSize="16" className="text-primary my-1">Tự đến lấy</Text>
                <Text className="text-secondary ellipsis">
                  {selectedShop.name} - {selectedShop.address}
                </Text>
              </div>
              <Button typeName="secondary" onClick={selectShop}>Sửa</Button>
            </ActionsButton>
            <ActionsButton className={shipping ? 'active' : 'inactive'} onClick={() => store.dispatch('ship', true)}>
              <Avatar src={delivery} />
              <div className="description">
                <Text bold fontSize="16" className="text-primary my-1">Giao tận nơi</Text>
                <Text className="text-secondary">Tài xế giao đến địa chỉ của bạn</Text>
              </div>
            </ActionsButton>
          </ActionsGroup></> : <ShopPicker onBack={() => setMode('address')} />
      }
    </Actions>
  </>
};

AddressPicker.displayName = 'zmp-address-picker'

export default AddressPicker;
