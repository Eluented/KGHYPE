import styled from 'styled-components';
import { Heading } from "components/heading";
import Input from "components/input";
import { Container } from 'components/container';
import { SharedImage } from 'constants/image-constant';
import ImageWrapper from 'components/image-wrapper';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PUBLIC_PREFIX, PRODUCT_DETAIL_PREFIX } from 'configs/app-config';
import { CategoryImage } from 'constants/image-constant';
import { StepImage } from 'constants/image-constant';

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    CircularProgress,
    Typography,
    TextField,
    NativeSelect,
} from "@mui/material";

const HeadingStyle = {
    textAlign: "left"
}


const { Bg, Landing } = SharedImage;
const { Cloth, Foot, Handbag, Watch, Jewelry, Baby, Phone, Desktop, Home, Food } = CategoryImage;
const { Step1, Step2, Step3, Step4, Step5, Step6 } = StepImage;

const { Product } = SharedImage;

const ContainerStyle = {
    paddingTop: "100px"
}




function ListCard({ title, description, price, img, onClick }) {

    var min = 1;
    var max = 100;
    var rand = min + (Math.random() * (max - min));

    return (
        <li>
            <Card style={{ height: "550px" }} onClick={onClick}>

                <ImageWrapper src={img} alt="product-image" className="product-image" />
                <p>
                    {
                        description
                    }
                </p>
                <h3>{title}</h3>
                <br />
                <InfoWrapper>

                    <Heading>
                        ¥
                        {
                            price
                        }
                    </Heading>
                    <span>
                        {parseInt(rand)} people pay
                    </span>
                </InfoWrapper>
            </Card>
        </li>
    )
}
export default function ProductSearch() {
    const [formData, setFormData] = useState({});
    const [productData, setProductData] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect(async () => {
        // const { data } = await getProducts();
        // setProductData(data);
        setProductData([...location.state.item.items.item]);
    }, [])

    const setData = (e) => {
        setFormData({ ...formData });
    }

    const toDetail = async (item) => {
        history.push({
            pathname: PUBLIC_PREFIX + PRODUCT_DETAIL_PREFIX,
            state: {
                item: item
            }
        })
    }

    return (
        <Container style={ContainerStyle}>
            <Heading style={HeadingStyle}>Search Results : 3210232</Heading>
            <ToolWrapper>
                <Input placeholder='US Dollar' />
                <Input placeholder='US Dollar' />
            </ToolWrapper>
            <CardWrapper>
                {productData.map((item, index) => {
                    console.log(item);
                    return (
                        <ListCard title={item.title} description={item.description} price={item.price} onChange={(e) => setData(e)} onClick={() => toDetail(item)} img={item.pic_url} key={index} />
                    )
                })}
            </CardWrapper>



            <center>


                <TextField
                    id="mail"
                    variant="outlined"
                    type="text"
                    label="Jump to"
                    name='Remark'
                />

            </center>

            <center>
                <ShopWrapper style={{ marginTop: "10px", height: "60%" }}>
                    <CategoryList className='wow fadeInUp'>
                        <li>
                            <ImageWrapper style={{ height: '40px' }} src={Handbag} alt='cateogry' />
                            <Heading>
                                Massive <br></br> Products
                            </Heading>
                            <h1 style={{ fontSize: "15px" }}>Help buying online <br></br> & offline products in China</h1>
                        </li>
                        <li>
                            <ImageWrapper src={Jewelry} style={{ height: '40px' }} alt='cateogry' />
                            <Heading>
                                Lower <br></br> Cost
                            </Heading>
                            <h1 style={{ fontSize: "15px" }}>Help you combining <br></br> items from different sellers<br></br> into one parcel and ship it to your home</h1>

                        </li>
                        <li>
                            <ImageWrapper style={{ height: '40px' }} src={Watch} alt='cateogry' />
                            <Heading>
                                Quality <br></br> Service
                            </Heading>
                            <h1 style={{ fontSize: "15px" }}>Efficient Service & Stable Support</h1>

                        </li>
                        <li>
                            <ImageWrapper style={{ height: '40px' }} src={Phone} alt='cateogry' />
                            <Heading>
                                Instantly <br></br> Response
                            </Heading>
                            <h1 style={{ fontSize: "15px" }}>Help you solving problems <br></br> in the shortest timev</h1>

                        </li>
                    </CategoryList>
                </ShopWrapper>
            </center>
        </Container>

    )
}

const ToolWrapper = styled.div`
    display:flex;
    flex-direction:row;
    gap:50px;
`

const Card = styled.div`
    box-shadow: 0px 41px 27px -27px rgba(116, 155, 169, 0.59);
    max-width:320px;
    padding:20px;
    border:1px solid #D6D5D5;
`

const CardWrapper = styled.ul`
    list-style:none;
    display:flex;
    flex-direction:row;
    flex-flow:wrap;
    padding:0px;
    margin:0px;
    padding-top:50px;
    padding-bottom:200px;
    gap:70px;
`

const InfoWrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`

const ShopWrapper = styled.div`
    display:flex;
    flex-direction:column;
    color: black,
    width:100%;
    margin-left: 200px;
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