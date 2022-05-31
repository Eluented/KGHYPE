import { useState } from 'react';
import InputDark from 'components/input-dark';
import styled from 'styled-components';
import Button from 'components/button';
import { Link } from 'react-router-dom';
import { ADMIN_PREFIX, LOGIN_PREFIX } from 'configs/app-config';
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
} from "@mui/material";

const ButtonStyle = {
    backgroundColor: "#6F4FF2",
    width: "100%",
    borderRadius: "15px",
    marginTop: "30px"
}

export default function AdminSignUp () {
    const [formData, setFormData] = useState({});

    const setData = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value} )
    }
    return(
        <Wrapper>
            <FormControl fullWidth>
                <TextField
                  required
                  variant="outlined"
                  type="text"
                  label="Player 2 Name"
                  name="player2"
                  onChange={(e) => setData(e)}
                />
            </FormControl>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-color:#131129;
    min-height:100vh;
    color:white;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`

const Form = styled.form`
    max-width:450px;
    width:100%;
`

const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    padding-top:30px;
    font-family:Poppins;
    color:#68676E !important;
`