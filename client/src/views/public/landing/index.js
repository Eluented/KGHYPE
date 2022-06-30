import { Container } from 'components/container';
import { Heading } from 'components/heading';
import ProductCard from 'components/product-card';
import SearchBox from 'components/search-box';
import StepCard from 'components/step-card';
import styled from 'styled-components';
import { CategoryImage } from 'constants/image-constant';
import ImageWrapper from 'components/image-wrapper';
import { StepImage } from 'constants/image-constant';
import { SharedImage } from 'constants/image-constant';
import Link from 'components/link';
import { searchProduct } from "actions/product"
import { NotifySuccess, NotifyFail } from 'utilities';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PUBLIC_PREFIX, SEARCH_PREFIX, PRODUCT_DETAIL_PREFIX, PRODUCT_PREFIX } from 'configs/app-config';

const { Bg, Landing } = SharedImage;
const { Cloth, Foot, Handbag, Watch, Jewelry, Baby, Phone, Desktop, Home, Food } = CategoryImage;
const { Step1, Step2, Step3, Step4, Step5, Step6 } = StepImage;

const HeadingStyle = {
    backgroundColor: '#072A48',
    borderRadius: "30px",
    padding: "30px",
    fontSize: "46px",
    color: "white",
    maxWidth: "700px",
    fontWeight: "bold"
}

const ContainerStyle = {
    padding: "100px 0px"
}

const StepText1 = {
    fontSize: "18px",
    textAlign: "left"
}
const StepText2 = {
    textAlign: "left"
}

const BgTextStyle = {
    textAlign: "left",
    padding: "30px"
}

const CaptionStyle = {
    paddingBottom: "50px"
}



export default function LandingPage() {
    const history = useHistory();

    const [formData, setFormData] = useState({});
    const toSearchProduct = async (e) => {
        e.preventDefault();
        const response = await searchProduct(formData);
        if (response) {
            console.log("res:", response);
            if (response.flag === 2) {
                history.push({
                    pathname: PUBLIC_PREFIX + SEARCH_PREFIX,
                    state: {
                        item: response.data
                    }
                })
            } else {
                history.push({
                    pathname: PUBLIC_PREFIX + PRODUCT_DETAIL_PREFIX,
                    state: {
                        detail_item: response.data
                    }
                })
            }
        } else {
            NotifyFail('Error Ocurred');
        }
    }

    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Wrapper>
                <HeroWrapper>
                    <Heading style={HeadingStyle}>EASY, FAST, SAFE <br /> ALL IN ONE PACKAGE</Heading>
                    <br />
                    <br />
                    <br />
                    <SearchBox name='search' onChange={(e) => setData(e)} value={formData.search} onClick={toSearchProduct} />
                    <br />
                    <StepList>
                        <li className="wow fadeInUp">
                            <StepCard icon="user" text='Create Account' />
                        </li>
                        <li className="wow fadeInUp" data-wow-delay=".1s">
                            <StepCard icon="user" text='Find an item' />
                        </li>
                        <li className="wow fadeInUp" data-wow-delay=".3s">
                            <StepCard icon="user" text='Check Quality' />
                        </li>
                        <li className="wow fadeInUp" data-wow-delay=".3s">
                            <StepCard icon="user" text='Buy Items' />
                        </li>
                        <li className="wow fadeInUp" data-wow-delay=".3s">
                            <StepCard icon="user" text='Get your items' />
                        </li>
                    </StepList>
                </HeroWrapper>
                <Container className='wow fadeInUp' style={ContainerStyle}>
                    <Heading className='wow fadeInUp' style={CaptionStyle}>Our Top Picks</Heading>
                    <ProductList className='wow fadeInUp'>
                        <li>
                            <ProductCard button="true" />
                        </li>
                        <li>
                            <ProductCard button="true" />
                        </li>
                        <li>
                            <ProductCard button="true" />
                        </li>
                        <li>
                            <ProductCard button="true" />
                        </li>
                    </ProductList>
                </Container>
                <ShopWrapper style={{ borderRadius: "100px" }}>
                    <Heading className='wow fadeInUp'>Find Anything You Want</Heading>
                    <TextWrapper className='wow fadeInUp'>
                        The Biggest Assortment Of Goods From Taobao, Weidian And 1688.
                    </TextWrapper>
                    <CategoryList className='wow fadeInUp'>
                        <li>
                            <ImageWrapper src={Cloth} alt='cateogry' />
                            <Heading>
                                Clothing
                            </Heading>
                        </li>
                        <li>
                            <ImageWrapper src={Foot} alt='cateogry' />
                            <Heading>
                                Footwear
                            </Heading>
                        </li>
                        <li>
                            <ImageWrapper src={Handbag} alt='cateogry' />
                            <Heading>
                                Handbag
                            </Heading>
                        </li>
                        <li>
                            <ImageWrapper src={Watch} alt='cateogry' />
                            <Heading>
                                Accessories
                            </Heading>
                        </li>
                        <li>
                            <ImageWrapper src={Jewelry} alt='cateogry' />
                            <Heading>
                                Jewelry
                            </Heading>
                        </li>
                        <li>
                            <ImageWrapper src={Baby} alt='cateogry' />
                            <Heading>
                                Baby & Kids
                            </Heading>
                        </li>
                        <li>
                            <ImageWrapper src={Phone} alt='cateogry' />
                            <Heading>
                                Electronics
                            </Heading>
                        </li>
                        <li>
                            <ImageWrapper src={Desktop} alt='cateogry' />
                            <Heading>
                                Computers
                            </Heading>
                        </li>
                        <li>
                            <ImageWrapper src={Home} alt='cateogry' />
                            <Heading>
                                Home
                            </Heading>
                        </li>
                        <li>
                            <ImageWrapper src={Food} alt='cateogry' />
                            <Heading>
                                Food & Drinks
                            </Heading>
                        </li>
                    </CategoryList>
                </ShopWrapper>
                <Container style={ContainerStyle}>
                    <Heading className='wow fadeInUp'>Our Purchasing Process</Heading>
                    <StepWrapper>
                        <StepImageWrapper className='wow fadeInLeft'>
                            <ImageWrapper src={Step1} alt="step" />
                        </StepImageWrapper>
                        <TextStepWrapper>
                            <Heading className='wow fadeInUp' style={StepText2}>Everything You’ve
                                Always Wanted</Heading>
                            <p style={{ fontSize: "20px" }} className='wow fadeInUp'>The Easiest Way Of Finding The Items You Want Is With KGHYPE. A Simple And Safe Browsing Experience With Only The Highest Quality Of Items. Genuinely The Best Website TO Bulk Buy Anything You Need!
                            </p>
                        </TextStepWrapper>
                    </StepWrapper>
                    <StepWrapper>
                        <TextStepWrapper2>
                            <Heading className='wow fadeInUp' style={StepText2}>Order Your Item(s)</Heading>
                            <p style={{ fontSize: "20px" }} className='wow fadeInUp'>With Your Shopping Cart Full, Check Out With A Variety Of Safe And Well Known Payment Methods.Once The Payment IsProcessed Our Agents Get Notified And The Items Are Purchased Within 24 Hours And Already On Their Way To Our Warehouse For Quality Checking.</p>
                        </TextStepWrapper2>
                        <StepImageWrapper className='wow fadeInRight'>
                            <ImageWrapper src={Step2} alt="step" />
                        </StepImageWrapper>
                    </StepWrapper>
                    <StepWrapper>
                        <StepImageWrapper className='wow fadeInLeft'>
                            <ImageWrapper src={Step3} alt="step" />
                        </StepImageWrapper>
                        <TextStepWrapper>
                            <Heading className='wow fadeInUp' style={StepText2}>Quality Inspection</Heading>
                            <p style={{ fontSize: "20px" }} className='wow fadeInUp'>Once The Items Are In Our Warehouse, You Will Receive Pictures To Ensure The Quality Of Your Ordered Item. There’s No Need to Hurry In Making A Decision Though, As We Store Your Items For 180 Days Without Any Cost Towards You Ready To Be Shipped Out At Any Moment.</p>
                        </TextStepWrapper>
                    </StepWrapper>
                    <StepWrapper>
                        <TextStepWrapper2>
                            <Heading className='wow fadeInUp' style={StepText2}>Packaging Your Item(s)</Heading>
                            <p style={{ fontSize: "20px" }} className='wow fadeInUp'>Once You Choose Your Shipping Method , Your Items Will Be Packaged Extremely Well To Make Sure They Arrive In One Piece. They Are Shipped Within 24 hours of your Purchase.</p>
                        </TextStepWrapper2>
                        <StepImageWrapper className='wow fadeInRight'>
                            <ImageWrapper src={Step4} alt="step" />
                        </StepImageWrapper>
                    </StepWrapper>
                    <StepWrapper>
                        <StepImageWrapper className='wow fadeInLeft'>
                            <ImageWrapper src={Step5} alt="step" />
                        </StepImageWrapper>
                        <TextStepWrapper>
                            <Heading className='wow fadeInUp' style={StepText2}>International Shipping</Heading>
                            <p style={{ fontSize: "20px" }} className='wow fadeInUp'>Nobody Likes Waiting For Their Stuff, I Get it.But The Good News Is That It Will Soon Be At Your Doorstep, And With Your Tracking Number, You Can Get Detailed Info On How Close Your Items Are!</p>
                        </TextStepWrapper>
                    </StepWrapper>
                    <StepWrapper>
                        <TextStepWrapper2>
                            <Heading className='wow fadeInUp' style={StepText2}>It’s Here!</Heading>
                            <p style={{ fontSize: "20px" }} className='wow fadeInUp'>Your Package Is Finally Here! If You Have Any Questions Or Are Not Satisfied With Something, Contact Support And Get It fixed ASAP. Thank You For Shopping With KGHYPE!</p>

                        </TextStepWrapper2>
                        <StepImageWrapper className='wow fadeInRight'>
                            <ImageWrapper src={Step6} alt="step" />
                        </StepImageWrapper>
                    </StepWrapper>
                </Container>
                <Container style={{ backgroundColor: "#072A48", borderTopRightRadius: "30px", borderTopLeftRadius: "30px" }}>
                    <br />
                    <center><Heading style={HeadingStyle}>Why Choose Us</Heading></center>
                    <br />
                    <br />
                    <img style={{ width: "100%" }} src={'https://media.discordapp.net/attachments/708033159538802819/987472013323038810/Image_footer.PNG?width=860&height=523'}></img>
                </Container>
                <Container style={{ backgroundColor: "#072A48" }}>
                    <img style={{ width: "100%" }} src={'https://media.discordapp.net/attachments/708033159538802819/987472424461287504/Image_Footer2.PNG?width=860&height=213'}></img>
                </Container>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    align-items:center;

`
const HeroWrapper = styled.div`
    background-image:url("https://i.postimg.cc/HstKsLKq/kghype-landing.png");
    min-height:420px;
    width:100%;
    background-position:center;
    background-repeat:no-repeat;
    background-size:cover;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    padding:50px 0px;
`
const StepList = styled.ul`
    padding-top:30px !important;
    list-style:none;
    padding:0px;
    margin:0px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    gap:30px;
    flex-flow:wrap;
`
const ProductList = styled.ul`
    list-style:none;
    display:flex;
    flex-direction:row;
    justify-content:center;
    gap:30px;
    flex-flow:wrap;
    margin:0px;
    padding:0px;
`
const ShopWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background: #072A48;
    color:white;
    width:100%;
    padding:100px 0px;
`
const TextWrapper = styled.div`
    text-align:center;
    max-width:750px;
`
const CategoryList = styled.ul`
    padding-top:50px !important;
    list-style:none;
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin:0px;
    padding:0px;
    gap:100px;
    flex-flow:wrap;
    max-width:1240px;
    li{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
`
const StepWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    @media screen and (max-width:890px) {
        flex-direction:column;
    }
`
const TextStepWrapper = styled.div`
    flex:1;
    max-width:650px;
    padding:60px;
    background-color: #072A48;
    border-radius: 100px;
    color: white;
    @media screen and (max-width:890px) {
        padding-left:0px;
        order:2;
    }
`
const TextStepWrapper2 = styled.div`
    flex:1;
    max-width:650px;
    padding:60px;
    background-color: #072A48;
    border-radius: 100px;
    color: white;
    @media screen and (max-width:890px) {
        padding-right:0px;
        order:2;
    }
`
const StepImageWrapper = styled.div`
    max-width:660px;
    height:auto;
    flex:1;
    @media screen and (max-width:890px) {
        order:1;
    }
`

const ButtonWrapper = styled.div`
    display:flex;
    flex-direction:row;
    flex-flow:wrap;
    gap:30px;
    padding-top:50px;
`
const BgWrapper = styled.div`
    background-color:#EEF2F5;
    margin:100px 0px;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    @media screen and (max-width:1120px){
        flex-direction:column;
        #bg{
            order:1;
            max-width:100% !important;
        }
        #bg-text{
            order:2;
        }
    }
    @media screen and (max-width:1390px){
        #bg{
            max-width:690px;
        }
    }
`