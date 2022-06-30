import axios from 'axios';
import { ADMIN_PREFIX, PUBLIC_PREFIX, PRODUCT_PREFIX, CUSTOMER_PREFIX, ADD_PREFIX, GET_PREFIX, UPDATE_PREFIX, DELETE_PREFIX, DETAIL_PREFIX, SEARCH_PREFIX } from 'configs/app-config';
import { DetectLink, ChooseURL, getId } from 'utilities';
import { useHistory, Link } from 'react-router-dom';



export const addProduct = async (params) => {
    const result = await axios.post(ADMIN_PREFIX + PRODUCT_PREFIX + ADD_PREFIX, params);
    if (result.status === 200) {
        return 1;
    }
}

export const searchProduct = async (params) => {
    const url = DetectLink(params.search);
    const platfo = ChooseURL(params.search);
    let flag = 0;
    let options = {};
    if (url) {
        let id = getId(params.search);
        console.log(platfo);
        options = {
            method: 'GET',
            url: `https://api-gw.onebound.cn/${platfo}/item_get/?key=t8607980302&&num_iid=${id[0]}&is_promotion=1&&lang=en&secret=20220515`
        };
        flag = 1;
    } else {
        options = {
            method: 'GET',
            url: `https://api-gw.onebound.cn/taobao/item_search/?key=t8607980302&&q=${params.search}&start_price=0&end_price=0&page=${Math.floor(Math.random() * 5)}&cat=0&discount_only=&sort=&page_size=&seller_info=&nick=&ppath=&imgid=&filter=&&lang=en&secret=20220515`
        };
        flag = 2;
    }

    const result = await axios.request(options);

    if (result.status === 200) {
        console.log(result.data);
        return {
            flag: flag,
            data: result.data
        };
    }
}

export const addCustomer = async (params) => {
    const result = await axios.post(ADMIN_PREFIX + CUSTOMER_PREFIX + ADD_PREFIX, params);
    if (result.status === 200) {
        return 1;
    }
}

export const getProducts = async () => {
    const result = await axios.post(ADMIN_PREFIX + PRODUCT_PREFIX + GET_PREFIX);
    if (result.status === 200) {
        return result.data;
    }
}

export const getCustmers = async () => {
    const result = await axios.post(ADMIN_PREFIX + CUSTOMER_PREFIX + GET_PREFIX);
    if (result.status === 200) {
        return result.data;
    }
}

export const updateProduct = async (params) => {
    const result = await axios.post(ADMIN_PREFIX + PRODUCT_PREFIX + UPDATE_PREFIX, params);
    if (result.status === 200) {
        return 1;
    }
}

export const updateCustomer = async (params) => {
    const result = await axios.post(ADMIN_PREFIX + CUSTOMER_PREFIX + UPDATE_PREFIX, params);
    if (result.status === 200) {
        return 1;
    }
}

export const deleteProduct = async (params) => {
    const result = await axios.post(ADMIN_PREFIX + PRODUCT_PREFIX + DELETE_PREFIX, params);
    if (result.status === 200) {
        return 1;
    }
}

export const deleteCustomer = async (params) => {
    const result = await axios.post(ADMIN_PREFIX + CUSTOMER_PREFIX + DELETE_PREFIX, params);
    if (result.status === 200) {
        return 1;
    }
}