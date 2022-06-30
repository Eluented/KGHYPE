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


//Firebase 

import { auth } from 'firebase.js';
import { db } from 'firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

const SignUpButton = {
    marginTop: "50px"
}

const { Coupon } = SharedImage;

export default function SignUpPage() {
    const [data, setData] = useState({

        mail: "",
        password: "",
        confirmPassword: "",
        fName: "",
        lName: "",
        phoneNum: "",
        country: ""

    });


    const register = async () => {

        try {

            if (data.password == data.confirmPassword) {
                const user = await createUserWithEmailAndPassword(auth, data.mail, data.password);

                const usersRef = db.ref("users");
                const newUserRef = usersRef.push();
                newUserRef.set({
                    mail: data.mail,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    fName: data.fName,
                    lName: data.lName,
                    phoneNum: data.phoneNum,
                    country: data.country
                }).then(() => {
                    window.location = "/p/profile";
                })
            }
        } catch (error) {
            console.log(error);
        }
    }



    const logout = async () => {

    }

    //Values

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    return (
        <div className='container-style'>
            <FormWrapper>

                <p className='create-account'>Create Your KGHYPE Account</p>
                <p className='have-account'>Already have an account? <a >Sign in</a></p>
                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                            value={data.mail}
                            id="mail"
                            variant="outlined"
                            type="text"
                            label="Email"
                            name='email'
                            onChange={(e) => handleSubmit(e)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                            value={data.password}
                            id="password"
                            variant="outlined"
                            type="password"
                            label="Password"
                            name='password'
                            onChange={(e) => handleSubmit(e)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                            value={data.confirmPassword}
                            id="confirmPassword"
                            variant="outlined"
                            type="password"
                            label="Confirm Password"
                            name='confirm password'
                            onChange={(e) => handleSubmit(e)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                            value={data.fName}
                            id="fName"
                            variant="outlined"
                            type="first name"
                            label="First Name"
                            name='firstname'
                            onChange={(e) => handleSubmit(e)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                            value={data.lName}
                            id="lName"
                            variant="outlined"
                            type="text"
                            label="Last Name"
                            name='password'
                            onChange={(e) => handleSubmit(e)}
                        />
                    </FormControl>
                </Box>

                <Box sx={{ mt: "2%", mb: "2%" }} width="100%">
                    <FormControl fullWidth>
                        <TextField
                            value={data.phoneNum}
                            id="phoneNum"
                            variant="outlined"
                            type="text"
                            label="Phone Number"
                            name='password'
                            onChange={(e) => handleSubmit(e)}
                        />
                    </FormControl>
                </Box>

                <Button onClick={register} fullWidth>Sign Up</Button>
            </FormWrapper>


            <FormControl fullWidth style={{ marginTop: "1.2rem" }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Select A Country
                </InputLabel>
                <NativeSelect defaultValue={1} id="country" value={data.country} onChange={(e) => handleSubmit(e)} inputProps={{
                    name: "country",
                    id: "country",

                }}>
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