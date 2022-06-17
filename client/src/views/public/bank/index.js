import styled from 'styled-components';
import { Container } from "components/container"
import { Heading } from "components/heading";
import { SharedImage } from "constants/image-constant"
import ImageWrapper from 'components/image-wrapper';
import Button from 'components/button';
import { flexbox, grid } from '@mui/system';

const { Profile } = SharedImage;

const HeadingStyle = {
    textAlign: "left"
}

const BankContentWrapper = styled.div`
    display:flex;
    flex-direction:row;
    gap:200px;
    padding-top:50px;
`

export default function BankPage() {
    return (
        <Container>

            <BankContentWrapper>
                <DesCard style={{ width: "30%" }}>
                    <Heading style={HeadingStyle}>USD Account</Heading>
                    <p>Bank name:
                        First Century Bank
                        <br />
                        Bank address:
                        1731 N Elm St  Commerce, GA 30529 USA
                        <br />
                        Routing (ABA):
                        061120084
                        <br />
                        Account number:
                        4025768049534
                        <br />
                        Account type:
                        CHECKING
                        <br />
                        Beneficiary name:
                        Shiftery lLC
                    </p>
                </DesCard>
                <DesCard style={{ width: "30%" }}>
                    <Heading style={HeadingStyle}>AUD Account</Heading>
                    <p>
                        Bank name:
                        Citibank
                        <br />
                        Bank address:
                        2 Park Street, Sydney NSW 2000
                        <br />
                        Branch code (BSB):
                        248024
                        <br />
                        Account number:
                        10206827
                        <br />
                        Beneficiary name:
                        Shiftery lLC
                    </p>
                </DesCard>
                <DesCard style={{ width: "30%" }}>
                    <Heading style={HeadingStyle}>GBP Account</Heading>
                    <p>
                        Bank name:
                        Barclays
                        <br />
                        Sort code:
                        231486
                        <br />
                        Account number:
                        12966029
                        <br />
                        Beneficiary name:
                        Shiftery lLC
                    </p>
                </DesCard>
            </BankContentWrapper>


        </Container>
    )
}

const ProfileWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`
const ProfileMetaWrapper = styled.div`
    padding-left:50px;
`
const AfillateWrapper = styled.div`
    padding-left:50px;
    flex:1;
`

const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    .bonus-wrapper{
        gap:50px;
    }
    .bonus-info{
        gap:50px;
    }
    .bonus-row{
        gap:10px;
    }

`

const DesCard = styled.div`
    background-color:#EEF2F5;
    padding:20px;

`

const DesContentWrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:30px;
    width: 30%;
    padding:100px 20px;
`