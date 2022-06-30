import styled from 'styled-components';
import { Container } from "components/container";
import ImageWrapper from "components/image-wrapper";
import { SharedImage } from "constants/image-constant"
import { Heading } from "components/heading";
import { Text } from 'components/text';
import ColorPicker from 'components/color-picker';
import SizePicker from 'components/size-picker';
import NumberBox from 'components/number-box';
import Button from 'components/button';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Carousel from 'components/carousel';
import { DetectLink } from 'utilities';


import { auth } from 'firebase.js';
import { db } from 'firebase.js';
import { onAuthStateChanged } from "firebase/auth"
import { ConstructionOutlined } from '@mui/icons-material';
import { success } from 'store/actions/actions';
import { CurrencyBitcoin } from 'react-bootstrap-icons';


import { CategoryImage } from 'constants/image-constant';
const { Cloth, Foot, Handbag, Watch, Jewelry, Baby, Phone, Desktop, Home, Food } = CategoryImage;

const ContainerStyle = {
    padding: "50px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const HeadingStyle1 = {
    textAlign: "left",
    margin: "0px",
    paddingBottom: "15px"
}

const HeadingStyle = {
    textAlign: "left",
    margin: "0px",
    fontSize: "18px"
}

const HeadingStyle2 = {
    textAlign: "left",
    margin: "0px",
    paddingLeft: "30px"
}

const MetaRow = {
    paddingTop: "50px",
    gap: "30px"
}

const AddCartButton = {
    backgroundColor: "#02BEE4"
}

export default function ProductDetailPage() {
    const location = useLocation();

    const [productInfo, setInfo] = useState({
        title: "",
        price: "",
        promotion_price: "",
        detail_url: "",
        pic_url: "",
        props_list: []
    })

    const addToCartButton = async () => {

        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                //Add to cart

                const usersRef = await db.ref("users");
                usersRef.once('value', function (snapshot) {
                    snapshot.forEach(function (usersSnapshot) {
                        var usersData = usersSnapshot.val();


                        if (usersData.mail == currentUser.email) {

                            try {
                                const currentCart = usersData.cart;

                                currentCart.push({
                                    ...productInfo,
                                    title: location.state.item.title,
                                    price: location.state.item.price,
                                    promotion_price: location.state.item.promotion_price,
                                    detail_url: location.state.item.detail_url,
                                    pic_url: location.state.item.pic_url
                                });

                                usersSnapshot.ref.update({
                                    cart: currentCart
                                }).then(() => {
                                    alert("Product Succesfully Added!");
                                    window.location = "/p/shipping";
                                });

                            } catch (error) {
                                usersSnapshot.ref.update({
                                    cart: [{
                                        ...productInfo,
                                        title: location.state.item.title,
                                        price: location.state.item.price,
                                        promotion_price: location.state.item.promotion_price,
                                        detail_url: location.state.item.detail_url,
                                        pic_url: location.state.item.pic_url
                                    }]
                                }).then(() => {
                                    alert("Product Succesfully Added!");
                                    window.location = "/p/shipping";
                                });
                            }


                        }

                    });
                });
            }
            else {
                window.location = "/p/login";
            }

        })

    };

    // const [itemImageURL, setImage] = useState([])

    useEffect(() => {

        if (location.state.detail_item) {
            const link = DetectLink(location.state.detail_item.item.pic_url);

            var propertyList = [];

            console.log(location.state.detail_item.item.props_list);

            for (var prop in location.state.detail_item.item.props_list) {
                propertyList.push(location.state.detail_item.item.props_list[prop]);
            }

            var imagesList = [];

            console.log(location.state.detail_item.item.props_list);

            for (var image in location.state.detail_item.item.props_img) {
                imagesList.push(location.state.detail_item.item.props_img[image]);

            }

            setInfo({
                ...productInfo,
                title: location.state.detail_item.item.title,
                price: location.state.detail_item.item.price,
                promotion_price: location.state.detail_item.item.orginal_price,
                detail_url: location.state.detail_item.item.detail_url,
                pic_url: link ? location.state.detail_item.item.pic_url : "https://" + location.state.detail_item.item.pic_url,
                props_list: propertyList,
                desc_img: imagesList
            })
        } else {

            var propertyList = [];

            for (var prop in location.state.item.props_list) {
                propertyList.push(location.state.item.props_list[prop]);
            }

            var imagesList = [];


            console.log(location.state)

            setInfo({
                ...productInfo,
                title: location.state.item.title,
                price: location.state.item.price,
                promotion_price: location.state.item.promotion_price,
                detail_url: location.state.item.detail_url,
                pic_url: location.state.item.pic_url,
                props_list: [],
                desc_img: imagesList
            });
        }
    }, []);



    return (
        <Container style={ContainerStyle}>
            <Wrapper>
                <ProductWrapper>
                    <ImageWrapper style={{ width: "500px", height: "500px", paddingLeft: "20px", paddingTop: "20px", borderRadius: "10px" }} src={productInfo.pic_url} alt="product" />

                    <br />
                    <br />

                    {

                        console.log(productInfo.desc_img)




                    }

                </ProductWrapper>
                <TextWrapper>
                    <Heading style={HeadingStyle1} >
                        {
                            productInfo.title
                        }
                    </Heading>
                    <InfoWrapper>
                        <Heading style={HeadingStyle}>
                            Price
                        </Heading>
                        <Heading style={HeadingStyle2}>
                            ¥
                            {
                                productInfo.price
                            }
                        </Heading>
                    </InfoWrapper>

                    <InfoWrapper>
                        <Heading style={HeadingStyle}>
                            Size
                        </Heading>
                        <MetaList>
                            <SizeSelect>
                                {
                                    productInfo.props_list.map((data, key) => {




                                        if (data.includes("size"))
                                            return (

                                                <option value={data}>{data}</option>
                                            );
                                    })
                                }
                            </SizeSelect>
                        </MetaList>
                    </InfoWrapper>
                    <InfoWrapper>
                        <Heading style={HeadingStyle}>
                            Color
                        </Heading>
                        <MetaList>
                            <SizeSelect>
                                {
                                    productInfo.props_list.map((data, key) => {




                                        if (data.toLowerCase().includes("color"))
                                            return (

                                                <option value={data}>{data}</option>
                                            );
                                    })
                                }
                            </SizeSelect>
                        </MetaList>
                    </InfoWrapper>
                    <InfoWrapper className='meta-row' style={MetaRow}>
                        <NumberBox />
                        <Button style={AddCartButton} onClick={addToCartButton} text="Add Cart" />
                        <Button style={AddCartButton} onClick={addToCartButton} text="Buy Now" />
                    </InfoWrapper>
                </TextWrapper>


            </Wrapper>

            <br />
            <DisclamerOptionCard>
                <ImageWrapper style={{ width: "80px" }} src={"https://www.shareicon.net/data/256x256/2015/09/28/647539_help_512x512.png"} alt="bitcoin" />
                <TextWrapper>
                    All products available for shopping agent service displayed on KGHype are from third-party shopping platforms and not directly sold by KGHype. Thus, KGHype does not take liability and legal responsibility for issues caused by intellectual property rights infringement and goods copyright infringement.
                </TextWrapper>
            </DisclamerOptionCard>


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


const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    flex-flow:wrap;
    background-color:#EEF2F5;
    @media screen and (max-width:1380px) {
        flex-direction:column;
        max-width:750px;
    }
    @media screen and (max-width:490px) {
        .meta-row{
            flex-direction:column;
            max-width:100%;
            flex:1;
        }
    }
`

const ShopWrapper = styled.div`
    display:flex;
    flex-direction:column;
    color: black,
    width:100%;
    padding:100px 0px;
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

const SizeSelect = styled.select`
    border:none;
    background-color:white;
    height:50px;
    width:100%;
    outline:none;
    text-indent:10px;
    border-radius: 5px;
    font-family:Open Sans;
`;

const TextWrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:15px;
    padding:50px;
    flex:1;
    @media screen and (max-width:1380px) {
       padding:50px 20px;
    }
`

const InfoWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`

const MetaList = styled.ul`
    padding:0px;
    margin:0px;
    display:flex;
    flex-direction:row;
    flex-flow:wrap;
    list-style:none;
    padding-left:30px ;
    gap:20px;
`

const DisclamerOptionCard = styled.div`
    background-color:#EEF2F5;
    padding:20px;

    @media screen and (max-width:1380px) {
        flex-direction:column;
        max-width:750px;
    }
    @media screen and (max-width:490px) {
        .meta-row{
            flex-direction:column;
            max-width:100%;
            flex:1;
        }
    }
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`

const ProductWrapper = styled.div`
    max-width:900px;
    height:auto;
`
