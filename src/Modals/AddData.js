import { Button } from '@mui/material';
import React, { useState } from 'react'

import styled from 'styled-components'
import { addData, getNoOfRows } from '../API_Calls/GetData';

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
    
    width: 1300px;
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
min-width: 270px;
margin: 10px;
`


const Fields = styled.div`
display: flex;


flex-wrap: wrap;

`

const Buttons = styled.div`
display: flex;
padding: 10px;
`



export const AddModal = (props) => {
    const [data, setData] = useState({})

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitHandler = async () => {
        props.setclose()
        await addData(data);
        props.setrowcount(await getNoOfRows())
        props.handleRefresh();


    }

    const OnFocus = (e) => {
        e.currentTarget.type = "date";
    }
    const OnBlur = (e) => {
        e.currentTarget.type = "text";
    }


    return (
        <>
            <Backdrop onClick={props.setclose} />
            <Wrapper>
                <Container>
                    <Title>
                        Add
                    </Title>
                    <Fields>

                        <Input name="business_code" placeholder="Business Code" value={data.business_code} type="text" onChange={handleChange} />
                        <Input name="cust_number" placeholder="Customer Number" value={data.cust_number} type="text" onChange={handleChange} />
                        <Input name="clear_date" placeholder="Clear Date" value={data.clear_date} onFocus={OnFocus} onBlur={OnBlur} type="text" onChange={handleChange} />
                        <Input name="business_year" placeholder="Business Year" value={data.business_year} type="text" onChange={handleChange} />
                        <Input name="doc_id" placeholder="Document ID" value={data.doc_id} type="text" onChange={handleChange} />
                        <Input name="posting_date" placeholder="Posting Date" value={data.posting_date} onFocus={OnFocus} onBlur={OnBlur} type="text" onChange={handleChange} />
                        <Input name="document_create_date" placeholder="Document Create Date" value={data.document_create_date} onFocus={OnFocus} onBlur={OnBlur} type="text" onChange={handleChange} />
                        <Input name="due_in_date" placeholder="Due Date" value={data.due_in_date} onFocus={OnFocus} onBlur={OnBlur} type="text" onChange={handleChange} />
                        <Input name="invoice_currency" placeholder="Invoice Currency" value={data.invoice_currency} type="text" onChange={handleChange} />
                        <Input name="doc_type" placeholder="Document Type" value={data.doc_type} type="text" onChange={handleChange} />
                        <Input name="posting_id" placeholder="Posting ID" value={data.posting_id} type="text" onChange={handleChange} />
                        <Input name="total_open_amount" placeholder="Total Open Amount" value={data.total_open_amount} type="text" onChange={handleChange} />
                        <Input name="baseline_create_date" placeholder="Baseline Create Date" value={data.baseline_create_date} onFocus={OnFocus} onBlur={OnBlur} type="text" onChange={handleChange} />
                        <Input name="cust_payment_terms" placeholder="Customer Payment Terms" value={data.cust_payment_terms} type="text" onChange={handleChange} />
                        <Input name="invoice_id" placeholder="Invoice ID" value={data.invoice_id} type="text" onChange={handleChange} />


                    </Fields>
                    <Buttons>
                        <Button variant='outlined' onClick={submitHandler} sx={{ flex: 1, color: 'white', "&.MuiButton-root": { border: "1px white solid" } }}>
                            ADD
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