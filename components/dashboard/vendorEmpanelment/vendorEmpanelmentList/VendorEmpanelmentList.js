import {
  faEye, faFilter, faPen, faPlus, faSearch, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row, Spinner
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { getServices } from '../../../../services/dashboard/masters';
import { deleteVendorEmpanelmentService } from '../../../../services/dashboard/vendorempannelment/vendorProductEmapanelment';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function VendorEmpanelmentList() {
  const router = useRouter();

  const { query: { main_category, sub_category, vendor: vendorId, page } } = router;

  const {
    accessToken, userDetails: {
      type: userType, organization,
    },
  } = useSelector((state) => state.user);

  const [vendorEmpanelmentData, setVendorEmpanelmentData] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});
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
          <span>{(index + 1) + (20 * ((page || 1) - 1))}</span>
        </div>
      ),
    },
    {
      title: 'Vendor Name',
      id: 'name',
      render: (rowData) => (
        <div>
          <span>{organization ? organization.name : rowData.vendor.name}</span>
        </div>
      ),
    },
    {
      title: 'Category',
      id: 'category',
      render: (rowData) => (
        <div>
          <span>
            {rowData.category.parent ? rowData.category.parent.name
              : rowData.category.name}

          </span>
        </div>
      ),
    },
    {
      title: 'Sub Category',
      id: 'sub_category',
      render: (rowData) => (
        <div>
          <span>{rowData.category.parent && rowData.category.name}</span>
        </div>
      ),
    },
    {
      title: 'Approval Date',
      id: 'approval_date',
      render: (rowData) => (
        <div>
          <span>{rowData.approval_date ? moment(rowData.approval_date).format('DD-MM-YYYY') : ''}</span>
        </div>
      ),
    },
    {
      title: 'MAF',
      id: 'maf',
      render: (rowData) => (
        <div>
          <span>{rowData.maf}</span>
        </div>
      ),
    },
    {
      title: 'DD Number',
      id: 'dd_no',
      render: (rowData) => (
        <div>
          <span>{rowData.dd_no}</span>
        </div>
      ),
    },
    {
      title: 'DD Date',
      id: 'dd_date',
      render: (rowData) => (
        <div>
          <span>{moment(rowData.dd_date).format('DD-MM-YYYY')}</span>
        </div>
      ),
    },
    {
      title: 'Processing Fee in Rs',
      id: 'amount',
      render: (rowData) => (
        <div>
          <span>
            {`₹ ${rowData.amount}`}
          </span>
        </div>
      ),
    },
    {
      title: 'Security Deposit Amount in Lacs',
      id: 'sd_amount',
      render: (rowData) => (
        <div>
          <span>{`₹ ${rowData.sd_amount}`}</span>
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
            <FontAwesomeIcon icon={faEye} onClick={() => router.push(`/dashboard/vendor-empanelment/empanelment-category/view-empanelment-category/${rowData.id}`)} className="text-primary" />
          </button>
          <button type="button" className={((userType === 'VENDOR') || (rowData.status !== 'PENDING')) ? 'd-none' : 'apts-admin-tenders-button'}>
            <FontAwesomeIcon icon={faPen} onClick={() => router.push(`/dashboard/vendor-empanelment/empanelment-category-list/edit-empanelment-category/${rowData.id}`)} className="text-primary" />
          </button>
          <button type="button" className={userType === 'VENDOR' ? ' d-none' : 'apts-admin-tenders-button'}>
            <FontAwesomeIcon icon={faTrash} onClick={() => { setEditData(rowData); setShowDeleteModal(true); }} className="text-danger" />
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

  useEffect(() => {
    if (!(userType === 'VENDOR')) {
      getVendors('', vendorId);
      getCategories('', main_category);
      getSubCategories(sub_category);
    }
  }, []);

  const getVendorEmpanelmentData = (search) => {
    setIsLoading(true);

    let query = (search && page) ? `search=${search}&page=${page}` : search ? `search=${search}` : page ? `page=${page}` : '';
    getServices(accessToken, userType === 'VENDOR' ? `/vendors/${organization && organization.id}/categories/?page=${page || 1}` : `/admin/vendor/categories/?search=${search || ''}&page=${page || 1}`).then(({ data, errors }) => {
      if (data) {
         const {
            results, previous, next, count,
          } = data;
        setVendorEmpanelmentData(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
      }
    }).finally(() => setIsLoading(false))
  };

  const handlePath = (path) => {
      router.push({
      pathname: '/dashboard/vendor-empanelment/empanelment-category-list',
      query: { page: (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1].split('&')[0]) || 1 },
    });
    const pageNum = path.includes('page') && path.split('?').map((i) => i.split('='))[1][1].split('&')[0];
    setIsLoading(true);
    getServices(accessToken, userType === 'VENDOR' ? `/vendors/${organization && organization.id}/categories/&page=${pageNum || 1}` : `/admin/vendor/categories/?search=${searchText || ''}&page=${pageNum || 1}`).then(({ data, errors }) => {
      if (data) {
         const {
            results, previous, next, count,
          } = data;
        setVendorEmpanelmentData(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
      }
    }).finally(() => setIsLoading(false))
  }

  useEffect(() => {
    const newQuery = {
      vendor: vendor && vendor.id,
      main_category: category && category.id,
      sub_category: subCategory && subCategory.id,
      page
    };
    Object.keys(newQuery).forEach((mapItem) => {
      if (!newQuery[mapItem]) {
        delete newQuery[mapItem];
      }
    });
    if (Object.keys(newQuery).length && !page) {
      setShowFilter(true);
    }
    router.push({
      pathname: '/dashboard/vendor-empanelment/empanelment-category-list',
      query: newQuery,
    });
    if (vendor || category || subCategory) {
      setIsLoading(true);
      getServices(accessToken, `/admin/vendor/categories/?vendor=${vendor ? vendor.id : ''}&category=${subCategory && subCategory.id || category && category.id || ''}`).then(({ data, errors }) => {
        if (data) {
          setVendorEmpanelmentData(data.results);
          setIsLoading(false);
        }
      });
    } else if (searchText) {
      const delayDebounceFn = setTimeout(() => {
        setIsLoading(true);
        router.push({
          pathname: '/dashboard/vendor-empanelment/empanelment-category-list',
          query: { search: searchText, page },
        });
        getVendorEmpanelmentData(searchText);
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      getVendorEmpanelmentData();
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
                <h2 className="your-cart">Empanelment Categories</h2>
              </Col>
              <Col xs={12} md={6}>
                <div className="d-flex justify-content-between pb-3 px-0">
                  <InputGroup size="md" className="mx-3 w-50">
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
                          pathname: '/dashboard/vendor-empanelment/empanelment-category-list',
                          query: { search: e.target.value },
                        });
                        setSearchText(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <Button variant="primary" className="float-end me-2" onClick={() => router.push('/dashboard/vendor-empanelment/empanelment-category-list/add-empanelment-category')}>
                    <FontAwesomeIcon icon={faPlus} />
                    {' '}
                    Add Category
                  </Button>
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
          tableData={userType === 'VENDOR' ? vendorListTableData.filter((item) => item.title !== ('Vendor Name')) : vendorListTableData}
          dataSet={vendorEmpanelmentData.length && vendorEmpanelmentData}
          loading={false}
        />
        <Pagination className="pagenation-style">
            <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
              &laquo; Previous
            </Pagination.Prev>
            <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
              Next &raquo;
            </Pagination.Next>
          </Pagination>
        <DeleteModal
          show={showDeleteModal}
          onHide={() => { setShowDeleteModal(false); }}
          onClose={() => { setShowDeleteModal(false); getVendorEmpanelmentData(); }}
          id={editData.id}
          title="Vendor Empanelment Product"
          deleteService={deleteVendorEmpanelmentService}
        />

      </Card.Body>

    </Card>

  );
}
