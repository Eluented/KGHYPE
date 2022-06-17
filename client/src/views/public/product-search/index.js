import styled from 'styled-components';
import { Heading } from "components/heading";
import Input from "components/input";
import { Container } from 'components/container';
import { SharedImage } from 'constants/image-constant';
import ImageWrapper from 'components/image-wrapper';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PUBLIC_PREFIX, PRODUCT_DETAIL_PREFIX } from 'configs/app-config';

const HeadingStyle = {
    textAlign: "left"
}

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
            <Card onClick={onClick}>

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