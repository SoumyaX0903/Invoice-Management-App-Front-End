import { Button } from '@mui/material';
import React, { useState } from 'react'

import styled from 'styled-components'
import { editData } from '../API_Calls/GetData';

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
const Input = styled.input`
padding: 13px;
border-radius: 10px;
min-width: 180px;
margin: 10px;
`


const Fields = styled.div`
display: flex;
flex-wrap: wrap;
margin-left:20px;

`

const Buttons = styled.div`
display: flex;
padding: 10px;
`
export const EditModal = (props) => {
    const [data, setData] = useState({"invoice_currency":props.invcurr,"cust_payment_terms":props.custpt,"sl_no":props.sl})

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitHandler = async () => {
        await editData(data);
        props.setclose()
    }
    return (
        <>
            <Backdrop onClick={props.setclose} />
            <Wrapper>
                <Container>
                    <Title>
                        EDIT
                    </Title>
                    <Fields>

                        <Input name="invoice_currency" placeholder="Invoice Currency" value={data.invoice_currency} type="text" onChange={handleChange} />
                        <Input name="cust_payment_terms" placeholder="Customer Payment Terms" value={data.cust_payment_terms} type="text" onChange={handleChange} />


                    </Fields>
                    <Buttons>
                        <Button variant='outlined' onClick={submitHandler} sx={{ flex: 1, color: 'white', "&.MuiButton-root": { border: "1px white solid" } }}>
                            EDIT
                        </Button>
                        <Button variant='outlined' onClick={props.setclose} sx={{ flex: 1, color: 'white', "&.MuiButton-root": { border: "1px white solid" } }}>
                            CANCEL
                        </Button>

                    </Buttons>
                </Container>
            </Wrapper>
        </>


    )
}