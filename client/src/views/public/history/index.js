import styled from 'styled-components';
import { ClientTable, ClientTd, ClientTh, ClientTr } from "components/client-table";
import { Container } from "components/container";
import { Heading } from "components/heading";
import ImageWrapper from "components/image-wrapper";
import { SharedImage } from "constants/image-constant";
import Button from 'components/button';
import React, { useState, useEffect } from 'react';
import dummy from './shipping_dummy'

//Firebase 
import { auth } from 'firebase.js';
import { db } from 'firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"


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

function redo(id, user) {
    window.location.href = "/p/historycart?id=" + id + '&userid=' + user;
}
export default function HistoryPage() {
    const [datas, setData] = useState([]);
    var dummy = []


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
                                var ref = db.ref(`users/${usersSnapshot.key}/history`);
                                ref.once("value").then((snapshot) => {
                                    const fetched = snapshot.val();
                                    console.log('fetched', fetched)
                                    for (var q in fetched) {
                                        console.log(fetched[q])
                                        var feed = { 'image': fetched[q]["products"][0]["product"]["pic_url"], 'number': q, 'time': fetched[q]['order_time'], 'user': usersSnapshot.key, 'price': fetched[q]['total_price'], 'status': fetched[q]['order_status'] }
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
                History
            </Heading>
            <ClientTable>
                <thead>
                    <ClientTr>
                        <ClientTh>Image</ClientTh>
                        <ClientTh>Order Number</ClientTh>
                        <ClientTh>Order Time</ClientTh>
                        <ClientTh>Total Price</ClientTh>
                        <ClientTh>Order Status</ClientTh>
                    </ClientTr>
                </thead>

                {datas.map((data, index) => {
                    { console.log('dummy') }
                    return (
                        <ClientTr key={data.name}>
                            <ClientTd>
                                <Wrapper>
                                    <img style={{ width: "100px", borderRadius: "10px" }} src={data.image}></img>

                                </Wrapper>
                            </ClientTd>
                            <ClientTd>
                                <Wrapper>

                                    {data.number}
                                </Wrapper>
                            </ClientTd>
                            <ClientTd>
                                {data.time}
                            </ClientTd>
                            <ClientTd>
                                {data.price}
                            </ClientTd>
                            <ClientTd>
                                {data.status}
                            </ClientTd>

                            <ClientTd>
                                <ButtonWrapper>
                                    <Button text='Inspection' onClick={() => redo(data.number, data.user)} />
                                </ButtonWrapper>
                            </ClientTd>
                        </ClientTr>
                    )

                })}

            </ClientTable>
            <Wrapper>

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

const ButtonWrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
`