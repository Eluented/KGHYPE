import styled from 'styled-components';
import { ClientTable, ClientTd, ClientTh, ClientTr } from "components/client-table";
import { Container } from "components/container";
import { Heading } from "components/heading";
import ImageWrapper from "components/image-wrapper";
import NumberBox from "components/number-box";
import { SharedImage } from "constants/image-constant";
import Button from 'components/button';
import dummy from './shipping_dummy'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { Component } from 'react';
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

class LightboxExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {

        const { photoIndex, isOpen } = this.state;
        const images = [
            this.props.url,
            this.props.url2,
            this.props.url3
        ]
        return (
            <div>
                <Button type="button" text="Quality pictures" onClick={() => this.setState({ isOpen: true })}>

                </Button>

                {isOpen && (

                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

export default function HistoryCart() {

    const [datas, setData] = useState([]);



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
                                const queryString = window.location.search;
                                const urlParams = new URLSearchParams(queryString);
                                const product = urlParams.get('id')
                                var ref = db.ref(`users/${usersSnapshot.key}/history/${product}`);
                                ref.once("value").then((snapshot) => {
                                    const fetched = snapshot.val();
                                    console.log('fetched', fetched)
                                    for (var i in fetched['products']) {
                                        var feed = { 'name': fetched['products'][i]['product']['title'], 'photo': fetched['products'][i]['product']['pic_url'], 'price': fetched['products'][i]['product']['price'], 'quantity': fetched['products'][i]['product']['promotion_price'], 'url1': fetched['pics'][0], 'url2': fetched['pics'][1], 'url3': fetched['pics'][2] }
                                        dummy.push(feed)
                                    }
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
    return (
        <Container style={ContainerStyle}>
            <Heading style={HeadingStyle}>
                Cart

            </Heading>
            <ClientTable>
                <thead>
                    <ClientTr>
                        <ClientTh>Item Name</ClientTh>
                        <ClientTh>Price</ClientTh>
                        <ClientTh>Quantity</ClientTh>
                        <ClientTh>Size</ClientTh>
                        <ClientTh>Color</ClientTh>
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
                                    <Wrapper>

                                        <ProductWrapper>
                                            <ImageWrapper src={data.photo} alt="product" />
                                        </ProductWrapper>
                                        {data.name}
                                    </Wrapper>
                                </ClientTd>
                                <ClientTd>
                                    Â¥{data.price}
                                </ClientTd>
                                <ClientTd>
                                    <NumberBox />
                                </ClientTd>
                                <ClientTd>8</ClientTd>
                                <ClientTd>White</ClientTd>
                                <ClientTd>
                                    <LightboxExample url={data.url1} url2={data.url2} url3={data.url3} />
                                </ClientTd>

                            </ClientTr>

                        );

                    })}
                </tbody>
            </ClientTable>
            <Wrapper>
                <Button text='Reorder' />
                <MetaWrapper>
                    <Wrapper>
                        Selected :
                        <Heading style={MetaStyle}>
                            {total_amount}
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