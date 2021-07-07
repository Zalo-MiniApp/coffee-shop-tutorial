import React from 'react';
import { Page, Card, Title, Box } from 'zmp-framework/react';
import NavbarBack from '../components/navbar-back';

const NotFoundPage = () => (
  <Page>
    <NavbarBack title="Not found" />
    <Box mt={2}>
      <Card inset>
        <Title>Sorry</Title>
        <p>Requested content not found.</p>
      </Card>
    </Box>
  </Page>
);

export default NotFoundPage;
