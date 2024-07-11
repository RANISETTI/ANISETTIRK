import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Modal, Row, Col, Form, Button, Table,
} from 'react-bootstrap';
import Link from 'next/link';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';
import { updateQuotation } from './slice/QuotationSlice';

function AddCategories({ buttonName }) {
  const [firstLevelCategories, setFirstLevelCategories] = useState([]);
  const [selectedCategory1, setSelectedCategory1] = useState();
  const [secondLvlCategories, setSecondLvlCategories] = useState([]);
  const [selectedCategory2, setSelectedCategory2] = useState();
  const [thirdLvlCategories, setThirdLvlCategories] = useState([]);
  const [selectedCategory3, setSelectedCategory3] = useState();
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  useEffect(() => {
    Axios.get(Api.getCategories, { headers }).then(({ data }) => {
      const categories = data?.results;
      setFirstLevelCategories(categories);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const renderCategoryOptions = (categories, callback) => categories.map((category) => (
    <option value={category.id} key={category.id}>{category.name}</option>
  ));

  const onChangeCategories = (level, value) => {
    switch (level) {
      case 'firstLevel': {
        setSelectedCategory1(value);
        setSelectedCategory2('');
        setSelectedCategory3('');
        if (value) {
          const selectedCategory = firstLevelCategories
            .filter((category) => category.id === parseInt(value, 10));
          const secondLevelCategories = selectedCategory[0] ? selectedCategory[0].children : [];
          setSecondLvlCategories(secondLevelCategories);
        } else {
          setSecondLvlCategories([]);
        }
        setThirdLvlCategories([]);
        break;
      }
      case 'secondLevel': {
        setSelectedCategory2(value);
        setSelectedCategory3('');
        if (value) {
          const selectedCategory = secondLvlCategories
            .filter((category) => category.id === parseInt(value, 10));
          const thirdLevel = selectedCategory[0] ? selectedCategory[0].children : [];
          setThirdLvlCategories(thirdLevel);
        } else {
          setThirdLvlCategories([]);
        }
        break;
      }
      case 'thirdLevel': {
        setSelectedCategory3(value);
        break;
      }
      default:
        return null;
    }
  };

  const selectCategoryModal = () => (
    <Modal
      show={showCategoriesModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        setShowCategoriesModal(false);
        setSelectedCategory3();
        setSelectedCategory2();
        setSelectedCategory1();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-header-text">
          Search & Select Categories Available on APTS
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category level 1</Form.Label>
              <Form.Select id="disabledSelect" value={selectedCategory1} onChange={(e) => onChangeCategories('firstLevel', e.target.value)}>
                <option value="null">Select category </option>
                {renderCategoryOptions(firstLevelCategories)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category level 2</Form.Label>
              <Form.Select id="disabledSelect" value={selectedCategory2} onChange={(e) => onChangeCategories('secondLevel', e.target.value)}>
                <option value="null">Second category </option>
                {renderCategoryOptions(secondLvlCategories)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category level 3</Form.Label>
              <Form.Select id="disabledSelect" value={selectedCategory3} onChange={(e) => onChangeCategories('thirdLevel', e.target.value)}>
                <option value="">Third category </option>
                {renderCategoryOptions(thirdLvlCategories)}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>

        <div className="d-flex justify-content-end">
          { selectedCategory3 ? (
            <Button onClick={() => {
              router.push({
                pathname: `/dashboard/procurement/new/customized-product/${selectedCategory3}`,
                query: { step: 1 },
              });
              setShowCategoriesModal(false);
              setSelectedCategory3();
              setSelectedCategory2();
              setSelectedCategory1();
            }}
            >
              {buttonName || 'Add Category'}
            </Button>
          ) : <Button disabled>{buttonName || 'Add Category'}</Button>}

        </div>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className="">
      {selectCategoryModal()}
      <Button variant="primary" onClick={() => setShowCategoriesModal(true)}>{buttonName || 'Add Category'}</Button>
    </div>
  );
}

export default AddCategories;
