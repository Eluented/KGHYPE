import styled from 'styled-components';
import { ClientTable, ClientTd, ClientTh, ClientTr } from "components/client-table";
import { Container } from "components/container";
import { Heading } from "components/heading";
import ImageWrapper from "components/image-wrapper";
import NumberBox from "components/number-box";
import { SharedImage } from "constants/image-constant";
import Button from 'components/button';
import dummy from './shipping_dummy'

import React, { useState, useEffect } from 'react';

//Firebase 
import { auth } from 'firebase.js';
import { db } from 'firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

const HeadingStyle = {
    textAlign: "left",
    paddingLeft:"20px"
}

const { Product } = SharedImage;

const ContainerStyle = {
    paddingBottom:"200px"
}

const MetaStyle = {
    paddingLeft:"10px"
}

function history(){
    var ref = db.ref("users/-N5CLaOuaBEdNvv7t5MU/cart");
    ref.on("value", function(snapshot) {
        console.log(snapshot.val());
        
        for(var i in snapshot.val()){
            const usersRef = db.ref("users/-N5CLaOuaBEdNvv7t5MU/history/"+i);
            usersRef.set({
                i: snapshot.val()[i],
           }).then(() => {
         })
        }

    }
    , function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }
    );

}

  
export default function ShippingCart() {
    const [datas, setData] = useState([]);
    var ref = db.ref("users/-N5CLaOuaBEdNvv7t5MU/cart");

  
    useEffect(() => {
      const fetchData = async () => {
        await ref.once("value").then((snapshot) => {
          const fetched = snapshot.val();
          console.log('fetched', fetched)
          fetched.forEach(element => {
            var feed = {'name': element.title,'photo': element.pic_url, 'price': element.price, 'quantity': element.quantity}
            dummy.push(feed)
          });
            setData(dummy);


        }); 
      };
      fetchData();
    }, []);
    console.log('datas', datas)
    return (
        <Container style={ContainerStyle}>
            <Heading style={HeadingStyle}>
                Cart

            </Heading>
            <ClientTable>
                <thead>
                <ClientTr>
                    <ClientTh>Item Name</ClientTh>
                    <ClientTh>Remark</ClientTh>
                    <ClientTh>Price</ClientTh>
                    <ClientTh>Quantity</ClientTh>
                    <ClientTh>Amount</ClientTh>
                    <ClientTh>Edit</ClientTh>
                </ClientTr>
                </thead>
                <tbody>
                    {console.log(dummy)}
                {dummy.map((data, key) => {
                    console.log('one', dummy)
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
                                {data.price}
                            </ClientTd>
                            <ClientTd>
                                {data.price}
                            </ClientTd>
                            <ClientTd>
                                <NumberBox />
                            </ClientTd>
                            <ClientTd>
                                3
                            </ClientTd>
                            <ClientTd>
                                Delete
                            </ClientTd>
                        </ClientTr>

                    );

                })}
                </tbody>
            </ClientTable>
            <Wrapper>
                <Button text='Submit' onClick={history}/>
                <MetaWrapper>
                    <Wrapper>
                        Selected : 
                        <Heading style={MetaStyle}>
                            12
                        </Heading>
                        </Wrapper>
                    <Wrapper>Total :    <Heading style={MetaStyle}>
                            $430
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