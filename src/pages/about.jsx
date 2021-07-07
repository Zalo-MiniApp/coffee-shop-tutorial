import React from 'react'
import { Actions, ActionsButton, ActionsGroup, ActionsLabel, Button, Card, Page, Box } from 'zmp-framework/react';
import NavbarBack from '../components/navbar-back';

const AboutPage = (props) => {
  const [actionSheetOpened, setActionSheetOpened] = React.useState(false);

  return (
    <Page name="about">
      <NavbarBack title="About" />
      <Box mt={2}>
        <Card inset title="About My App">
          <p>This is a demo ZMP App!</p>
        </Card>
      </Box>
      <Box mb={4}>
        <Button
          typeName="primary"
          responsive
          onClick={() => setActionSheetOpened(true)}
        >
          Back
        </Button>
      </Box>
      <Actions
        opened={actionSheetOpened}
        onActionsClosed={() => setActionSheetOpened(false)}
        id="actions-two-groups"
      >
        <ActionsGroup>
          <ActionsLabel>Are you sure?</ActionsLabel>
          <ActionsButton color="blue" onClick={() => props.zmprouter.back()}>Navigate back</ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton>Cancel</ActionsButton>
        </ActionsGroup>
      </Actions>
    </Page>
  )
}

export default AboutPage;
