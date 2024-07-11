import {
  faEye, faFilter, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, FormControl, InputGroup, Row, Spinner
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { getServices } from '../../../../services/dashboard/masters';
import GenericTable from '../../../common/GenericTable';

export default function VendorEmpanelmentRefunds() {
  const router = useRouter();

  const { query: { main_category, sub_category, vendor: vendorId } } = router;

  const {
    accessToken, userDetails: {
      type: userType, organization,
    },
  } = useSelector((state) => state.user);

  const [vendorEmpanelmentData, setVendorEmpanelmentData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [showFilter, setShowFilter] = useState();
  const [searchText, setSearchText] = useState();
  const [vendorData, setVendorData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubcategoryData] = useState([]);
  const [vendor, setVendor] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubcategory] = useState();

  const vendorListTableData = [
    {
      title: 'S.No.',
      id: 's_no',
      render: (rowData, name, index) => (
        <div>
          <span>{(index + 1)}</span>
        </div>
      ),
    },
    {
      title: 'Vendor Name',
      id: 'name',
      render: (rowData) => (
        <div>
          <span>
            {rowData.vendor_category && rowData.vendor_category.vendor
            && rowData.vendor_category.vendor.name}
          </span>
        </div>
      ),
    },
    {
      title: 'Category',
      id: 'category',
      render: (rowData) => (
        <div>
          <span>
            {rowData.vendor_category && rowData.vendor_category.category
              && rowData.vendor_category.category.name}
          </span>
        </div>
      ),
    },
    {
      title: 'Created On',
      id: 'created_ts',
      render: (rowData) => (
        <div>
          <span>{moment(rowData.created_ts).format('lll')}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      id: 'status',
      render: (rowData) => (
        <div>
          <span>{ rowData.status === 'PENDING' ? 'Pending' : rowData.status === 'APPROVED' ? 'Approved' : 'Rejected' }</span>
        </div>
      ),
    },
    {
      title: 'Actions',
      id: 'actions',
      width: '',
      render: (rowData) => (
        <div className="d-flex justify-space-around">
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon icon={faEye} onClick={() => router.push(`/dashboard/vendor-empanelment/empanelment-category-refunds/${rowData.id}`)} className="text-primary" />
          </button>
        </div>
      ),
    },
  ];

  const getVendors = (search, id) => {
    setIsLoading(true);
    const apiPath = id ? `/admin/vendors/${id}/` : `/admin/vendors/?is_verified=${true}&search=${search || ''}`;
    getServices(accessToken, apiPath).then(({ data }) => {
      if (data) {
        if (id) {
          setVendor(data);
        } else {
          setVendorData(data.results);
          setIsLoading(false);
        }
      }
    });
  };
  const getCategories = (search, id) => {
    const apiPath = id ? `/procurement/categories/${id}/` : `/procurement/categories/?search=${search || ''}`;
    getServices(accessToken, apiPath).then(({ data }) => {
      if (data) {
        if (id) {
          setCategory(data);
        } else {
          setCategoryData(data.results);
        }
      }
    });
  };
  const getSubCategories = (id) => {
    if (id) {
      getServices(accessToken, `/procurement/categories/${id || ''}/`).then(({ data }) => {
        if (data) {
          const { children } = data;
          if (sub_category) {
            setSubcategory(data);
          } else if (children.length) {
            setSubcategoryData(children);
          }
        }
      });
    } else {
      setSubcategoryData([]);
    }
  };

  const getVendorEmpanelmentData = (search) => {
    setIsLoading(true);
    getServices(accessToken, `/admin/vendor/category/refunds/?search=${search || ''}`).then(({ data, errors }) => {
      if (data) {
        setVendorEmpanelmentData(data.results);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    if (!(userType === 'VENDOR')) {
      getVendors('', vendorId);
      getCategories('', main_category);
      getSubCategories(sub_category);
    }
    getVendorEmpanelmentData('');
  }, []);

  useEffect(() => {
    if (searchText || vendor || category || subCategory) {
      const newQuery = {
        vendor: vendor && vendor.id,
        main_category: category && category.id,
        sub_category: subCategory && subCategory.id,
        search: searchText,
      };
      Object.keys(newQuery).forEach((mapItem) => {
        if (!newQuery[mapItem]) {
          delete newQuery[mapItem];
        }
      });
      if (Object.keys(newQuery).length) {
        setShowFilter(true);
      }
      const delayDebounceFn = setTimeout(() => {
        setIsLoading(true);
        router.push({
          pathname: '/dashboard/vendor-empanelment/empanelment-category-refunds',
          query: { search: searchText },
        });
        getServices(accessToken, `/admin/vendor/category/refunds/?vendor=${vendor ? vendor.id : ''}&category=${(subCategory && subCategory.id) || (category && category.id) || ''}&search=${searchText}`).then(({ data, errors }) => {
          if (data) {
            setVendorEmpanelmentData(data.results);
            setIsLoading(false);
          }
        });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchText, vendor, category, subCategory]);

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const renderFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Row>
          <Form.Group as={Col} xs={12} md={4}>
            <Form.Label className="form-required my-2">Vendor</Form.Label>
            <Select
              name="vendor"
              isClearable
              value={vendor}
              options={vendorData.length && vendorData}
              getOptionLabel={(options) => options.name}
              getOptionValue={(options) => options.id}
              isSearchable
              closeMenuOnSelect
              onChange={(newValue, actionMeta) => {
                const { action } = actionMeta;
                if (action === 'select-option' || action === 'remove-value') {
                  setVendor(newValue);
                } else if (action === 'clear') {
                  setVendor('');
                  getVendors('');
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4}>
            <Form.Label className="form-required my-2">Category</Form.Label>
            <Select
              name="category"
              isClearable
              value={category}
              options={categoryData.length && categoryData}
              getOptionLabel={(options) => options.name}
              getOptionValue={(options) => options.id}
              isSearchable
              closeMenuOnSelect
              onChange={(newValue, actionMeta) => {
                const { action } = actionMeta;
                if (action === 'select-option' || action === 'remove-value') {
                  setCategory(newValue);
                  setSubcategory('');
                  getSubCategories(newValue.id);
                } else if (action === 'clear') {
                  setCategory('');
                  setSubcategory('');
                  getCategories('');
                  getSubCategories('');
                }
              }}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={4}>
            <Form.Label className="form-required my-2">Sub Category</Form.Label>
            <Select
              name="sub_category"
              isClearable
              isDisabled={!(category && subCategoryData.length)}
              value={subCategory}
              options={subCategoryData.length && subCategoryData}
              getOptionLabel={(options) => options.name}
              getOptionValue={(options) => options.id}
              isSearchable
              closeMenuOnSelect
              onChange={(newValue, actionMeta) => {
                const { action } = actionMeta;
                if (action === 'select-option' || action === 'remove-value') {
                  setSubcategory(newValue);
                } else if (action === 'clear') {
                  setSubcategory('');
                  setCategory('');
                  getSubCategories('');
                  getCategories('');
                }
              }}
            />
          </Form.Group>
        </Row>
      </Form>
    </Card>
  );

  return (
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div className="">
          <div className="">
            <Row>
              <Col xs={12} md={6}>
                <h2 className="your-cart">Empanelment Category Refunds</h2>
              </Col>
              <Col xs={12} md={6}>
                <div className="d-flex justify-content-end pb-3 px-0">
                  <InputGroup size="md" className="w-50 mx-3">
                    <InputGroup.Text id="basic-addon1">
                      {' '}
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Search Here.."
                      aria-label="Username"
                      value={searchText}
                      onChange={(e) => {
                        router.push({
                          pathname: '/dashboard/vendor-empanelment/empanelment-category-refunds',
                          query: { search: e.target.value },
                        });
                        setSearchText(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <Button variant="primary" onClick={() => setShowFilter(!showFilter)}>
                    <FontAwesomeIcon icon={faFilter} />
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {showFilter && renderFilters()}
        <GenericTable
          tableData={vendorListTableData}
          dataSet={vendorEmpanelmentData.length && vendorEmpanelmentData}
          loading={false}
        />
      </Card.Body>
    </Card>
  );
}
