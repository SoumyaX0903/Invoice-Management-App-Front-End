import { Button } from '@mui/material';
import React, { useState } from 'react'

import styled from 'styled-components'
import { deleteData, getNoOfRows } from '../API_Calls/GetData';

const Backdrop = styled.div`
 position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display:flex;
  justify-content: center;
  align-items: center;

  `


const Wrapper = styled.div`

position: absolute;
  
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display:flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  
   
    z-index: 10;
    
    width: 500px;
    background-color: #273b47;
`;

const Title = styled.h2`
font-size: 20px;
color: white;
margin-left: 10px;
`






const Buttons = styled.div`
display: flex;
padding: 10px;
`
const Para=styled.h3`
font-size: 20px;
color: white;
margin-left: 10px;
`


export const DeleteModal=(props)=>{
    
    const submitHandler = async () => {
        props.setclose()
        await deleteData(props.delrows)
        props.setrowcount(await getNoOfRows())
        props.handleRefresh();

    }


    
    return (
        <>
        <Backdrop onClick={props.setclose}/>
        <Wrapper>
            <Container>
                <Title>
                    Delete Records?
                </Title>
                <Para>
                    Are you sure you want to delete the Record(s)?
                </Para>
                <Buttons>
                    <Button variant='outlined' onClick={submitHandler} sx={{  flex:1,color: 'white', "&.MuiButton-root": { border: "1px white solid" } }}>
                        DELETE
                    </Button>
                    <Button variant='outlined' onClick={props.setclose} sx={{ flex:1, color: 'white', "&.MuiButton-root": { border: "1px white solid" } }}>
                        CANCEL
                    </Button>

                </Buttons>
            </Container>
            </Wrapper>
            </>
       

    )
}