import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Axios from 'axios';
import GeneralTab from './GeneralTab';
import AddImages from './AddImages';
import { accessToken, categoriesApi as Api } from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';
import AddVideos from './AddVideos';

const prodId = "e4cc25e9";
const storeUid = "642cc25b";
function AddProduct() {
    const [key, setKey] = useState();
    const [categories, setCategories] = useState([]);
    const headers = getHeaders(accessToken);
    useEffect(() => {
        Axios.get(Api.getAllCategories(storeUid), { headers }).then(({ data}) => {
            setCategories(data);
        })

    }, []);

    return (
        <div className='shadow mb-3 card mt-3 p-3'>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="home" title="General">
                    <GeneralTab categories={categories} headers={headers} prodId={prodId} />
                </Tab>
                <Tab eventKey="profile" title="Images">
                    <AddImages prodId={prodId} storeUid={storeUid} headers={headers} />
                </Tab>
                <Tab eventKey="video" title="Videos">
                    <AddVideos />
                </Tab>
                <Tab eventKey="linked_products" title="Linke products">
                    <div>Linked Products</div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default AddProduct;