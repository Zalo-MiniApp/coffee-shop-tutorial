import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Button, Text, ActionsGroup, ActionsLabel, ActionsButton, Row, Col, Icon, Searchbar, useStore, Link, Box, List, ListItem, Input } from 'zmp-framework/react'
import delivery from '../static/icons/delivery.svg'
import { saveAddress } from '../services/storage'
import store from '../store'
import phoneIcon from '../static/icons/phone.svg'

export const Address = (props) => {
  const { name, address, selected, phone } = props
  const selectAddress = () => {
    store.dispatch('selectAddress', props)
  }

  return (
    <ActionsButton className={`bg-white ${selected ? 'active' : 'inactive'}`} onClick={selectAddress}>
      <img src={delivery} className="custom-icon" />
      <div className="description">
        <Text className="mb-0" bold fontSize="16">{name} - {phone}</Text>
        <Text className="text-secondary">{address}</Text>
      </div>
    </ActionsButton>
  )
}

const AddressPicker = ({ onBack }) => {
  const [keyword, setKeyword] = useState('')
  const selectedAddress = useStore('selectedAddress')
  const selectableAddresses = useStore('addresses')
  const user = useStore('user')

  const addresses = useMemo(() => {
    if (keyword) {
      return selectableAddresses.filter(address =>
        `${address.name} ${address.address}`.toLowerCase().includes(keyword.trim().toLowerCase())
      )
    } else {
      return selectableAddresses
    }
  }, [keyword, selectableAddresses])
  const otherAddresses = useMemo(() => addresses.filter(address => {
    if (!selectedAddress) {
      return addresses
    } else {
      return address.address !== selectedAddress.address
    }
  }), [addresses])

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const saveNewAddress = async () => {
    const payload = { name, address, phone }
    await saveAddress(payload)
    await store.dispatch('fetchAddresses')
    await store.dispatch('selectAddress', payload)
    setShowForm(false)
    if (onBack) {
      onBack()
    }
  }

  useEffect(() => {
    if (!name && !!user) {
      setName(user.name)
    }
  }, [user])

  return (
    <>
      <ActionsGroup>
        <Button typeName="ghost" className="close-button" onClick={onBack}>
          <Icon zmp="zi-arrow-left" size={24}></Icon>
        </Button>
        <ActionsLabel bold>
          <span className="title">Ch???n ?????a ch??? nh???n h??ng</span>
        </ActionsLabel>
      </ActionsGroup>
      <ActionsGroup>
        {showForm || selectableAddresses.length === 0 ? <ActionsLabel className="p-0">
          <Box className="text-left"><Text bold>Th??m ?????a ch??? nh???n h??ng</Text></Box>
          <List className="my-0">
            <ListItem className="editable-info">
              <Box slot="root-start" className="label">T??n ng?????i nh???n</Box>
              <Icon slot="media" zmp="zi-user-circle" size="24" />
              <div className="inline-input"><Input type="text" placeholder="Nh???p t??n ng?????i nh???n..." value={name} onChange={e => setName(e.target.value)} /></div>
            </ListItem>
            <ListItem className="editable-info">
              <Box slot="root-start" className="label">?????a ch???</Box>
              <Icon slot="media" zmp="zi-location-solid" size="24" />
              <div className="inline-input"><Input type="textarea" placeholder="Nh???p ?????a ch???..." resizable value={address} onChange={e => setAddress(e.target.value)} /></div>
            </ListItem>
            <ListItem className="editable-info">
              <Box slot="root-start" className="label">S??? ??i???n tho???i</Box>
              <Avatar slot="media" src={phoneIcon} size="24" />
              <div className="inline-input"><Input type="text" placeholder="Nh???p s??? ??i???n tho???i..." value={phone} onChange={e => setPhone(e.target.value)} /></div>
            </ListItem>
            <ListItem className="editable-info">
              <Button className="mb-2" fill responsive large onClick={saveNewAddress} disabled={!name || !phone || !address}>L??u ?????a ch???</Button>
            </ListItem>
          </List>
        </ActionsLabel> : <>
          <ActionsLabel bold>
            <Searchbar value={keyword} onChange={e => setKeyword(e.target.value)} type="text" placeholder="T??m ?????a ch???, t??n chi nh??nh..." clearButton onSearchbarClear={() => setKeyword('')} />
          </ActionsLabel>
          {keyword ? <>
            <ActionsLabel className="p-0">
              <Box>
                {
                  addresses.length ?
                    <Text bold className="text-left">K???t qu???</Text> :
                    <Text bold>Kh??ng t??m th???y</Text>
                }
              </Box>
            </ActionsLabel>
            {addresses.map((address, i) => <Address key={i} {...address} />)}
          </> : <>
            {selectedAddress && <>
              <ActionsLabel className="p-0">
                <Box>
                  <Row>
                    <Col width="60" className="text-left">
                      <Text bold className="mb-0">?????a ch??? ??ang ch???n</Text>
                    </Col>
                    <Col width="40" className="text-right">
                      <Link className="text-primary" onClick={() => setShowForm(true)}>
                        Th??m ?????a ch??? m???i
                      </Link>
                    </Col>
                  </Row>
                </Box>
              </ActionsLabel>
              <Address {...selectedAddress} selected />
            </>}
            {otherAddresses.length > 0 && <>
              <ActionsLabel className="p-0">
                <Box className="text-left"><Text bold>?????a ch??? kh??c</Text></Box>
              </ActionsLabel>
              {otherAddresses.map((address, i) => <Address key={i} {...address} />)}
            </>}
          </>}
        </>}
      </ActionsGroup>
    </>
  )
}

AddressPicker.displayName = 'zmp-address-picker'

export default AddressPicker
