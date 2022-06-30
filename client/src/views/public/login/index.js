import styled from 'styled-components';
import Input from "components/input";
import { Container } from 'components/container';
import { Heading } from 'components/heading';
import Button from 'components/button';
import { Link } from 'react-router-dom';
import { PUBLIC_PREFIX, SIGNUP_PREFIX } from 'configs/app-config';
import { useState } from 'react';
import { signIn } from 'actions/users';
import { signed } from 'store/actions/actions';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import { NotifyFail } from 'utilities';


//Firebase 

import { auth } from 'firebase.js';
import { db } from 'firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"


const HeadingStyle = {
    color: "#072A48",
    fontWeight: "800",
    fontSize: "40px",
    margin: "0px",
    paddingBottom: "30px"
}

const LoginButton = {
    marginTop: "50px"
}

function LoginPage(props) {
    const [data, setData] = useState({
        mail: "",
        password: "",
    });

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser)
            window.location = "/p/profile"

    })

    //Values

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, data.mail, data.password);

            window.location = "/p/profile";
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <ContentWrapper>
                <FormWrapper>
                    <Input label="Email address" name="email" value={data.mail} id="mail" onChange={e => handleSubmit(e)} />
                    <Input label="Password" type='password' name="password" value={data.password} id="password" onChange={e => handleSubmit(e)} />
                    <Row>
                        <span>
                            Forgot password
                        </span>
                        <Link to={PUBLIC_PREFIX + SIGNUP_PREFIX}>
                            Sign up
                        </Link>
                    </Row>
                    <Button text="Login" style={LoginButton} onClick={login} />
                </FormWrapper>
                <Wrapper>
                    <Heading style={HeadingStyle}>
                        New Customer ?
                    </Heading>
                    <NoteList>
                        <li>Become a member of KGHYPE</li>
                        <li>Check out faster</li>
                        <li>Access your order history</li>
                        <li>Track new orders</li>
                    </NoteList>
                </Wrapper>
            </ContentWrapper>
        </Container>
    )
}


const mapStateToProps = state => {
    return {
        user__state: state.userState.user__state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userSigned: () => dispatch(signed())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)


const FormWrapper = styled.form`
    max-width:500px;
    flex:1;
    @media screen and (max-width:760px) {
        width:100%;
        max-width:100%;
    }
`

const Row = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding-top:20px;
`

const NoteList = styled.ul`
    display:flex;
    flex-direction:column;
    gap:20px;
    padding:0px;
    margin:0px;
    list-style:none;
    font-size:18px;
    font-family:Open Sans;
`
const Wrapper = styled.div`
    padding-left:100px;
    @media screen and (max-width:760px) {
        padding-left:0px;
        padding-top:50px;
    }
`

const ContentWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:flex-start;
    flex-flow:wrap;
    padding:50px 20px;
    justify-content:center;
    @media screen and (max-width:760px) {
        flex-direction:column !important;
    }
`