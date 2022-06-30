import { Heading } from 'components/heading';
import styled from 'styled-components';
import Button from 'components/button';
import { useLocation, useHistory } from 'react-router-dom';
import InputDark from 'components/input-dark';
import { useEffect, useState } from 'react';
import { deleteCustomer, updateCustomer } from 'actions/product';
import { NotifySuccess } from 'utilities';
import { ADMIN_PREFIX, CUSTOMER_PREFIX } from 'configs/app-config';

const HeadingStyle = {
    textAlign:"left"
}

const ButtonStyle = {
    backgroundColor:"#6F4FF2",
    borderRadius:"15px"
}

const DeleteBtnStyle = {
    backgroundColor:"#DC3546",
    borderRadius:"15px"
}

export default function CustomerDetailPage () {

    const location = useLocation();
    const history = useHistory();

    const [customerInfo, setInfo] = useState({
        id:"",
        email:"a",
        country:"b",
        firstname:"c",
        lastname:"d",
        phone:"e"
    })

    useEffect(() => {
        setInfo({...customerInfo, 
            id:location.state.item._id,
            email:location.state.item.email,
            country:location.state.item.country,
            firstname:location.state.item.firstname,
            lastname:location.state.item.lastname,
            phone:location.state.item.phone
        });
    }, []);

    const toUpdate = async () => {
        const response = await updateCustomer(customerInfo);
        if(response) {
            NotifySuccess("Success!");
        }
    }

    const toDelete = async () => {
        const response = await deleteCustomer(customerInfo);
        if(response){
            history.push({
                pathname: ADMIN_PREFIX + CUSTOMER_PREFIX
            })
            NotifySuccess("Success!");
        }
    }

    return(
        <Wrapper>
            <Heading style={HeadingStyle}>Customer Detail</Heading>
            <Content>
                <CustomerInfo>
                    <InputDark className="input" value={customerInfo.email} onChange={(e) => setInfo({...customerInfo,email:e.target.value})} />
                    <InputDark className="input" value={customerInfo.country} onChange={(e) => setInfo({...customerInfo,country:e.target.value})}/>
                    <InputDark className="input" value={customerInfo.firstname} onChange={(e) => setInfo({...customerInfo,firstname:e.target.value})}/>
                    <InputDark className="input" value={customerInfo.lastname} onChange={(e) => setInfo({...customerInfo,lastname:e.target.value})}/>
                    <InputDark className="input" value={customerInfo.phone} onChange={(e) => setInfo({...customerInfo,phone:e.target.value})}/>
                    <ButtonWrapper>
                        <Button style={ButtonStyle} onClick={toUpdate} text="Update"/>
                        <Button style={DeleteBtnStyle} onClick={toDelete} text="Delete"/>
                    </ButtonWrapper>
                </CustomerInfo>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    font-family:poppins;
`
const Content = styled.div`
    background-color:#1D1932;
    padding:30px;
    border-radius:20px;
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:30px;
    .input{
        background-color:#131129;
        max-width:100% !important;
        width:100% !important;
    }
    
`
const CustomerInfo = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    width:100%;
`
// const CustomerOverview = styled.div``
const ButtonWrapper = styled.div`
    display:flex;
    flex-direction:row;
    gap:30px;
    padding-top:30px;
`