import React from 'react'
import { Box, SkeletonText, SkeletonBlock, Row, Col } from 'zmp-framework/react'

const Loading = () => <Box m={0} px={4} pb={2}>
  {[1, 2, 3].map(i => <Row key={i} gap="gap_4" className="mt-4">
    <Col width="25"><SkeletonBlock effect="wave" height="64px" /></Col>
    <Col width="75">
      <SkeletonText tag="div" effect="wave">Lorem ipsum dolor</SkeletonText>
      <SkeletonText tag="div" effect="wave">Lorem ipsum dolor sit amet consectetur</SkeletonText>
      <SkeletonText tag="div" effect="wave">Lorem ipsum dolor sit amet</SkeletonText>
    </Col>
  </Row>)}
</Box>

Loading.displayName = 'zmp-loading'

export default Loading
