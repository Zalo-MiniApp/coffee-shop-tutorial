import React from 'react';
import { Avatar, Title } from 'zmp-framework/react';

const UserCard = ({ user }) => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Avatar story={user.story} online={user.online}>{user.avatar}</Avatar>
      <div style={{ marginLeft: 16 }}>
        <Title style={{ marginBottom: 0 }}>{user.displayName}</Title>
        <div>{user.email}</div>
      </div>
    </div>
  )
};

UserCard.displayName = 'zmp-user-card'

export default UserCard;
