import React from 'react';

import styled from 'styled-components';

export default props => {

  return (
    <Container {...props}>

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  minHeight: 100px;
  height: 100px;
  font-size: 12px;
  color: #999;
`;