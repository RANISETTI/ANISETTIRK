import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Axios from 'axios';
import { Button, Spinner, Table } from 'react-bootstrap';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';
import { updateQuotation } from './slice/QuotationSlice';

function ProductCategories({
  quotation, expandAll,
}) {
  const [showSpecifications, setShowSpecifications] = useState(expandAll);

  useEffect(() => {
    setShowSpecifications(expandAll);
  }, [expandAll]);

  return (
    <>
      <tr key={quotation?.id}>
        <td><Button variant="light" className="w-100" onClick={() => setShowSpecifications(!showSpecifications)}>+</Button></td>
        <td className="w-100">{quotation.category.name}</td>
      </tr>
      {
      showSpecifications && (
        <tr key={quotation?.id}>
          <td />
          <td colSpan="2" className="customized-product w-100">
            <Table striped bordered hover className="table-line-highlighter">
              {
                quotation && quotation.attributes && quotation.attributes.map((attribute) => (
                  <tr key={attribute.id}>
                    <th className="w-50 px-5 ">{attribute.attribute.name}</th>
                    <td className="p-2">
                      {attribute.name}
                    </td>
                  </tr>
                ))
              }
            </Table>
          </td>
        </tr>

      )
    }
    </>
  );
}

function CheckoutProducts({ setSelectedStep, setShowCategoriesModal }) {
  const [quotationCartItems, setQuotationCartItems] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [quotationItems, setQuotationItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query: { categoryId } } = router;
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const getCheckoutDetailItems = () => {
    setTableLoading(true);
    Axios.post(Api.checkout, {}, { headers }).then(({ data: checkoutData }) => {
      dispatch(updateQuotation(checkoutData));
      Axios.get(Api.getQuotationCartItems(checkoutData.uid), { headers }).then(({ data }) => {
        if (data.results) {
          console.log('data.results', data.results);
          setQuotationCartItems(data.results);
          setQuotationItems([]);
          setQuotationItems(data.results);
          setShowCheckout(true);
          setTableLoading(false);
          // if (data.results.length) {
          //   dispatch(updateQuotation(data.results[0]));
          // }
          // if (data.results.length) {
          //   Axios.get(Api.getQuotationCartItems(checkoutData.uid), { headers })
          //     .then(({ data: quotationData }) => {
          //       // setQuotationItems(res.map())
          //     })
          //     .catch((err) => {
          //       console.log(err);

          //       setTableLoading(false);
          //     });
          // } else {
          //   setTableLoading(false);
          // }
        }
      })
        .catch((err) => {
          console.log(err);
          setTableLoading(false);
        });
    });
  };
  useEffect(() => {
    getCheckoutDetailItems();
  }, []);

  // const handleCheckout = () => {
  //   Axios.post(Api.checkout, { }, { headers }).then(() => {
  //     Axios.get(Api.checkout, { headers }).then(({ data }) => {
  //       dispatchQuotation(data?.results[0]);
  //       setSelectedStep();
  //     });
  //   });
  // };

  if (tableLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div>
      <div className="my-2">
        <div>
          <div className="d-flex justify-content-end py-2">
            {
              router.asPath.split('/')[router.asPath.split('/').length - 1] === 'customized-product' ? (
                <div className="d-flex justify-content-between">
                  {
                    quotationItems.length ? (
                      <Button
                        onClick={() => {
                          router.push({
                            pathname: '/dashboard/procurement/new/customized-product/checkout',
                            query: { step: 2 },
                          });
                        }}
                        className="mx-2"
                      >
                        Continue Checkout
                      </Button>

                    ) : (
                      null
                    )
                  }
                  <Button
                    onClick={() => {
                      setShowCategoriesModal(true);
                    }}
                  >
                    Add Product
                  </Button>
                </div>

              ) : (
                <div className="d-flex justify-content-between">
                  <Button
                    onClick={() => router.push({
                      pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
                      query: { categoryId: 'consignee', step: 2 },
                    })}
                  >
                    Assign Consignees

                  </Button>
                </div>
              )
            }

          </div>
          <Table className="mb-4">
            <thead>
              <tr>
                <th className="p-1 w-auto"><Button variant="text" className="w-100" onClick={() => setExpandAll(!expandAll)}>+</Button></th>
                <th><div className="p-1 my-auto">Product Categorys & Selected Specifications</div></th>
              </tr>
            </thead>
            <tbody>
              {
                quotationItems.map((quotation) => (
                  <ProductCategories quotation={quotation} expandAll={expandAll} />
                ))
              }
            </tbody>

          </Table>
        </div>

      </div>

    </div>

  );
}

export default CheckoutProducts;
