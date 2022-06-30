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
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';


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

    const [coinbase, setcoinbaseIsActive] = useState(true);

    const handlecoinbase = event => {
        setcoinbaseIsActive(current => !current);
    };
    return (
        <>
            <Container style={ContainerStyle}>
                <Elements stripe={stripePromise}>
                    <PaymentForm />
                </Elements>

                <Heading style={HeadingStyle}>CheckOut Cart</Heading>
                <TransferListWrapper>
                    <TransferItem>
                        <ImageWrapper src={Transfer} alt="transfer" />
                        <p>The CSS Grid Layout Module offers a grid-based layout system, with rows and columns, making it easierThe CSS Grid Layout Module offers a grid-based layout system, with rows and columns, making it easier</p>
                        <Button style={ButtonStyle} text='Top Up Offers' />
                    </TransferItem>
                    <TransferItem>
                        <ImageWrapper src={BankTransfer} alt="transfer" />
                        <p>Overseas T/T transfer will incur a handling fee of 65 HKD. The remitter need to pay the handling fee in full. Moreover, the remitted amount credited to the bank after deducting the handling fee shall equal the exact payable amount. </p>
                        <Button style={ButtonStyle} text='Top Up Offers' />
                    </TransferItem>
                </TransferListWrapper>
                <OtherPaymentWrapper>


                    <PaymentOptionCard>
                        <ImageWrapper src={Airpal} alt="bitcoin" />
                        <TextWrapper>
                            The CSS Grid Layout Module offers a grid-based layout system, with rows and columns, making it easier
                        </TextWrapper>
                    </PaymentOptionCard>
                    <PaymentOptionCard onClick={handleCLick}>
                        <ImageWrapper src={Paypal} alt="bitcoin" />
                        <TextWrapper>
                            Cover 202 countries or regions | 25 currencies are supported, and currency exchang...                        </TextWrapper>
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
                        <ImageWrapper style={{ width: "100px" }} src={"https://logolook.net/wp-content/uploads/2021/07/Cash-App-Logo.png"} alt="bitcoin" />
                        <TextWrapper>
                            Scan the QR Code to order using CahsApp
                        </TextWrapper>
                    </PaymentOptionCard>
                    <div className={cashappIsActive ? "hidden" : ""} style={{ maxWidth: "900px", minHeight: "200px", paddingLeft: "" }}>
                        <img src={"https://media.discordapp.net/attachments/841376507792064623/984441944476373022/image.png?width=324&height=701"}></img>
                    </div>

                    <PaymentOptionCard onClick={handlecoinbase}>
                        <ImageWrapper style={{ width: "50px", height: "50px" }} src={Bitcoin} alt="bitcoin" />
                        <TextWrapper>
                            Pay with crypto
                        </TextWrapper>
                    </PaymentOptionCard>
                    <div className={coinbase ? "hidden" : ""}>
                        <CoinbaseCommerceButton checkoutId={'8e7de7c7-73af-4589-a15a-a6eb688709bb'} styled="yes" />
                    </div>
                </OtherPaymentWrapper>




                <StatusWrapper>
                    <BalanceWrapper>
                        <Heading>Balance:</Heading>
                        <Heading>$450</Heading>
                    </BalanceWrapper>
                    <Button text='Submit' />
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
    max-width:400px;
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
    gap:10px;
`