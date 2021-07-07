import React from 'react';
import {
  Page,
  Navbar,
  NavTitleLarge,
  List,
  ListItem,
  useStore,
  Card,
} from 'zmp-framework/react';
import AppItems from '../components/app-items';
import UserCard from '../components/user-card';
import AddressPicker from '../components/address-picker';
import backgroundStore from '../../assets-src/background-store.png'

const HomePage = () => {
  const user = useStore('user');
  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar backLink>
        <NavTitleLarge>Highland Coffee</NavTitleLarge>
      </Navbar>
      {/* Page content */}

      {/* User info */}
      <List style={{ margin: 0 }}>
        <ListItem>
          <AddressPicker />
        </ListItem>
      </List>
      <img src={backgroundStore} style={{ width: '100%' }} />

      {/* Route */}
      <List>
        <ListItem title="Dynamic (Component) Route" link="/dynamic-route/?blog=45&post=125&foo=bar" />
        <ListItem title="Default Route (404)" link="/something-that-doesnt-exist" />
        <ListItem title="About" link="/about/" />
      </List>
    </Page>
  );
}
export default HomePage;