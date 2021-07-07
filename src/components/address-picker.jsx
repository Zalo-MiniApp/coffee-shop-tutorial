import React, { useState } from 'react';
import { Avatar, Title, Button, Actions, ActionsGroup, ActionsLabel, ActionsButton, Row, Col, Icon } from 'zmp-framework/react';
import pickup from '../../assets-src/pickup.svg'
import delivery from '../../assets-src/delivery.svg'

const AddressPicker = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false)
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Avatar src={pickup} />
      <div style={{ marginLeft: 16 }}>
        <Title style={{ marginBottom: 0 }}>Tự đến lấy tại</Title>
        <div>VNG Campus D7 - Lô Z.06, Đ...</div>
      </div>
      <Button style={{ marginLeft: 'auto' }} fill onClick={() => setShowPicker(true)}>Thay đổi</Button>

      <Actions
        opened={showPicker}
        onActionsClosed={() => setShowPicker(false)}
        onActionsClose={() => {
          console.log("closing");
        }}
        onActionsOpen={() => {
          console.log("opening");
        }}
        onActionsOpened={() => {
          console.log("opened");
        }}
      >
        <ActionsGroup className="address-picker-actions">
          <Icon className="close-button" zmp="zi-close"></Icon>
          <ActionsLabel bold>
            <span className="title">Chọn phương thức nhận hàng</span>
          </ActionsLabel>
          <ActionsButton>
            <Avatar src={pickup} />
            <div className="description">
              <b className="text-primary">Tự đến lấy</b>
              <div className="text-secondary mt-2">VNG Campus D7 - Lô Z.06, Đ...</div>
            </div>
            <Button typeName="secondary" onClick={() => setShowPicker(true)}>Sửa</Button>
          </ActionsButton>
          <ActionsButton className="disabled">
            <Avatar src={delivery} />
            <div className="description">
              <b className="text-primary">Giao tận nơi</b>
              <div className="text-secondary mt-2">Tài xế giao đến địa chỉ của bạn</div>
            </div>
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </div>
  )
};

AddressPicker.displayName = 'zmp-address-picker'

export default AddressPicker;
