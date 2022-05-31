import styled from 'styled-components';
import { AdminTable, AdminTd, AdminTh, AdminTr } from 'components/admin-table';
import { Heading } from 'components/heading';
import InputDark from 'components/input-dark';
import Button from 'components/button';
import { useEffect, useState } from 'react';
import { getCustmers } from "actions/product"
import { EyeFill, Plus } from 'react-bootstrap-icons';
import { useHistory, Link } from 'react-router-dom';
import { ADMIN_PREFIX, ADD_PREFIX, DETAIL_PREFIX, CUSTOMER_PREFIX } from 'configs/app-config';

const HeadingStyle = {
    textAlign: "left"
}

const SaveStyle = {
    backgroundColor: "#6F4FF2",
    borderRadius: "15px",
    fontSize: "18px"
}

const AddStyle = {
    backgroundColor: "#6F4FF2",
    borderRadius: "15px",
    fontSize: "20px",
    maxWidth: "fit-content",
    padding: "5px 10px",
    borderRadius: "5px"
}

const List = ({ item }) => {

    const { email, country, firstname, lastname, phone } = item;
    const history = useHistory();

    const viewCustomerDetail = () => {
        history.push({
            pathname: ADMIN_PREFIX + CUSTOMER_PREFIX + DETAIL_PREFIX,
            state: {
                item: item
            }
        })
    }

    return (
        <AdminTr>
            <AdminTd name="email">
                {
                    email
                }
            </AdminTd>
            <AdminTd name="country">
                {
                    country
                }
            </AdminTd>
            <AdminTd name="firstname">
                {
                    firstname
                }
            </AdminTd>
            <AdminTd name="lastname">
                {
                    lastname
                }
            </AdminTd>
            <AdminTd name="phone">
                {
                    phone
                }
            </AdminTd>
            <AdminTd>
                <EyeWrapper onClick={viewCustomerDetail}>
                    <EyeFill />
                </EyeWrapper>
            </AdminTd>
        </AdminTr>
    )
}

export default function ViewCustomerPage() {
    const [customerData, setCustomerData] = useState([]);

    useEffect(async () => {
        const { data } = await getCustmers();
        setCustomerData(data);
    }, [])

    return (
        <>
            <HeadingWrapper>
                <Heading style={HeadingStyle}>Customers</Heading>
                <Link to={ADMIN_PREFIX + CUSTOMER_PREFIX + ADD_PREFIX}>
                    <Button text={<Plus />} style={AddStyle} />
                </Link>
            </HeadingWrapper>
            <Wrapper>
                <AdminTable>
                    <thead>
                        <AdminTr>
                            <AdminTh>
                                Email Address
                            </AdminTh>
                            <AdminTh>
                                Country
                            </AdminTh>
                            <AdminTh>
                                Firstname
                            </AdminTh>
                            <AdminTh>
                                Lastname
                            </AdminTh>
                            <AdminTh>
                                Phone Number
                            </AdminTh>
                            <AdminTh>
                                Action
                            </AdminTh>
                        </AdminTr>
                    </thead>
                    <tbody>
                        {
                            customerData.map((item, index) => {
                                return (
                                    <List item={item} key={index} />
                                )
                            })
                        }
                    </tbody>
                </AdminTable>
                <FilterForm>
                    <Heading style={HeadingStyle}>Filter</Heading>
                    <InputDark label='Username' placeholder='Enter username' />
                    <InputDark label='Email' placeholder='Enter user Email' />
                    <InputDark label='Group' placeholder='Enter user group' />
                    <InputDark label='Status' placeholder='Enter user status' />
                    <InputDark label='Date' placeholder='Enter Date added' />
                    <ButtonWrapper>
                        <Button style={SaveStyle} text="Filter" />
                    </ButtonWrapper>
                </FilterForm>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:flex-start;
    .product{
        max-width:50px;
    }
`

const FilterForm = styled.form`
    padding-left:50px;
    width:100%;
    max-width:450px;
`

const ButtonWrapper = styled.div`
    padding-top:50px;
`

const DescriptionWrapper = styled.div`
    white-space: nowrap; 
    max-width: 450px; 
    overflow: hidden;
    text-overflow: ellipsis;
`
const EyeWrapper = styled.div`
    cursor:pointer;
`
const HeadingWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
`