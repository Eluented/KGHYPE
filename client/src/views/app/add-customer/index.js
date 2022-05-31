import { useState, useEffect } from 'react';
import { Heading } from 'components/heading';
import InputDark from 'components/input-dark';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import { PlusCircle } from "react-bootstrap-icons";
import Button from 'components/button';
import { addCustomer } from 'actions/product';
import { NotifySuccess, NotifyFail } from 'utilities';
import styled from 'styled-components';

const InputStyle = {
    backgroundColor: "#131129"
}

const HeadingStyle = {
    textAlign: "left"
}

const addSaveStyle = {
    backgroundColor: "#6F4FF2",
    padding: "5px",
    width: "30px",
    margin: "5px"
}

export default function AddProductPage() {

    const [formData, setFormData] = useState({});
    
    const toAddProduct = async (e) => {
        e.preventDefault();
        const data = await addCustomer(formData);
        if (data) {
            NotifySuccess('Success!')
        } else {
            NotifyFail('Error Ocurred');
        }
    }
    

    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <>
            <HeaderWrapper>
                <Heading style={HeadingStyle}>Add Customers</Heading>
                <div>
                    <Button style={addSaveStyle} onClick={toAddProduct} text={<PlusCircle />} />
                </div>
            </HeaderWrapper>
            <Tabs>
                <TabList>
                    <Tab>Role</Tab>
                </TabList>
                <TabPanel>
                    <InputDark style={InputStyle} value={formData.emailaddress} name='email' onChange={(e) => setData(e)} label="Email Address" />
                    <InputDark type='password' style={InputStyle} value={formData.password} name='password' onChange={(e) => setData(e)} label="Password" />
                    <InputDark type='password' style={InputStyle} value={formData.confirmpassword} name='cfpassword' onChange={(e) => setData(e)} label="Confirm Password" />
                    <InputDark style={InputStyle} value={formData.country} name='country' onChange={(e) => setData(e)} label="Country" />
                    <InputDark style={InputStyle} value={formData.firstname} name='firstname' onChange={(e) => setData(e)} label="Firstname" />
                    <InputDark style={InputStyle} value={formData.lastname} name='lastname' onChange={(e) => setData(e)} label="Lastname" />
                    <InputDark style={InputStyle} value={formData.phonenumber} name='phone' onChange={(e) => setData(e)} label="Phone Number" />
                </TabPanel>
            </Tabs>
        </>
    )
}

const HeaderWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    padding-bottom:30px;
    justify-content:space-between;
`