import styled from 'styled-components';
import { ClientTable, ClientTd, ClientTh, ClientTr } from "components/client-table";
import { Container } from "components/container";
import { Heading } from "components/heading";
import ImageWrapper from "components/image-wrapper";
import NumberBox from "components/number-box";
import { SharedImage } from "constants/image-constant";
import Button from 'components/button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from "axios";

import dummy from './shipping_dummy'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    CircularProgress,
    Typography,
    TextField,
    NativeSelect,
} from "@mui/material";
import React, { useState, useEffect } from 'react';

//Firebase 
import { auth } from 'firebase.js';
import { db } from 'firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { useRadioGroup } from '@mui/material';
import { borderRadius } from '@mui/system';

const HeadingStyle = {
    textAlign: "left",
    paddingLeft: "20px"
}

const { Product } = SharedImage;

const ContainerStyle = {
    paddingBottom: "200px"
}

const MetaStyle = {
    paddingLeft: "10px"
}


export default function ConfirmCart() {
    const [datas, setData] = useState([]);

    const [selected, setSelected] = useState([]);

    function onChange(event, item) {
        if (event.target.checked) {
            setSelected([...selected, item]);
        } else {
            setSelected((prev) =>
                prev.filter((currItem) => currItem.value !== item.value)
            );
        }
    }

    const [state, setState] = useState({
        ip: "",
        countryName: "",
        countryCode: "",
        city: "",
        timezone: ""
    });

    const getGeoInfo = () => {
        axios
            .get("https://ipapi.co/json/")
            .then((response) => {
                let data = response.data;
                setState({
                    ...state,
                    ip: data.ip,
                    countryName: data.country_name,
                    countryCode: data.country_calling_code,
                    city: data.city,
                    timezone: data.timezone
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getGeoInfo();
    }, []);

    var total_price = 0;
    var total_amount = 0;

    useEffect(() => {
        const fetchData = async () => {

            onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    //Add to cart

                    const usersRef = await db.ref("users");
                    usersRef.once('value', function (snapshot) {
                        snapshot.forEach(function (usersSnapshot) {
                            var usersData = usersSnapshot.val();


                            if (usersData.mail == currentUser.email) {
                                var ref = db.ref(`users/${usersSnapshot.key}/cart`);
                                ref.once("value").then((snapshot) => {
                                    const fetched = snapshot.val();
                                    console.log('fetched', fetched)
                                    fetched.forEach(element => {
                                        var feed = { 'name': element.title, 'photo': element.pic_url, 'price': element.price, 'quantity': element.quantity }
                                        dummy.push(feed)
                                    });
                                    setData(dummy);


                                });
                            }

                        });
                    });
                }
            })

        };
        fetchData();
    }, []);
    let yo = document.querySelectorAll('input[name=chkBox]:checked');
    return (
        <Container style={ContainerStyle}>
            <Heading style={HeadingStyle}>
                Confirmation

            </Heading>
            <ClientTable>
                <thead>
                    <ClientTr>
                        <ClientTh></ClientTh>
                        <ClientTh>Item Name</ClientTh>
                        <ClientTh>Price</ClientTh>
                        <ClientTh>Quantity</ClientTh>
                        <ClientTh>Remark</ClientTh>
                        <ClientTh>Size</ClientTh>
                        <ClientTh>Color</ClientTh>
                        <ClientTh>Edit</ClientTh>
                    </ClientTr>
                </thead>
                <tbody>
                    {console.log(dummy)}
                    {dummy.map((data, key) => {
                        total_price += parseInt(data.price);
                        total_amount++;
                        return (

                            <ClientTr key={'key'}>
                                <ClientTd>

                                </ClientTd>
                                <ClientTd>
                                    <Wrapper>

                                        <ProductWrapper>
                                            <ImageWrapper src={data.photo} alt="product" />
                                        </ProductWrapper>
                                        {data.name}
                                    </Wrapper>
                                </ClientTd>
                                <ClientTd>
                                    ¥{data.price}
                                </ClientTd>
                                <ClientTd>
                                    <NumberBox />
                                </ClientTd>
                                <ClientTd>
                                    <TextField
                                        value={data.mail}
                                        id="mail"
                                        variant="outlined"
                                        type="text"
                                        label="Remark"
                                        name='Remark'
                                    />                                </ClientTd>
                                <ClientTd>9</ClientTd>
                                <ClientTd>white</ClientTd>
                                <ClientTd>
                                    <Button style={{ borderRadius: "10px", background: "#e74c3c" }} text='Delete' />
                                </ClientTd>
                            </ClientTr>

                        );

                    })}
                </tbody>
            </ClientTable>


            <br />
            <br />
            <br />
            <br />

            <h3>
                <FormControlLabel control={<Checkbox />} />I authorize this payment of  ¥{total_price}, and I authorize KgHype to make this purchase on my behalf.
                <br />
                <FormControlLabel control={<Checkbox />} />I understand that international shipping is billed separately. See. Shipping Calculator
                <br />
                <FormControlLabel control={<Checkbox />} />I agree that any import duty (Customs tax) is my responsibility to pay.
            </h3>


            <Wrapper>
                <Button text='Continue' />
                <MetaWrapper>
                    <Wrapper>
                        Country :
                        <Heading style={MetaStyle}>
                            {state.countryName}
                        </Heading>
                    </Wrapper>
                    <Wrapper>Total :    <Heading style={MetaStyle}>
                        ¥{total_price}
                    </Heading></Wrapper>
                </MetaWrapper>
            </Wrapper>
        </Container>
    )
}


// style input
const inputStyle = {
    width: "100%",
    height: "40px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    padding: "0 10px",
    fontSize: "14px",
    outline: "none",
    marginBottom: "10px"
}

const Inputs = styled.input`
    color: #000;

`
const ProductWrapper = styled.div`
    max-width:150px;
    padding-right:20px;
`

const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`

const MetaWrapper = styled.div`
    display:flex;
    flex-direction:row;
    gap:30px;
    padding-left:20px;
`