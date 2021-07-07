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

const HomePage = () => {
  const user = useStore('user');
  return (
    <Page name="home" navbarLarge>
      {/* Top Navbar */}
      <Navbar transparent>
        <NavTitleLarge>Highland Coffee</NavTitleLarge>
      </Navbar>
      {/* Page content */}
      <Card inset>
        <p>Here is your blank ZMP app. Let's see what we have here.</p>
      </Card>
      {/* User info */}
      <List>
        <ListItem link="/user/">
          <UserCard user={user} />
        </ListItem>
      </List>

      {/* Grid apps */}
      <AppItems />

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