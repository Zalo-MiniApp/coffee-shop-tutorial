import React from 'react'
import { Box, Input, Button, Icon, useStore } from 'zmp-framework/react'
import '../css/inquiry.scss'

const Inquiry = () => {
  const categories = useStore('categories')

  return (
    <Box className="inquiry" px="2">
      <div className="flex-1 pr-4">
        <Input type="select">
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </Input>
      </div>
      <Button typeName="tertiary">
        <Icon zmp="zi-search" size="32" className="mr-0"></Icon>
      </Button>
    </Box>
  )
}

Inquiry.displayName = 'zmp-inquiry'

export default Inquiry
