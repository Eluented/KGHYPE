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
        title:"",
        price:"",
        promotion_price:"",
        detail_url:"",
        pic_url:""
    })

    // const [itemImageURL, setImage] = useState([])

    useEffect(() => {
        if(location.state.detail_item){
            const link = DetectLink(location.state.detail_item.item.pic_url);
            setInfo({
                ...productInfo,
                title:location.state.detail_item.item.title,
                price:location.state.detail_item.item.price,
                promotion_price:location.state.detail_item.item.orginal_price,
                detail_url:location.state.detail_item.item.detail_url,
                pic_url:link ? location.state.detail_item.item.pic_url : "https://"+location.state.detail_item.item.pic_url

            })
        } else {
             setInfo({...productInfo, 
                title:location.state.item.title,
                price:location.state.item.price,
                promotion_price:location.state.item.promotion_price,
                detail_url:location.state.item.detail_url,
                pic_url:location.state.item.pic_url
            });
        }
           
        
        // setImage([...location.state.item])
    }, []);



    return (
        <Container style={ContainerStyle}>
            <Wrapper>
                <ProductWrapper>
                    <ImageWrapper src={productInfo.pic_url} alt="product" />
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
                            {
                                productInfo.price
                            }
                        </Heading>
                    </InfoWrapper>
                    <InfoWrapper>
                        <Heading style={HeadingStyle}>
                            Orginal Price
                        </Heading>
                        <Heading style={HeadingStyle2}>
                            {
                                productInfo.promotion_price
                            }
                        </Heading>
                    </InfoWrapper>
                    <InfoWrapper>
                        <Heading style={HeadingStyle}>
                            Description
                        </Heading>
                        <Text style={HeadingStyle2} src={productInfo.detail_url}>
                            {
                                productInfo.detail_url
                            }
                        </Text>
                    </InfoWrapper>
                    <InfoWrapper>
                        <Heading style={HeadingStyle}>
                            Color
                        </Heading>
                        <MetaList>
                            <li>
                                <ColorPicker />
                            </li>
                            <li>
                                <ColorPicker color='#4165B3' />
                            </li>
                            <li>
                                <ColorPicker color='#4F2A31' />
                            </li>
                        </MetaList>
                    </InfoWrapper>
                    <InfoWrapper>
                        <Heading style={HeadingStyle}>
                            Size
                        </Heading>
                        <MetaList>
                            <li>
                                <SizePicker text='45' />
                            </li>
                            <li>
                                <SizePicker text='54' />
                            </li>
                            <li>
                                <SizePicker text='87' />
                            </li>
                        </MetaList>
                    </InfoWrapper>
                    <InfoWrapper className='meta-row' style={MetaRow}>
                        <NumberBox />
                        <Button style={AddCartButton} text="Add Cart" />
                    </InfoWrapper>
                </TextWrapper>
            </Wrapper>
            {/* <Carousel data={itemImageURL} /> */}
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

const ProductWrapper = styled.div`
    max-width:900px;
    height:auto;
`
