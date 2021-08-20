import React, { useState, useMemo, useEffect } from 'react'
import { Text, Title, Actions, ActionsGroup, ActionsLabel, Button, Icon, Input, Row, Col, Box, List, ListItem, zmp } from 'zmp-framework/react'
import { Price, ExtraPrice } from './prices'
import store from '../store'
import '../css/product-order.scss'

const ProductOrder = ({ product, children, cartItem, cartIndex }) => {
  const { name, price, image, sizes, toppings } = product
  const [showOrder, setShowOrder] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(sizes[0])
  const [topping, setTopping] = useState()
  const [note, setNote] = useState('')

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity)
      setSize(cartItem.size)
      setTopping(cartItem.topping)
      setNote(cartItem.note)
    }
  }, [showOrder])

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }
  const decreaseQuantity = () => {
    const limit = cartItem ? 0 : 1
    setQuantity(quantity > limit ? quantity - 1 : limit)
  }

  const subtotal = useMemo(() => {
    let subtotal = price
    if (size) {
      subtotal += size.extra
    }
    if (topping) {
      subtotal += topping.extra
    }
    subtotal *= quantity
    return subtotal
  }, [quantity, size, topping])

  const order = () => {
    const item = {
      quantity,
      size,
      topping,
      subtotal,
      note,
      product
    }
    if (cartItem) {
      store.dispatch('updateCartItem', { index: cartIndex, item })
    } else {
      store.dispatch('addToCart', item)
    }
  }
  const addToCart = () => {
    order()
    setShowOrder(false)
  }

  const removeFromCart = () => {
    zmp.dialog.create({
      title: 'Xác nhận',
      content:
        'Bạn có chắc muốn xoá sản phẩm này khỏi đơn hàng?',
      buttons: [
        {
          text: 'Không',
          close: true,
        },
        {
          text: 'Đồng Ý',
          close: true,
          onClick() {
            setShowOrder(false)
            store.dispatch('removeCartItem', cartIndex)
          }
        },
      ],
    }).open()
  }

  const checkout = () => {
    order()
    setShowOrder(false)
    store.dispatch('setShowCheckout', true)
  }

  return (
    <div>
      <div onClick={() => setShowOrder(true)}>
        {children}
      </div>
      <Actions
        className="custom-action-sheet product-order"
        opened={showOrder}
        onActionsClosed={() => setShowOrder(false)}
      >
        <ActionsGroup>
          <Button typeName="ghost" className="close-button" onClick={() => setShowOrder(false)}>
            <Icon zmp="zi-close" size={24}></Icon>
          </Button>
          <ActionsLabel bold>
            <span className="title">Chọn thức uống</span>
          </ActionsLabel>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsLabel className="bg-white product-preview">
            <Row>
              <Col className="image"><img src={image} className="w-100" /></Col>
              <Col className="description">
                <Title bold>{name}</Title>
                <Price amount={price} />
              </Col>
            </Row>
          </ActionsLabel>
          <ActionsLabel className="p-0 text-left">
            <Box><Text bold>Chọn Size</Text></Box>
            <List className="my-0">
              {sizes.map(s => <ListItem key={s.name} radio value={s.name} name="s" title={s.name} checked={size === s} onClick={() => setSize(s)}>
                {s.extra && <ExtraPrice amount={s.extra} />}
              </ListItem>)}
            </List>
          </ActionsLabel>
          <ActionsLabel className="p-0 text-left">
            <Box><Text bold>Chọn Topping</Text></Box>
            <List className="my-0">
              {toppings.map(t => <ListItem key={t.name} radio value={t.name} name="t" title={t.name} checked={topping === t} onClick={() => setTopping(t)}>
                {t.extra && <ExtraPrice amount={t.extra} />}
              </ListItem>)}
            </List>
          </ActionsLabel>
          <ActionsLabel className="p-0 text-left">
            <Box><Text bold>Số lượng</Text></Box>
            <List className="my-0">
              <ListItem>
                <div className="quantity-selector">
                  <Button small typeName="tertiary" onClick={decreaseQuantity}>-</Button>
                  <Box mx={6} mt={1}>{quantity}</Box>
                  <Button small typeName="tertiary" onClick={increaseQuantity}>+</Button>
                </div>
              </ListItem>
            </List>
          </ActionsLabel>
          <ActionsLabel className="p-0 text-left">
            <Box><Text bold>Ghi chú</Text></Box>
            <List className="my-0">
              <ListItem>
                <div className="note">
                  <Input value={note} onChange={(e) => setNote(e.target.value)} type="text" placeholder="Nhập ghi chú (VD. Ít đá, nhiều đường...)" />
                </div>
              </ListItem>
            </List>
          </ActionsLabel>
        </ActionsGroup>
        <ActionsGroup />
        <ActionsGroup className="sticky-action-footer">
          <ActionsLabel className="p-2 text-left">
            <Row>
              <Col><Box>Tổng tiền</Box></Col>
              <Col className="text-right">
                <Box><Price className="text-primary" bold fontSize={20} amount={subtotal} /></Box>
              </Col>
            </Row>
            <Row gap="gap_4" className="actions">
              {cartItem ?
                <Col>
                  {quantity > 0 ?
                    <Button responsive typeName="primary" onClick={checkout}>Cập nhật giỏ hàng</Button> :
                    <Button responsive typeName="destructive" onClick={removeFromCart}>Xoá khỏi giỏ hàng</Button>}
                </Col> :
                <>
                  <Col>
                    <Button responsive typeName="secondary" onClick={checkout}>Mua ngay</Button>
                  </Col>
                  <Col>
                    <Button responsive typeName="primary" onClick={addToCart}>Thêm vào giỏ</Button>
                  </Col>
                </>
              }
            </Row>
          </ActionsLabel>
        </ActionsGroup>
      </Actions>
    </div>
  )
}

ProductOrder.displayName = 'zmp-product-order'

export default ProductOrder
