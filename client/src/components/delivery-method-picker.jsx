import React, { useEffect, useState } from 'react'
import { Avatar, Text, Button, Actions, ActionsGroup, ActionsLabel, ActionsButton, Icon, useStore } from 'zmp-framework/react'
import pickup from '../static/icons/pickup.svg'
import delivery from '../static/icons/delivery.svg'
import ShopPicker from './shop-picker'
import store from '../store'
import AddressPicker from './address-picker'

const DeliveryMethodPicker = ({ children, onReturn, onOpen }) => {
  const [showPicker, setShowPicker] = useState(false)
  const selectedShop = useStore('selectedShop')
  const selectedAddress = useStore('selectedAddress')
  const shipping = useStore('shipping')

  const [mode, setMode] = useState()
  useEffect(() => {
    setMode('summary')
  }, [showPicker])
  const showDetail = (e, shipping) => {
    e.preventDefault()
    e.stopPropagation()
    setMode('detail')
    store.dispatch('ship', shipping)
  }
  useEffect(() => {
    store.dispatch('fetchAddresses')
  }, [])

  const handleShipping = () => {
    store.dispatch('ship', true)
    if (selectedAddress) {
      setShowPicker(false)
      onReturn()
    } else {
      setMode('detail')
    }
  }

  return (
    <>
      <div onClick={() => setShowPicker(true)}>{children}</div>
      <Actions
        className="custom-action-sheet"
        opened={showPicker}
        onActionsClosed={() => setShowPicker(false)}
        onActionsClose={() => {
          if (mode === 'detail') {
            setMode('summary')
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
          mode === 'summary' ? <>
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
                <Button typeName="secondary" onClick={e => showDetail(e, false)}>Sửa</Button>
              </ActionsButton>
              <ActionsButton className={shipping ? 'active' : 'inactive'} onClick={handleShipping} close={false}>
                <Avatar src={delivery} />
                <div className="description">
                  <Text bold fontSize="16" className="text-primary my-1">Giao tận nơi</Text>
                  {selectedAddress ? <>
                    <Text className="mb-0" bold>{selectedAddress.name} - {selectedAddress.phone}</Text>
                    <Text>{selectedAddress.address}</Text>
                  </> : <Text className="text-secondary">Tài xế giao đến địa chỉ của bạn</Text>}
                </div>
                <Button typeName="secondary" onClick={e => showDetail(e, true)}>Sửa</Button>
              </ActionsButton>
            </ActionsGroup></> : (shipping ? <AddressPicker onBack={() => setMode('summary')} /> : <ShopPicker onBack={() => setMode('summary')} />)
        }
      </Actions>
    </>
  )
}

DeliveryMethodPicker.displayName = 'zmp-delivery-method-picker'

export default DeliveryMethodPicker
