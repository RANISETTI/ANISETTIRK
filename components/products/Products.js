import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button, Card, Col, Form, FormControl, InputGroup, Nav, Navbar, NavDropdown, Pagination, Row,
  Spinner, Toast,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';
import ProductCard from '../common/ProductCard';

export default function ProductSpecifications() {
  const router = useRouter();
  const {
    query: {
      procurementId = 3, id, selectedOptions, page, search,
    }, asPath,
  } = router;
  const [filters, setFilters] = useState([]);
  const [filtersLoading, setFiltersLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);
  const [isItemsAddedToCart, setIsItemsAddedToCart] = useState(false);
  const [showErrorMessage, toggleErrorMessage] = useState(false);
  const [previousPage, setPreviousPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [searchText, setSearchText] = useState(search || '');

  console.log('categoriesData', categoriesData);
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const [selectedFilter, setSelectedFilter] = useState(selectedOptions ? selectedOptions.split(',').map((mapItem) => Number(mapItem)) : []);
  const getCategoriesData = () => {
    Axios.get(Api.getCategories, { headers })
      .then(({ data }) => {
        setCategoriesData(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategoriesByAttributesData = () => {
    setFiltersLoading(true);
    Axios.get(Api.getAttribute(id, selectedFilter), { headers })
      .then(({ data }) => {
        console.log(data);
        setFilters(data);
        setFiltersLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setFiltersLoading(false);
      });
  };
  const getProducts = () => {
    setProductsLoading(true);
    setIsLoading(true);
    Axios.get(Api.getProducts(searchText, selectedFilter, id || '', page), { headers })
      .then(({ data }) => {
        setProducts(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
        setProductsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setProductsLoading(false);
      });
  };
  useEffect(() => {
    if (id) {
      getCategoriesByAttributesData();
    }
  }, [selectedFilter]);

  useEffect(() => {
    getProducts();
    getCategoriesData();
    // const productsPromise = Axios.get(Api.getProducts(searchText, selectedFilter, id || '', page), { headers });
    // const categoryPromise = Axios.get(Api.getCategories, { headers });
    // setIsLoading(true);
    // Promise.all([productsPromise, categoryPromise])
    //   .then(([{ data: productsData }, { data: categories }]) => {
    //     // setFilters(attributes);
    //     setCategoriesData(categories.results);
    //     setProducts(productsData);
    //     setNextPage(productsData.next);
    //     setPreviousPage(productsData.previous);
    //   }).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAddedToCartMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [showAddedToCartMessage]);

  const getAttributes = () => {
    Axios.get(Api.getAttributes(id), { headers }).then(({ data }) => {
      setFilters(data);
    })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (searchText) {
      const delayDebounceFn = setTimeout(() => {
        setIsLoading(true);
        Axios.get(Api.getProducts(searchText), { headers })
          .then(({ data: productsData }) => {
            setProducts(productsData.results);
            setNextPage(productsData.next);
            setPreviousPage(productsData.previous);
          }).finally(() => setIsLoading(false));
      }, 2000);
      return () => clearTimeout(delayDebounceFn);
    }
    setIsLoading(true);
    Axios.get(Api.getProducts('', selectedFilter || '', id, page), { headers })
      .then(({ data: productsData }) => {
        setProducts(productsData.results);
        setNextPage(productsData.next);
        setPreviousPage(productsData.previous);
      }).finally(() => setIsLoading(false));
  }, [selectedFilter, id, searchText]);

  const handlePath = (path) => {
    {
      Number(id)
        ? router.push({
          pathname: `/dashboard/procurement/new/product/category/${id}/`,
          query: {
            page: (path.includes('page')
          && path.split('?').map((i) => i.split('='))[1][3]) || 1,
          },
        }) : router.push({
          pathname: '/dashboard/procurement/new',
          query: { selectedOptions: selectedFilter.join(','), page: path.includes('page') && (path.split('?').map((i) => i.split('='))[1][3]).split('&')[0] || 1 },
        });
    }
    setIsLoading(true);
    const pageNum = (path.includes('page') && (path.split('?').map((i) => i.split('='))[1][3]).split('&')[0]) || 1;
    Axios.get(Api.getProducts(searchText, selectedFilter || '', id, pageNum), { headers })
      .then(({
        data, error,
      }) => {
        setProducts(data.results);
        setPreviousPage(data.previous);
        setNextPage(data.next);
      })
      .finally(() => { setIsLoading(false); });
  };

  // useEffect(() => {
  //   if (id) {
  //     Axios.get(Api.getAttributes(id), { headers }).then(({ data }) => {
  //       setFilters(data);
  //     }).catch((err) => console.log(err));
  //   }
  // }, [id]);

  const onSelectFilter = (uid) => {
    const selectedAttributes = [...selectedFilter];
    if (selectedAttributes.includes(uid)) {
      selectedAttributes.splice(selectedAttributes.indexOf(uid), 1);
    } else {
      selectedAttributes.push(uid);
    }
    router.push({
      pathname: `/dashboard/procurement/new/product/category/${id}/`,
      query: { selectedOptions: selectedAttributes.join(',') },
    });
    setSelectedFilter(selectedAttributes);
  };

  const renderOptions = (options) => options.map((option, index) => (
    <Form.Group key={option.id}>
      <Form.Check
        onChange={() => {
          onSelectFilter(option.id);
        }}
        checked={selectedFilter.includes(option.id)}
        type="checkbox"
        label={option.name}
        className="procurement-filter-item"
      />
    </Form.Group>
  ));

  const addToCart = () => {
    Axios.post(Api.addQuotations, { category: 3, attributes: selectedFilter }, { headers }).then(({ data }) => {
      setShowAddedToCartMessage(true);
      setIsItemsAddedToCart(true);
    }).catch((err) => console.log(err, 'hello err'));
  };

  const rendersFilters = () => {
    const filterComponents = filters.map((filter, index) => (
      <div eventKey={index} key={index} className="border-bottom">
        <div><p className="text-capitalize text-muted .ml-md-3 .ml-lg-0  m-0 fw-bold">{filter.name}</p></div>
        <div className="">
          {renderOptions(filter.options)}
        </div>
      </div>
    ));
    return filterComponents;
  };

  const renderProducts = () => products.map((product, index) => (
    <Col lg={3} md={3} xs={12} key={index}>
      <Card>
        <ProductCard product={product} />
      </Card>
    </Col>
  ));

  const renderToastMessage = () => (
    <Toast
      className="toast-style"
      show={showErrorMessage}
      onClose={() => toggleErrorMessage(false)}
    >
      <Toast.Header className="toast-header-style">
        <strong className="me-auto text-white">Error!</strong>
      </Toast.Header>
      <Toast.Body className="text-white">{!isItemsAddedToCart ? '' : 'Please select all mandatory fields.'}</Toast.Body>
    </Toast>
  );

  const renderEmptyCheckoutMessage = () => (
    <Toast
      className="toast-style"
      show={!isItemsAddedToCart}
      onClose={() => toggleErrorMessage(false)}
    >
      <Toast.Header className="toast-header-style">
        <strong className="me-auto text-white">Error!</strong>
      </Toast.Header>
      <Toast.Body className="text-white">{!isItemsAddedToCart ? '' : 'Please select all mandatory fields.'}</Toast.Body>
    </Toast>
  );

  const renderAddedToCartMessage = () => (
    <Toast
      className="toast-style"
      show={showAddedToCartMessage}
      onClose={() => setShowAddedToCartMessage(false)}
    >
      <Toast.Header>
        <strong className="me-auto">Success!</strong>
      </Toast.Header>
      <Toast.Body>Item is added to cart successfully.</Toast.Body>
    </Toast>
  );

  const handleCheckout = () => {
    Axios.post(Api.checkout, {}, { headers }).then(() => {
      Axios.get(Api.checkout, { headers }).then(({ data }) => {
      });
    });
  };

  const updateSelectedCategories = (categoryId) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const renderNavbar = () => (
    <div>
      <Navbar expand="lg" className="bg-white rounded">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between" style={{overflowX:'auto'}}>
          <Nav>
            {categoriesData.map((item) => (item.children.map((parent) => (
              <NavDropdown title={parent.name}>
                {parent.children && parent.children.map((child) => (
                  <NavDropdown.Item onClick={() => {
                    setSelectedFilter([]);
                    updateSelectedCategories(child.id);
                    router.push(`/dashboard/procurement/new/product/category/${child.id}`);
                  }}
                  >
                    {child.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))))}
          </Nav>
          {
            products.length ? (
              null
            ) : (
              <div>
                <Button onClick={() => { router.push(`/dashboard/procurement/new/customized-product/${id}`); }}>Custom Product</Button>
              </div>

            )
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

  if (productsLoading) {
    return (
      <div style={{ height: '70vh' }}>
        <div className="cust-spinner h-100">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }
  return (
    <Card className="cust-padd-x-y">
      <div>
        {showErrorMessage && renderToastMessage()}
        {showErrorMessage && isItemsAddedToCart && renderEmptyCheckoutMessage()}
        {showAddedToCartMessage && renderAddedToCartMessage()}
      </div>
      <div>
        <Card className="">
          <InputGroup size="md">
            <FormControl
              placeholder="Search Here.."
              aria-label="Username"
              value={searchText}
              onChange={(e) => {
                router.push({
                  pathname: '/dashboard/procurement/new',
                  query: { search: e.target.value },
                });
                setSearchText(e.target.value);
              }}
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text id="basic-addon1">
              {' '}
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup>
        </Card>
        <div className="mb-3">
          {renderNavbar()}
        </div>
        <Row className="position-relative">
          {id
            && (
              <Col xs={0} md={3} lg={3}>
                <Card className="w-100 bg-white h-100 pt-3 pb-3 px-3 rounded border mx-3 rounded">
                  <p className="fs-6 font-weight-bold">Product Specifications</p>
                  {
                    filtersLoading ? (
                      <div className="tender-loading">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      rendersFilters()

                    )
                  }
                </Card>
              </Col>
            )}
          <Col xs={16} md={9} lg={id ? 9 : 12}>
            <div>
              {products && products.length ? (
                <Row className="position-relative">
                  {
                    isLoading ? (
                      <div className="tender-loading">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      renderProducts()
                    )
                  }
                </Row>
              ) : <p className="text-center p-3 text-danger fw-bold">NO DATA FOUND</p>}
            </div>
          </Col>
        </Row>
        <Pagination className="pagenation-style">
          <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
            &laquo; Previous
          </Pagination.Prev>
          <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
            Next &raquo;
          </Pagination.Next>
        </Pagination>
      </div>
    </Card>
  );
}
