import {
  faCircleCheck, faCircleXmark, faClipboardCheck, faEye, faFileCsv, faPen, faPlus, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Pagination, Row
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteProductService, getServices } from '../../../../services/dashboard/masters';
import { getVendorProductsService } from '../../../../services/dashboard/vendors';
import ExportModal from '../../../common/ExportModal';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTodDate] = useState(new Date());

  const {
    accessToken,
    userDetails,
    userDetails: {
      type, roles,
    },
  } = useSelector((state) => state.user);

  const router = useRouter();

  const { query: { page } } = router;

  const getProducts = () => {
    setIsLoading(true);
    let getService;
    if (type === 'VENDOR') {
      const { organization: { id: organizationId } } = userDetails;
      getService = getVendorProductsService(accessToken, organizationId, page);
    } else {
      getService = getServices(accessToken, `/admin/products/?page=${page || 1}`);
    }
    getService.then(({ data }) => {
      if (data) {
        const {
          results, previous, next, count,
        } = data;
        setProducts(results);
        setPreviousPage(previous);
        setNextPage(next);
        setCount(count);
      }
    }).finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/masters/products',
      query: { page: (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1 },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1;
    getServices(accessToken, `/admin/products/?page=${pageNum || 1}`)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setProducts(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  const ProductsTableData = [
    {
      title: 'S. No.',
      id: 'no',
      width: '',
      render: (rowData, name, index) => (
        <div>
          <span>{(index + 1) + (20 * ((page || 1) - 1))}</span>
        </div>
      ),
    },
    {
      title: 'Name',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.title}</span>
        </div>
      ),
    },
    {
      title: 'Category',
      id: 'category',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.category}</span>
        </div>
      ),
    },
    {
      title: 'Part Number',
      id: 'part_number',
      width: '20%',
      render: (rowData) => (
        <div>
          <span>{rowData.part_number}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      id: 'price',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.price ? `Rs. ${rowData.price}` : ''}</span>
        </div>
      ),
    },
    {
      title: 'Active',
      id: 'price',
      width: '',
      render: (rowData) => (
        <div className="text-center">
          <span>
            {rowData.active
              ? <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
              : <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />}
          </span>
        </div>
      ),
    },
    {
      title: 'Verified',
      id: 'price',
      width: '',
      render: (rowData) => (
        <div className="text-center">
          <span>
            {rowData.verified
              ? <FontAwesomeIcon icon={faClipboardCheck} className="text-success" />
              : <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />}
          </span>
        </div>
      ),
    },
    {
      title: 'Actions',
      id: 'actions',
      width: '',
      render: (rowData) => (
        <div className="d-flex text-center">
          {type === 'VENDOR' && (
          <button type="button" className="apts-admin-tenders-button" onClick={() => { router.push(`/dashboard/procurement/products/${rowData.id}`); setEditData(rowData); }}>
            <FontAwesomeIcon icon={faEye} className="text-primary" />
          </button>
          )}
          {type !== 'VENDOR' && (
            <>
              <button type="button" className="apts-admin-tenders-button" onClick={() => { router.push(`/dashboard/masters/products/add-product/${rowData.id}`); setEditData(rowData); }}>
                <FontAwesomeIcon icon={faPen} className="text-primary" />
              </button>
              <button type="button" className="apts-admin-tenders-button" onClick={() => { setShowDeleteModal(true); setEditData(rowData); }}>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-danger"
                />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Card.Header className="pt-3 bg-transparent">
          <div className="">
            <div className="">
              <Row>
                <Col xs={12} md={8}>
                  <h2 className="your-cart">
                    Products (
                    {count}
                    )
                  </h2>
                </Col>
                <Col xs={12} md={4} className="text-end">
                  {type !== 'VENDOR' && (
                    <Button
                      variant="primary"
                      onClick={() => router.push('/dashboard/masters/products/add-product')}
                      className="d-inline-flex mx-3"
                    >
                      <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                      {' '}
                      Add Product
                    </Button>

                  )}
                  {roles && roles.includes('Admin') && (
                  <Button variant="primary" onClick={() => setShowExportModal(true)} className="float-end">
                    <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
                  </Button>

                  )}
                </Col>
              </Row>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <GenericTable
            tableData={ProductsTableData}
            dataSet={products.length && products}
            loading={isLoading}
          />
          <Pagination className="pagenation-style">
            <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
              &laquo; Previous
            </Pagination.Prev>
            <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
              Next &raquo;
            </Pagination.Next>
          </Pagination>
        </Card.Body>

      </Card>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); getProducts(); }}
        id={editData.id}
        title={editData.name}
        type="product"
        deleteService={deleteProductService}
      />
      <ExportModal
        show={showExportModal}
        onHide={() => setShowExportModal(false)}
        onClose={() => setShowExportModal(false)}
        path={`/admin/export/products/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`}
        title="Products"
        toDate={toDate}
        setTodDate={setTodDate}
        fromDate={fromDate}
        setFromDate={setFromDate}
      />
    </div>
  );
}
