import React from 'react';
import { Page } from 'zmp-framework/react';
import AddressPicker from '../components/address-picker';
import Banner from '../components/banner';
import Inquiry from '../components/inquiry';
import Category from '../components/category';
import BottomNavigation from '../components/bottom-navigation';

const HomePage = () => {
  return (
    <Page name="home">
      <AddressPicker />
      <Banner />

      <Inquiry />
      <Category />
      <Category />
      <Category />
    </Page>
  );
}
export default HomePage;