import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Axios from 'axios';
import {
  Button, Spinner, Table, Pagination,
} from 'react-bootstrap';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';
import { updateQuotation } from './slice/QuotationSlice';
import AddCategories from './AddCategory';

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
        <td><Button variant="light" className="w-100" onClick={() => setShowSpecifications(!showSpecifications)}>{showSpecifications ? '-' : '+'}</Button></td>
        <td className="w-100">{quotation.category.name}</td>
      </tr>
      {
      showSpecifications && (
        <tr key={quotation?.id}>
          <td />
          <td colSpan="2" className="customized-product w-100">
            <Table striped hover className="table-line-highlighter">
              {
                quotation && quotation.attributes && quotation.attributes.map((attribute) => (
                  <tr key={attribute.id}>
                    <th className="w-50 px-5 ">{attribute.name}</th>
                    <td className="p-2">
                      {attribute.options.map((optionItem) => `${optionItem}, `)}
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

function CartItems({ setSelectedStep, setShowCategoriesModal }) {
  const [tableLoading, setTableLoading] = useState(true);
  const [quotationItems, setQuotationItems] = useState([]);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { query: { page } } = router;
  console.log('quotationItems', quotationItems);
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const getCheckoutDetailItems = () => {
    setQuotationItems([]);
    setTableLoading(true);
    Axios.get(Api.getQuotationItems(1), { headers }).then(({ data }) => {
      if (data.results) {
        console.log('data', data.results);
        setPreviousPage(data.previous);
        setNextPage(data.next);
        const newItems = [];
        data.results.map((mapItem) => {
          const newResultItem = { ...mapItem, attributes: [] };
          mapItem.attributes.map((attributeItem) => {
            const newAttributeItem = { ...attributeItem.attribute };
            if (newResultItem.attributes.filter((attributesFilterItem) => attributesFilterItem.id === attributeItem.attribute.id).length) {
              newResultItem.attributes.map((attributeMapItem) => {
                if (attributeMapItem.id === attributeItem.attribute.id) {
                  return { ...attributeMapItem, options: attributeMapItem.options.push(attributeItem.name) };
                }
                return attributeMapItem;
              });
            } else {
              newAttributeItem.options = [attributeItem.name];
              newResultItem.attributes.push(newAttributeItem);
            }
          });
          console.log('newResultItem', newResultItem);
          newItems.push(newResultItem);
        });
        setQuotationItems(newItems);
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
  };
  useEffect(() => {
    getCheckoutDetailItems();
  }, []);

  const handleCheckout = () => {
    setTableLoading(true);
    Axios.post(Api.checkout, {}, { headers }).then(({ data: checkoutData }) => {
      dispatch(updateQuotation(checkoutData));
      router.push('/dashboard/procurement/new/customized-product/checkout/?step=2');
    });
  };

  if (tableLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const handlePath = (path) => {
    console.log((path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][4]).split('=')[1]), 'mknnkn');
    router.push({
      pathname: '/dashboard/assets/hardware',
      query: {
        page: (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][4]).split('=')[1]) || 1,
      },
    });
    setTableLoading(true);
    const pageNum = (path.includes('page') && ((path.split('?').map((i) => i.split('&'))[1][4]).split('=')[1])) || 1;

    Axios.get(Api.getQuotationItems(pageNum), { headers })
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        quotationItems(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .catch((err) => {
        console.log('err, err', err);
      })
      .finally(() => { setTableLoading(false); });
  };
  return (
    <div>
      <div className="my-2">
        <div>
          <div className="py-2">
            {
              router.asPath.split('/')[router.asPath.split('/').length - 1] === 'customized-product' ? (
                <div className="d-flex justify-content-end">
                  {
                    quotationItems.length ? (
                      <Button
                        onClick={() => { handleCheckout(); }}
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
                  <div>
                    <AddCategories />
                  </div>
                  <div>
                    <Button
                      onClick={() => handleCheckout()}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              )
            }

          </div>
          <Table className="mb-4">
            <thead>
              <tr>
                <th className="p-1 w-auto"><Button variant="text" className="w-100" onClick={() => setExpandAll(!expandAll)}>{expandAll ? '-' : '+'}</Button></th>
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

          <Pagination className="pagenation-style">
            <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
              &laquo; Previous
            </Pagination.Prev>
            <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
              Next &raquo;
            </Pagination.Next>
          </Pagination>
        </div>

      </div>

    </div>

  );
}

export default CartItems;
