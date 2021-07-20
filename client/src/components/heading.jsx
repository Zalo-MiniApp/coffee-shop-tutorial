import React, { useEffect, useState } from 'react';
import api from 'zmp-sdk';
import { Avatar, Text, Button, Actions, ActionsGroup, ActionsLabel, ActionsButton, List, ListItem, Icon, useStore, zmp } from 'zmp-framework/react';
import pickup from '../static/icons/pickup.svg'
import config from '../config'
import { follow } from '../services/zalo';

export const FollowOrMessage = () => {
  const user = useStore('user')

  const message = () => {
    api.openProfile({
      type: 'oa',
      id: config.OA_ID,
      success: () => { },
      fail: (err) => { }
    });
  }

  if (!user) return <></>

  return <>
    {user.isFollowing ? <Button style={{ marginLeft: 16 }} fill onClick={message}>Nhắn tin</Button> : <Button typeName="secondary" style={{ marginLeft: 16 }} onClick={follow}>Theo dõi</Button>}
  </>
}

const Heading = () => {
  const selectedShop = useStore('selectedShop')
  const selectedAddress = useStore('selectedAddress')
  const shipping = useStore('shipping')

  return (
    <List style={{ margin: 0 }}>
      <ListItem>
        <Avatar src={pickup} />
        <div style={{ marginLeft: 16, flex: 1 }}>
          {shipping ?
            <Text bold className="mb-0">Coffee Shop</Text> :
            <Text bold className="mb-0">Coffee Shop</Text>
          }
          <Text className="ellipsis mb-0">
            {selectedShop.name} - {selectedShop.address}
          </Text>
        </div>
        <FollowOrMessage />
      </ListItem>
    </List >
  )
};

Heading.displayName = 'zmp-heading'

export default Heading;
