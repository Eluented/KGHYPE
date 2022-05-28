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

export default function ViewOrderPage() {
    return (
        <>
            <Heading style={HeadingStyle}>
                Orders
            </Heading>
            <AdminTable>
                <thead>
                    <AdminTr>
                        <AdminTh>
                            Order ID
                        </AdminTh>
                        <AdminTh>
                            Product
                        </AdminTh>
                        <AdminTh>
                            Size
                        </AdminTh>
                        <AdminTh>
                            Amount
                        </AdminTh>
                        <AdminTh>
                            Price
                        </AdminTh>
                        <AdminTh>
                            Customer
                        </AdminTh>
                        <AdminTh>
                            Date Income
                        </AdminTh>
                        <AdminTh>
                            Action
                        </AdminTh>
                    </AdminTr>
                </thead>
                <tbody>
                    <AdminTr>
                        <AdminTd>
                            19201
                        </AdminTd>
                        <AdminTd>
                            Apple Cinema 30
                        </AdminTd>
                        <AdminTd>
                            5
                        </AdminTd>
                        <AdminTd>
                            345
                        </AdminTd>
                        <AdminTd>
                            $560
                        </AdminTd>
                        <AdminTd>
                            John Doe
                        </AdminTd>
                        <AdminTd>
                            09/04/2022
                        </AdminTd>
                        <AdminTd>
                            Edit
                        </AdminTd>
                    </AdminTr>
                </tbody>
            </AdminTable>
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