import React from 'react';
import { Row, Col, Title, Box } from 'zmp-framework/react';
import Product from '../components/product';

const Category = () => {
    const products = [1, 2, 3, 4, 5, 6]
    return <Box m={0}>
        <Title className="px-4" bold>Cà phê truyền thống</Title>
        <Box m={0} px={4} style={{ width: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
            <Row style={{ width: `calc(${products.length * 50}vw - ${products.length * 20}px + ${(products.length - 1) * 8}px)` }}>
                {products.map(p => <Col key={p} style={{ width: 'calc(50vw - 20px)', display: 'inline-block' }}>
                    <Product />
                </Col>)}
            </Row>
        </Box>
    </Box>
}

Category.displayName = 'zmp-category'

export default Category;
