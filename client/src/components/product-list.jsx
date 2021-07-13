import React, { useEffect } from 'react';
import { Row, Col, Title, Box, SkeletonBlock, useStore, SkeletonText, SkeletonImage, SkeletonAvatar } from 'zmp-framework/react';
import store from '../store';
import Product from './product';

const ProductList = () => {
    const loading = useStore('loadingProducts')
    const productGroups = useStore('products')
    useEffect(() => {
        store.dispatch('fetchProducts')
    }, [])

    return <>{loading ? <Box m={0} px={4} pb={2}>
        <SkeletonText effect="wave" style={{ fontSize: 20 }}>
            Lorem ipsum dolor sit amet
        </SkeletonText>
        <Row gap="gap_4" className="mt-4">
            <Col><SkeletonBlock effect="wave" height="200px" /></Col>
            <Col><SkeletonBlock effect="wave" height="200px" /></Col>
        </Row>
    </Box> : <>{productGroups.map(({ _id: groupName, products }) => <Box key={groupName} m={0}>
        <Title className="px-4 pb-2" bold>{groupName}</Title>
        <Box m={0} px={4} pb={2} style={{ width: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
            <Row style={{ width: `calc(${products.length * 50}vw - ${products.length * 20}px + ${(products.length - 1) * 8}px)` }}>
                {products.map(product => <Col key={product._id} style={{ width: 'calc(50vw - 20px)', display: 'inline-block' }}>
                    <Product {...product} />
                </Col>)}
            </Row>
        </Box>
    </Box>)}
    </>
    }
    </>
}

ProductList.displayName = 'zmp-product-list'

export default ProductList;
