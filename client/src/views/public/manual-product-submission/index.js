import { style } from '@mui/system'
import Button from 'components/button'
import { Container } from 'components/container'
import { Heading } from 'components/heading'
import Input from 'components/input'
import ImageInput from 'components/image-input'
import Link from 'components/link'
import { useState } from 'react'
import { Redirect, Routes, Route } from "react-router-dom"
import styled from 'styled-components'

const HeadingStyle = {
    textAlign: "left"
}

const ContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    paddingTop: "100px",
    paddingBottom: "100px"
}

const WrapperStyle = {
    marginTop: "50px"
}

const TextStyle = {
    paddingLeft: "30px"
}

const MetaRow = {
    gap: "30px",
    justifyContent: "flex-end"
}




export default function ManualProductSubmissionPage() {

    const url = "";
    const [data, setData] = useState({

        name: "",
        link: "",
        remark: "",
        price: "",
        warehouse: "",
        image_url: ""

    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    function submit(e) {
        e.preventDefault();
        window.location = `/p/manual-product?name=${data.name}&url=${data.link}&price=${data.price}&remark=${data.remark}&image=${data.image}`;
    }

    return (
        <Container style={ContainerStyle}>
            <form onSubmit={(e) => submit(e)}>
                <Row>
                    <ReviewForm>
                        <Heading style={HeadingStyle}>Product Information</Heading>
                        <Input value={data.link} id="link" type='text' onChange={(e) => handleSubmit(e)} label="Link" />
                        <Input value={data.name} id="name" type='text' onChange={(e) => handleSubmit(e)} label="Name" />
                        <Input value={data.remark} id="remark" type='text' onChange={(e) => handleSubmit(e)} label="Remark" />
                    </ReviewForm>
                    <TextWrapper>
                        <Heading style={HeadingStyle}>Disclaimer</Heading>
                        <p>These items are sold by third parties. KGHYPE does not sell products directly and serves as a chineese shopping agent.</p>
                    </TextWrapper>
                </Row>
                <Row>
                    <ReviewForm>
                        <Heading style={HeadingStyle}>Fees</Heading>
                        <Input value={data.price} id="price" type='text' onChange={(e) => handleSubmit(e)} label="Prodcut Price" />
                        <Input value={data.warehouse} id="warehouse" type='text' onChange={(e) => handleSubmit(e)} label="Warehouse" />
                        <TextWrapper style={WrapperStyle}>
                            <Heading style={HeadingStyle}>Total :</Heading>
                        </TextWrapper>
                    </ReviewForm>
                    <TextWrapper>
                        <Heading style={HeadingStyle}>Fee Standards</Heading>
                        <p>These items are sold by third parties. KGHYPE does not sell products directly and serves as a chineese shopping agent.</p>
                    </TextWrapper>
                </Row>
                <TextWrapper>
                    <Heading style={HeadingStyle}>Others</Heading>
                    {
                        /*
                        <Button text="Upload File" />
                        <p style={TextStyle}>Size limit for single picture is 1M - 2M</p>
                        */
                        <ImageInput value={data.image} id="image" type='text' onChange={(e) => handleSubmit(e)} label="Image Link" />

                    }
                </TextWrapper>
                <Row style={MetaRow}>
                    <Button type="submit" text='Buy Now' />
                    <Button type="submit" text='Add to Cart' />
                </Row>
            </form>
        </Container>
    )
}

const ReviewForm = styled.div`
    max-width:880px;
    width:100%;
    padding-right:50px;
`
const TextWrapper = styled.div`
    background-color:#EEF2F5;
    padding:30px;
    #price-board{
        margin-top:30px;
    }
`

const Row = styled.div`
    display:flex;
    flex-direction:row;
`