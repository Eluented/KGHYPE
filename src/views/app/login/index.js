import styled from 'styled-components'
import InputDark from "components/input-dark";
import Button from 'components/button';
import { adminSign } from 'actions/users';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ADMIN_PREFIX } from 'configs/app-config';
import { adminSigned } from 'store/actions/actions';
import { connect } from "react-redux";

const ButtonStyle = {
    backgroundColor: "#6F4FF2",
    width: "100%",
    borderRadius: "15px",
    marginTop: "30px"
}

const TotalWrapper = {
    justifyContent: "space-between"
}

const ForgotPassword = {
    color: "#DC3546"
}

const RememberMe = {
    paddingLeft: "15px"
}

function AdminLoginPage(props) {
    const history = useHistory();
    const [formData, setFormData] = useState({});

    const AdminSign = async (e) => {
        e.preventDefault();
        const data = await adminSign(formData);
        if (data === 1) {
            props.userSigned();
            history.push(ADMIN_PREFIX);
        }
    }

    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Wrapper>
            <LoginForm>
                <InputDark label="Username" onChange={(e) => setData(e)} name="username" />
                <InputDark label="PassWord" type='password' name="password" onChange={(e) => setData(e)} />
                <TextWrapper>
                    <Row style={TotalWrapper}>
                        <Row>
                            <input type="checkbox" id="remember-me" name="remeber-me" />
                            <label for="remember-me" style={RememberMe}>
                                Remember Me
                            </label>
                        </Row>
                        <div style={ForgotPassword}>Forgot Password</div>
                    </Row>
                </TextWrapper>
                <Button style={ButtonStyle} onClick={(e) => AdminSign(e)} text="Sign in" />
            </LoginForm>
        </Wrapper>
    )
}


const mapStateToProps = state => {
    return {
        admin__state: state.userState.admin__state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userSigned: () => dispatch(adminSigned())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginPage)



const LoginForm = styled.form`
    max-width:480px;
    width:100%;
`

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    min-height:100vh;
    background-color:#131129;
    font-family:Poppins;
    position:absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
`

const TextWrapper = styled.div`
    text-align:center;
    color:#68676E !important;
    padding-top:20px;
`

const Row = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`