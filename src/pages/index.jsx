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
import AddressPicker from '../components/address-picker';
import Banner from '../components/banner';
import Inquiry from '../components/inquiry';
import Category from '../components/category';
import BottomNavigation from '../components/bottom-navigation';

const HomePage = () => {
  return (
    <Page name="home">
      {/* Top Navbar */}
      <Navbar backLink fill>
        <NavTitleLarge>Highland Coffee</NavTitleLarge>
      </Navbar>
      {/* Page content */}

      {/* User info */}
      <List style={{ margin: 0 }}>
        <ListItem>
          <AddressPicker />
        </ListItem>
      </List>
      <Banner />

      <Inquiry />
      <Category />
      <Category />
      <Category />

      <BottomNavigation />
    </Page>
  );
}
export default HomePage;