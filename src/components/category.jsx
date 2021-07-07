import React from 'react';
import { Row, Col, Text, Box } from 'zmp-framework/react';
import Product from '../components/product';

const Category = () => {
    const products = [1, 2, 3, 4, 5, 6]
    return <div style={{ width: '100%', overflow: 'auto' }}>
        <Box m={0} p={4}>
            <Text bold>Cà phê truyền thống</Text>
            <Row style={{ width: `calc(${products.length * 50}vw - ${products.length * 20}px + ${(products.length - 1) * 8}px)` }}>
                {products.map(p => <Col style={{ width: 'calc(50vw - 20px)', display: 'inline-block' }}>
                    <Product />
                </Col>)}
            </Row>
        </Box>
    </div>
}

Category.displayName = 'zmp-category'

export default Category;
