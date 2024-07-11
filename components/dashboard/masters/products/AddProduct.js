import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import { getServices } from '../../../../services/dashboard/masters';
import AddProductAttributes from './Attributes';
import AddProductImages from './Images';
import ProductDetails from './ProductDetails';
import AddVendors from './Vendors';

export default function AddProduct(props) {
  const { accessToken } = useSelector((state) => state.user);
  const router = useRouter();
  const { action } = props;
  const { query: { id, tab } } = router;

  const [selectedTab, setSelectedTab] = useState(tab || 'productDetails');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const getCategories = (search) => {
    getServices(accessToken, `/admin/categories/?search=${search}`)
      .then(({
        data,
      }) => {
        setCategories(data.results);
      })
  };

  const getBrands = (search) => {
    getServices(accessToken, `/admin/brands/?search=${search}`)
      .then(({
        data,
      }) => {
        setBrands(data.results);
      })
  };

  const handleTabChange = (name) => {
    if (action === 'edit') {
      router.push({
        pathname: `/dashboard/masters/products/add-product/${id}/`,
        query: { tab: name },
      });
    } else {
      router.push({
        pathname: '/dashboard/masters/products/add-product',
        query: { tab: name },
      });
    }
  };

  useEffect(() => {
    getCategories('');
    getBrands('');
    if (tab) {
      handleTabChange(tab);
    }
  }, [tab]);

  const tabs = [
    {
      id: 1,
      title: 'Product Details',
      value: 'productDetails',
    },
    {
      id: 2,
      title: 'Images',
      value: 'images',
    },
    {
      id: 3,
      title: 'Attributes',
      value: 'attributes',
    },
    {
      id: 4,
      title: 'Vendors',
      value: 'vendors',
    },
  ];

  const renderTabs = () => (
    <div className="cust-card-2">
      <Nav
        fill
        variant="tabs"
        onSelect={(e) => {
          // setSelectedTab(e);
          handleTabChange(e);
        }}
        defaultActiveKey={tab || 'productDetails'}
      >
        {tabs.map((tab) => (
          <Nav.Item>
            <Nav.Link eventKey={tab.value}>
              {tab.title}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );

  const renderTabContent = () => {
    switch (tab) {
      case 'productDetails': return (
        <ProductDetails
          next={() => setSelectedTab('images')}
          categories={categories}
          brands={brands}
          getCategories={getCategories}
          getBrands={getBrands}
        />
      );
      case 'images': return (
        <AddProductImages next={() => setSelectedTab('attributes')} />
      );
      case 'attributes': return (
        <AddProductAttributes next={() => setSelectedTab('vendors')} />
      );
      case 'vendors': return (
        <AddVendors />
      );
      default: return <ProductDetails
        next={() => setSelectedTab('images')}
        getCategories={getCategories}
        getBrands={getBrands}
        categories={categories}
        brands={brands} />;
    }
  };

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Card className="p-3">
      {renderTabs()}
      {renderTabContent(selectedTab)}
    </Card>
  );
}
