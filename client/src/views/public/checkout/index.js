import styled from 'styled-components';
import { Container } from 'components/container';
import { Heading } from 'components/heading';
import { IconImage } from 'constants/image-constant';
import ImageWrapper from 'components/image-wrapper';
import Button from 'components/button';
import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from "react";
//Firebase 
import { auth } from 'firebase.js';
import { db } from 'firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

import GooglePayButton from "@google-pay/button-react";


import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js"; import ReactDOM from "react-dom"
import {
    Elements,
    CardElement,
    useElements,
    useStripe,
    PaymentElement
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const { Transfer, BankTransfer, Bitcoin, Airpal, Paypal, Venmo, VenmoQR, CahsAppQR, CahsApp } = IconImage;

const HeadingStyle = {
    textAlign: "left"
}

const ButtonStyle = {
    width: "100%",
    marginTop: "30px"
}

const ButtonCool = styled.button`
  background-color: #4B0082;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const ContainerStyle = {
    paddingTop: "50px"
}
const stripePromise = loadStripe("pk_live_51KihIrD2KWeadjUQo8QhkIEInHEGUHVYCeRIQddXTOHqQgXiWRGoc8mYE3zqFyhAlirEsjTS1dHpFDnpYnZ0ELeO00ZmpIWgbS");

var paypalIsActive = true;

const handleSubmit = (stripe, elements) => async () => {
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        payment_method: 'pm_card_visa',

    });

    if (error) {
        console.log('[error]', error);
    } else {
        console.log('[PaymentMethod]', paymentMethod);
        // ... SEND to your API server to process payment intent
    }
};
function history() {

    onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            //Add to cart
            const usersRef = await db.ref("users");
            usersRef.once('value', function (snapshot) {
                snapshot.forEach(function (usersSnapshot) {
                    var usersData = usersSnapshot.val();


                    if (usersData.mail == currentUser.email) {
                        var ref = db.ref(`users/${usersSnapshot.key}/cart`);
                        ref.on("value", function (snapshot) {
                            console.log(snapshot.val());

                            // generate random number between 10000 and 10000000
                            var randomNumber = Math.floor(Math.random() * (10000000 - 10000 + 1)) + 10000;
                            var orderId = randomNumber.toString();
                            const usersRef = db.ref('users/' + usersSnapshot.key + '/history/' + orderId);
                            var today = new Date();
                            var date_order = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

                            usersRef.update({
                                order_time: date_order,
                                order_number: orderId,
                                total_price: '324',
                                order_status: "Pending",

                            })

                            for (var i in snapshot.val()) {
                                const usersRef = db.ref('users/' + usersSnapshot.key + '/history/' + orderId + '/products/' + i);
                                usersRef.update({
                                    product: snapshot.val()[i],
                                }).then(() => {
                                    window.location = "/p/confirm"
                                })
                            }

                        }
                            , function (errorObject) {
                                console.log("The read failed: " + errorObject.code);
                            }
                        );
                    }

                });
            });

        }
    })


}

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    return (
        <>
            <h1>Checkout</h1>
            <CardElement />
            <ButtonCool onClick={handleSubmit(stripe, elements)}>Buy</ButtonCool>
        </>
    );
}

const amount = "2";
const currency = "USD";
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        // Your code here after capture the order
                    });
                }}
            />
        </>
    );
}


function ActivatePaypal() {
    if (paypalIsActive)
        paypalIsActive = false;
    else
        paypalIsActive = true;
    console.log(paypalIsActive);
}

export default function CheckoutPage() {

    const [isActive, setIsActive] = useState(true);

    const handleCLick = event => {
        setIsActive(current => !current);
    };

    const [venmoIsActive, setVenmoIsActive] = useState(true);

    const handleVenmo = event => {
        setVenmoIsActive(current => !current);
    };

    const [cashappIsActive, setCashappIsActive] = useState(true);

    const handleCashapp = event => {
        setCashappIsActive(current => !current);
    };

    return (
        <>
            <Container style={ContainerStyle}>
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>


                <Heading style={HeadingStyle}>CheckOut Cart</Heading>
                <TransferListWrapper>

                    <TransferItem style={{ width: "100%" }}>
                        <ImageWrapper src={BankTransfer} alt="transfer" />
                        <p>Overseas T/T transfer will incur a handling fee of 65 HKD. The remitter need to pay the handling fee in full. Moreover, the remitted amount credited to the bank after deducting the handling fee shall equal the exact payable amount. </p>
                        <Button style={ButtonStyle} text='Top Up Offers' />
                    </TransferItem>
                </TransferListWrapper>



                <OtherPaymentWrapper>


                    <PaymentOptionCard>
                        <ImageWrapper src={Bitcoin} alt="bitcoin" />
                        <TextWrapper>
                            Pay with Wallet.If the amount is less than the order amount due to exchange rate fluctuations, the payment will fall and it will be topped up to your Superbuy account balance.No withdrawal if paying with this.For any other questions, feel free to contact Customer Service.                        </TextWrapper>
                    </PaymentOptionCard>

                    <PaymentOptionCard style={{ display: "none" }}>
                        <ImageWrapper src={Airpal} alt="bitcoin" />
                        <TextWrapper>
                            The CSS Grid Layout Module offers a grid-based layout system, with rows and columns, making it easier
                        </TextWrapper>
                    </PaymentOptionCard>



                    <PaymentOptionCard style={{ display: "none" }} onClick={handleCLick}>
                        <ImageWrapper src={Paypal} alt="bitcoin" />
                        <TextWrapper>
                            Cover 202 countries or regions | 25 currencies are supported, and currency exchang...
                        </TextWrapper>
                    </PaymentOptionCard>

                    <div className={isActive ? "hidden" : ""} style={{ maxWidth: "900px", minHeight: "200px", paddingLeft: "" }}>
                        <PayPalScriptProvider
                            options={{
                                "client-id": "test",
                                components: "buttons",
                                currency: "USD"
                            }}
                        >
                            <ButtonWrapper
                                currency={currency}
                                showSpinner={false}
                            />
                        </PayPalScriptProvider>
                    </div>

                    <PaymentOptionCard onClick={handleVenmo}>
                        <ImageWrapper style={{ width: "50px" }} src={"https://ludwigshorseshow.com/wp-content/uploads/2021/03/venmo-logo.png"} alt="bitcoin" />
                        <TextWrapper>
                            Scan the QR Code to order using Venmo
                        </TextWrapper>
                    </PaymentOptionCard>

                    <div className={venmoIsActive ? "hidden" : ""} style={{ maxWidth: "900px", minHeight: "200px", paddingLeft: "" }}>
                        <ImageWrapper src={"https://media.discordapp.net/attachments/841376507792064623/984442911561232414/IMG_9216.jpg?width=383&height=702"} />
                    </div>

                    <PaymentOptionCard onClick={handleCashapp}>
                        <ImageWrapper style={{ width: "50px" }} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/1200px-Square_Cash_app_logo.svg.png"} alt="bitcoin" />
                        <TextWrapper>
                            Scan the QR Code to order using CahsApp
                        </TextWrapper>
                    </PaymentOptionCard>

                    <div className={cashappIsActive ? "hidden" : ""} style={{ maxWidth: "900px", minHeight: "200px", paddingLeft: "" }}>
                        <img src={"https://media.discordapp.net/attachments/841376507792064623/984441944476373022/image.png?width=324&height=701"}></img>
                    </div>

                    <PaymentOptionCard onClick={handleCashapp}>
                        <ImageWrapper style={{ width: "50px" }} src={"https://logodownload.org/wp-content/uploads/2022/03/zelle-logo-3.png"} alt="bitcoin" />
                        <TextWrapper>
                            You can also pay easily trough Zelle
                        </TextWrapper>
                    </PaymentOptionCard>

                    <div className={cashappIsActive ? "hidden" : ""} style={{ maxWidth: "900px", minHeight: "200px", paddingLeft: "" }}>
                        <img src={"https://media.discordapp.net/attachments/841376507792064623/984441944476373022/image.png?width=324&height=701"}></img>
                    </div>

                    <PaymentOptionCard>
                        <ImageWrapper style={{ width: "100px" }} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png"} alt="bitcoin" />
                        <TextWrapper>
                            Pay your products using Apple Pay
                        </TextWrapper>
                    </PaymentOptionCard>

                    <PaymentOptionCard>
                        <GooglePayButton
                            environment="TEST"
                            paymentRequest={{
                                apiVersion: 2,
                                apiVersionMinor: 0,
                                allowedPaymentMethods: [
                                    {
                                        type: 'CARD',
                                        parameters: {
                                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                        },
                                        tokenizationSpecification: {
                                            type: 'PAYMENT_GATEWAY',
                                            parameters: {
                                                gateway: 'example',
                                                gatewayMerchantId: 'exampleGatewayMerchantId',
                                            },
                                        },
                                    },
                                ],
                                merchantInfo: {
                                    merchantId: '12345678901234567890',
                                    merchantName: 'Demo Merchant',
                                },
                                transactionInfo: {
                                    totalPriceStatus: 'FINAL',
                                    totalPriceLabel: 'Total',
                                    totalPrice: '100.00',
                                    currencyCode: 'USD',
                                    countryCode: 'US',
                                },
                            }}
                            onLoadPaymentData={paymentRequest => {
                                console.log('load payment data', paymentRequest);
                            }}
                        />
                        <TextWrapper>
                            Pay your products using G-Pay
                        </TextWrapper>
                    </PaymentOptionCard>



                    <PaymentOptionCard>
                        <ImageWrapper style={{ width: "50px" }} src={"https://www.freeiconspng.com/thumbs/bank-icon/bank-icon-5.png"} alt="bitcoin" />

                        <TextWrapper>
                            Your balance is 500$
                        </TextWrapper>
                    </PaymentOptionCard>



                </OtherPaymentWrapper>




                <StatusWrapper>

                    <Button text='Submit' onClick={history} />
                </StatusWrapper>
            </Container>
        </>
    )
}

const TransferListWrapper = styled.div`
display:flex;
flex-direction:row;
gap:100px;
padding-top:50px;
`

const TransferItem = styled.div`
    width:100%;
    max-width:100%;
    background: #EEF2F5;
    padding: 20px;
    border-radius: 10px
`

const OtherPaymentWrapper = styled.div`
padding-top:100px;
padding-bottom:50px;
display:flex;
flex-direction:column;
gap:30px;
`

const PaymentOptionCard = styled.div`
background-color:#EEF2F5;
border-radius: 10px;
padding:20px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
`

const TextWrapper = styled.div`
`

const StatusWrapper = styled.div`
padding-bottom:100px;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
`

const BalanceWrapper = styled.div`
display:flex;
flex-direction:row;
gap: 10px;
`