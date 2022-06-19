import React from 'react';
import { Box } from "@mui/system";
import ImageWrapper from 'components/image-wrapper'
import styled from 'styled-components'
import { SharedImage } from 'constants/image-constant'
import { useState } from 'react'
import { signUp } from 'actions/users';
import { NotifySuccess, NotifyFail } from 'utilities'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Button,
    Select,
    CircularProgress,
    Typography,
    TextField,
    Container,
    NativeSelect,
} from "@mui/material";
import countryList from './countryList.js'
import MuiPhoneNumber from 'material-ui-phone-number';
import './index.css'


const SignUpButton = {
    marginTop: "50px"
}



const { Coupon } = SharedImage;

export default function SignUpPage() {
    const [formData, setFormData] = useState({});

    const SignUpUser = async (e) => {
        e.preventDefault();
        const result = await signUp(formData);
        if (result.data.data) {
            NotifySuccess("Success");
        } else{
            NotifyFail(result.data.msg);
        }
    }

    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='container-style'>        
            <FormWrapper>

                <p className='create-account'>Create Your KGHYPE Account</p>
                <p className='have-account'>Already have an account? <a >Sign in</a></p>
                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                        variant="outlined"
                        type="text"
                        label="Email"
                        name='email'
                        onChange={(e) => setData(e)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                        variant="outlined"
                        type="password"
                        label="Password"
                        name='password'
                        onChange={(e) => setData(e)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                        variant="outlined"
                        type="password"
                        label="Confirm Password"
                        name='confirm password'
                        onChange={(e) => setData(e)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                        variant="outlined"
                        type="first name"
                        label="First Name"
                        name='firstname'
                        onChange={(e) => setData(e)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                        variant="outlined"
                        type="text"
                        label="Password"
                        name='password'
                        onChange={(e) => setData(e)}
                        />
                    </FormControl>
                </Box>

                <MuiPhoneNumber 
                variant="outlined" 
                fullWidth 
                defaultCountry={'us'}
                />

                <Button fullWidth>Sign Up</Button>
            </FormWrapper>
            

            <FormControl fullWidth style={{ marginTop: "1.2rem" }}>
    <InputLabel variant="standard" htmlFor="uncontrolled-native">
        Select A Country
    </InputLabel>
    <NativeSelect defaultValue={1} inputProps={{
                      name: "country",
                      id: "uncontrolled-native"}}>
                   {countryList.map((country, index) => {
                       return <option value={index + 1} key={index}>
                                  {country}
                              </option>;
                    })}
    </NativeSelect>
</FormControl>

            <CouponWrapper>
                <ImageWrapper src={Coupon} alt="coupon" />
            </CouponWrapper>
        </div>
    )
}


const FormWrapper = styled.form`
    max-width:780px;
    flex:1;
    padding-left:100px;
    @media screen and (max-width:960px){
        padding-left:0px;
    }
`

const CouponWrapper = styled.div`
    max-width:100%;
    height:auto;
    flex:1;
    display:flex;
    flex-direction:row;
    align-items:flex-end;
    @media screen and (max-width:960px){
        display:none;
    }
`