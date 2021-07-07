import React from 'react'
import { Button, Box, List, ListItem, Page } from 'zmp-framework/react'
import NavbarBack from '../components/navbar-back';

const DymanicRoutePage = (props) => {
  const { zmproute, zmprouter } = props;

  return (
    <Page name="dynamic-route">
      <NavbarBack title="Dynamic (Component) Route" />
      <List>
        <ListItem>
          <div>
            <div><strong>Route</strong></div>
            <div>{zmproute.route.path}</div>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <div><strong>Url</strong></div>
            <div>{zmproute.url}</div>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <div><strong>Path</strong></div>
            <div>{zmproute.path}</div>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <div><strong>Hash</strong></div>
            <div>{zmproute.hash}</div>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <div><strong>Params</strong></div>
            <div>
              <ul>
                {Object.keys(zmproute.params).map(key => (<li key={key}>{key}: {zmproute.params[key]}</li>))}
              </ul>
            </div>
          </div>
        </ListItem>
        <ListItem>
        <div>
            <div><strong>Query</strong></div>
            <div>
              <ul>
                {Object.keys(zmproute.query).map(key => (<li key={key}>{key}: {zmproute.query[key]}</li>))}
              </ul>
            </div>
          </div>
        </ListItem>
      </List>
      <Box px={4} mb={4}>
        <Button
          typeName="primary"
          responsive
          onClick={() => zmprouter.back()}
        >
          Go back via Router API
        </Button>
      </Box>
    </Page>
  )
}

export default DymanicRoutePage;
