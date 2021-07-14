import React, { useEffect, useState } from 'react';
import api from 'zmp-sdk';
import { Avatar, Text, Button, Actions, ActionsGroup, ActionsLabel, ActionsButton, List, ListItem, Icon, useStore, zmp } from 'zmp-framework/react';
import pickup from '../../assets-src/pickup.svg'
import delivery from '../../assets-src/delivery.svg'
import ShopPicker from './shop-picker';
import store from '../store';
import { isFollowed, saveFollowStatus } from '../services/storage';
import config from '../config'
import { updateFollowStatus } from '../services/coffee';

const Heading = () => {
  const user = useStore('user')
  const selectedShop = useStore('selectedShop')
  const shipping = useStore('shipping')

  const followed = useStore('followedOA')
  const setFollowed = (value) => {
    store.dispatch('setFollowedOA', value)
  }
  useEffect(() => {
    isFollowed().then(status => setFollowed(status))
  }, [])

  const follow = () => {
    api.followOA({
      id: config.OA_ID,
      success: () => {
        setFollowed(true)
        zmp.toast.create({
          text: `Cảm ơn bạn đã theo dõi OA thành công!`,
          closeTimeout: 3000,
        }).open()
        saveFollowStatus(true) // zmp storage
        updateFollowStatus(true) // backend database
      },
      fail: (err) => {
        console.log("Failed to follow OA. Details: ", err)
      }
    })
  }

  const message = () => {
    api.openProfile({
      type: 'oa',
      id: config.OA_ID,
      success: () => { },
      fail: (err) => { }
    });
  }

  return (
    <List style={{ margin: 0 }}>
      <ListItem>
        <Avatar src={user ? user.picture : (shipping ? delivery : pickup)} />
        {shipping ? <>
          <div style={{ marginLeft: 16 }}>
            <Text bold className="mb-0">Coffee Shop</Text>
            <Text className="ellipsis mb-0">
              Tài xế giao đến địa chỉ của bạn
            </Text>
          </div>
        </> : <>
          <div style={{ marginLeft: 16 }}>
            <Text bold className="mb-0">Coffee Shop</Text>
            <Text className="ellipsis mb-0">
              {selectedShop.name} - {selectedShop.address}
            </Text>
          </div>
        </>}
        {followed ? <Button style={{ marginLeft: 16 }} fill onClick={message}>Nhắn tin</Button> : <Button typeName="secondary" style={{ marginLeft: 16 }} onClick={follow}>Theo dõi</Button>}
      </ListItem>
    </List>
  )
};

Heading.displayName = 'zmp-heading'

export default Heading;
