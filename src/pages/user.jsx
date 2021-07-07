import React from 'react'

import { Avatar, Button, List, ListItem, Page, Title, useStore } from 'zmp-framework/react'
import NavbarBack from '../components/navbar-back'

const UserPage = () => {
  const user = useStore('user')

  return (
    <Page name="user">
      <NavbarBack
        title="User info"
        linkRight="/form"
        labelRight="Edit"
      />
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Avatar story online size={96}>{user.avatar}</Avatar>
        <Title style={{ marginTop: 8 }}>{user.displayName}</Title>
      </div>
      <List>
        <ListItem title="Display name" after={user.displayName} />
        <ListItem title="Email" after={user.email} />
      </List>
    </Page>
  )
}

export default UserPage;
