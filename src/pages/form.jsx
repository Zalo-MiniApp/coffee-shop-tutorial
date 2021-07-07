import React from 'react';
import { Button, Card, Input, Page, useStore, zmp, Box } from 'zmp-framework/react';
import NavbarBack from '../components/navbar-back';

import store from '../store'

const FormPage = () => {
  const user = useStore('user')
  const toast = React.useRef(null)
  const [form, setForm] = React.useState({
    displayName: user.displayName,
    email: user.email,
  })
  const handleChangeInput = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = () => {
    if (!toast.current) {
      toast.current = zmp.toast.create({
        text: 'Saved',
        position: 'bottom',
        closeTimeout: 2000,
      })
    }
    store.dispatch('setUser', form)
    toast.current.open()
  }

  return (
    <Page name="user-form">
      <NavbarBack title="Update user info" />
      <Box>
        <Card inset>
          <Input
            id="displayName"
            label="Display name"
            type="text"
            placeholder="Zalo"
            value={form?.displayName}
            onChange={(e) => handleChangeInput('displayName', e.target.value)}
          />
          <Input
            label="Email"
            type="text"
            placeholder="zalo@zalo.me"
            value={form?.email}
            onChange={(e) => handleChangeInput('email', e.target.value)}
          />
          <Box mx={0} mt={4}>
            <Button responsive typeName="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Card>
      </Box>
    </Page>
  )
}

export default FormPage;
