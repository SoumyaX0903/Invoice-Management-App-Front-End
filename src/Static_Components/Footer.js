import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
margin-top:20px;
background-color: #2d4250;
height: 9vh;
color: white;
text-align: center;

`

const Anchor = styled.a`
color: #1E90FF;
`
export const Footer=()=> {
  return (
    <Container >
     {/* <Anchor href='#'>Privacy Policy</Anchor> | © 2022 HighRadius Corporation. All rights reserved.  */}
    </Container>
  )
}