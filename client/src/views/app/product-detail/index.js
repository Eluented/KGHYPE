import { Heading } from 'components/heading';
import ImageWrapper from 'components/image-wrapper';
import styled from 'styled-components';
import Button from 'components/button';
import { useLocation, useHistory } from 'react-router-dom';
import InputDark from 'components/input-dark';
import { useEffect, useState } from 'react';
import { deleteProduct, updateProduct } from 'actions/product';
import { NotifySuccess } from 'utilities';
import { ADMIN_PREFIX, PRODUCT_PREFIX } from 'configs/app-config';
import Input from 'components/input';


const HeadingStyle = {
    textAlign:"left"
}

const ButtonStyle = {
    backgroundColor:"#6F4FF2",
    borderRadius:"15px"
}

const DeleteBtnStyle = {
    backgroundColor:"#DC3546",
    borderRadius:"15px"
}

const UploadStyle = {
    display: "none !important"
}

export default function ProductDetailPage () {
    const location = useLocation();
    const history = useHistory();

    const [productInfo, setInfo] = useState({
        id:"",
        title:"a",
        description:"b",
        price:"c"
    })

    useEffect(() => {
        setInfo({...productInfo, 
            id:location.state.item._id,
            title:location.state.item.title,
            description:location.state.item.description,
            price:location.state.item.price,
            img:location.state.item.img
        });
    }, []);

    const toUpdate = async () => {
        const response = await updateProduct(productInfo);
        if(response) {
            NotifySuccess("Success!");
        }
    }

    const toDelete = async () => {
        const response = await deleteProduct(productInfo);
        if(response){
            history.push({
                pathname: ADMIN_PREFIX + PRODUCT_PREFIX
            })
        }
    }

    const imageUploaded = () => {
        let convertedImage = "";
        var file = document.querySelector('#file-upload-update')['files'][0];

        var reader = new FileReader();
        reader.onload = function () {
            convertedImage = reader.result.replace("data:","").replace(/^.+,/, "");
            setBase64(convertedImage);
        }
        reader.readAsDataURL(file);
    }

    const setBase64 = (str) => {
        setInfo({...productInfo, img:str});
    }

    const changeImage = () => {
        var file = document.querySelector('#file-upload-update');
        file.click();
    }

    return(
        <Wrapper>
            <Heading style={HeadingStyle}>Product Detail</Heading>
            <Content>
                <ImageWrapper onClick={changeImage} id="product__detail__image" src={`data:image/png;base64,${productInfo.img}`} alt="product" />
                <Input id="file-upload-update" type='file' name='file' style={UploadStyle} text="Upload" onChange={() => imageUploaded()} />
                <ProductInfo>
                    <InputDark className="input" value={productInfo.title} onChange={(e) => setInfo({...productInfo,title:e.target.value})} />
                    <InputDark className="input" value={productInfo.description} onChange={(e) => setInfo({...productInfo,description:e.target.value})}/>
                    <InputDark className="input" value={productInfo.price} onChange={(e) => setInfo({...productInfo,price:e.target.value})}/>
                    <ButtonWrapper>
                        <Button style={ButtonStyle} onClick={toUpdate} text="Update"/>
                        <Button style={DeleteBtnStyle} onClick={toDelete} text="Delete"/>
                    </ButtonWrapper>
                </ProductInfo>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    font-family:poppins;
`
const Content = styled.div`
    background-color:#1D1932;
    padding:30px;
    border-radius:20px;
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:30px;
    .input{
        background-color:#131129;
        max-width:100% !important;
        width:100% !important;
    }
    #product__detail__image{
        max-width:350px;
    }
`
const ProductInfo = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    width:100%;
`
// const ProductOverview = styled.div``

const ButtonWrapper = styled.div`
    display:flex;
    flex-direction:row;
    gap:30px;
    padding-top:30px;
`