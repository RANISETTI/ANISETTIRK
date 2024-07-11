import React, { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import Axios from 'axios';
import { categoriesApi as Api } from '../../config/Api';
import headers from '../../libs/utils/getHeaders';

function AddImages({ prodId, storeUid, headers }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    Axios.get(Api.getProductImages(prodId, storeUid), { headers }).then(({ data }) => {
      setImages(data);
    });
  }, []);

  const renderTableRows = () => images.map((image) => (
    <tr>
      <td><img src={image.image} className="product-image bordered" /></td>
      <td>
        <Form.Group className="mb-3 product-image-input" controlId="formBasicCheckbox">
          <Form.Control label="Check me out" />
        </Form.Group>
      </td>
      <td />
      <td>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" />
        </Form.Group>
      </td>
      <td />
    </tr>
  ));

  const renderAddedImages = () => (
    <Table striped hover className='table-cust-border'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Alt Text</th>
          <th>Sort Order</th>
          <th>Featured</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {renderTableRows()}
      </tbody>
    </Table>
  );
  return (
    <div>
      <input type="file" id="imgupload" className='d-none' />
      <label htmlFor="imgupload" className="mb-3"><Button id="OpenImgUpload">Image Upload</Button></label>
      {renderAddedImages()}
    </div>
  );
}

export default AddImages;
