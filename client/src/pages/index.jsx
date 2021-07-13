import React, { useEffect } from 'react';
import { Page } from 'zmp-framework/react';
import Heading from '../components/heading';
import Banner from '../components/banner';
import Inquiry from '../components/inquiry';
import store from '../store';
import ProductList from '../components/product-list';

const HomePage = () => {
  useEffect(() => {
    store.dispatch('login')
  }, [])

  return (
    <Page name="home">
      <Heading />
      <Banner />
      <Inquiry />
      <ProductList />
    </Page>
  );
}
export default HomePage;