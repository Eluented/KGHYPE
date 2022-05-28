import { useState, useEffect } from 'react';
import { Heading } from 'components/heading';
import InputDark from 'components/input-dark';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import { PlusCircle } from "react-bootstrap-icons";
import Button from 'components/button';
import { addProduct } from 'actions/product';
import { NotifySuccess, NotifyFail } from 'utilities';
import styled from 'styled-components';
import Input from 'components/input';
import ImageWrapper from 'components/image-wrapper';

const InputStyle = {
    backgroundColor: "#131129"
}

const HeadingStyle = {
    textAlign: "left"
}

const addSaveStyle = {
    backgroundColor: "#6F4FF2",
    padding: "5px",
    width: "30px",
    margin: "5px"
}

const UploadStyle = {
    display: "none !important"
}

const UploadedImageStyle = {
    maxWidth: "250px"
}

export default function AddProductPage() {

    const [formData, setFormData] = useState({});
    const [uploadedImage, setImage] = useState("");
    const [uploadedFileInfo, setInfo] = useState({
        fileName: "",
        fileSize: "",
        fileType: ""
    })

    useEffect(() => {
        setFormData({ ...formData, img: uploadedImage });
        console.log("form", formData);
    }, [uploadedImage])

    const toAddProduct = async (e) => {
        e.preventDefault();
        const data = await addProduct(formData);
        if (data) {
            NotifySuccess('Success!')
        } else {
            NotifyFail('Error Ocurred');
        }
    }

    const setData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const imageUploaded = () => {
        let convertedImage = "";
        var file = document.querySelector('#file-upload')['files'][0];

        setInfo({ ...uploadedFileInfo, fileName: file.name, fileSize: file.size, fileType: file.type });

        var reader = new FileReader();
        reader.onload = function () {
            convertedImage = reader.result.replace("data:", "").replace(/^.+,/, "");
            setBase64(convertedImage);
        }
        reader.readAsDataURL(file);
    }

    const setBase64 = (str) => {
        setImage(str);
    }

    const changeImage = () => {
        var file = document.querySelector('#file-upload');
        file.click();
    }

    return (
        <>
            <HeaderWrapper>
                <Heading style={HeadingStyle}>Add Product</Heading>
                <div>
                    <Button style={addSaveStyle} onClick={toAddProduct} text={<PlusCircle />} />
                </div>
            </HeaderWrapper>
            <Tabs>
                <TabList>
                    <Tab>General</Tab>
                    <Tab>Image</Tab>
                </TabList>
                <TabPanel>
                    <InputDark style={InputStyle} value={formData.title} name='title' onChange={(e) => setData(e)} label="Product Title" />
                    <InputDark style={InputStyle} value={formData.price} name='price' onChange={(e) => setData(e)} label="Product Price" />
                    <InputDark style={InputStyle} value={formData.description} name='description' onChange={(e) => setData(e)} label="Product Description" />
                </TabPanel>
                <TabPanel>
                    {
                        uploadedImage === "" ? <ImageLabel>
                            <Input id="file-upload" type='file' name='file' style={UploadStyle} text="Upload" onChange={() => imageUploaded()} />
                            Upload Image
                        </ImageLabel> : <UploadContentWrapper>
                            <ImageWrapper style={UploadedImageStyle} onClick={changeImage} src={`${"data:image/png;base64," + uploadedImage}`} alt="uploadedImage" className="uploaded-image" />
                            <Input id="file-upload" type='file' name='file' style={UploadStyle} text="Upload" onChange={() => imageUploaded()} />
                            <FileInfoWrapper>
                                <p>
                                    {
                                        uploadedFileInfo.fileName
                                    }
                                </p>
                                <p>
                                    {
                                        uploadedFileInfo.fileSize
                                    }
                                </p>
                                <p>
                                    {
                                        uploadedFileInfo.fileType
                                    }
                                </p>
                            </FileInfoWrapper>
                        </UploadContentWrapper>
                    }
                </TabPanel>
            </Tabs>
        </>
    )
}

const HeaderWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    padding-bottom:30px;
    justify-content:space-between;
`

const ImageLabel = styled.label`
    font-family:Poppins;
    width:100%;
    max-width:250px;
    height:250px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
`

const FileInfoWrapper = styled.div`
    font-family:Poppins;
`

const UploadContentWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    gap:50px;
`