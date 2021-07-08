import React from 'react';
import { Box, Input, Button, Icon, useStore } from 'zmp-framework/react';

const Inquiry = () => {
    const categories = useStore('categories');

    return <Box className="inquiry" px="2" style={{ display: 'flex' }}>
        <div style={{ flex: '1', paddingRight: 16 }}>
            <Input type="select">
                {categories.map(category => <option key={category} value={category}>{category}</option>)}
            </Input>
        </div>
        <Button style={{ width: 48, height: 48 }} typeName="tertiary">
            <Icon zmp="zi-search" size="32" style={{ marginRight: 0 }}></Icon>
        </Button>
    </Box>
}

Inquiry.displayName = 'zmp-inquiry'

export default Inquiry;
