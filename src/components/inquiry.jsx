import React from 'react';
import { Box, Input, Button, Icon } from 'zmp-framework/react';

const Inquiry = () => {
    return <Box p="2" style={{ display: 'flex' }}>
        <div style={{ flex: '1', paddingRight: 16 }}>
            <Input type="select" />
        </div>
        <Button style={{ width: 48, height: 48 }} typeName="tertiary">
            <Icon zmp="zi-search" size="32" style={{ marginRight: 0 }}></Icon>
        </Button>
    </Box>
}

Inquiry.displayName = 'zmp-inquiry'

export default Inquiry;
