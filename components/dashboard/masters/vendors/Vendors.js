import {
  faCircleCheck, faCircleXmark, faClipboardCheck, faPen, faPlus, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Row, Col
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteVendorService, getVendorsService } from '../../../../services/dashboard/masters';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();

  const getVendors = () => {
    setIsLoading(true);
    getVendorsService(accessToken)
      .then(({ data }) => {
        if (data) {
          const {
            results, previousPage: previous, nextPage: next, count: vendorCount,
          } = data;
          setVendors(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(vendorCount);
        }
      }).finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    getVendors();
  }, []);

  const ProductsTableData = [
    {
      title: 'S. No.',
      id: 'no',
      width: '',
      render: (rowData, name, index) => (
        <div>
          <span>{(index + 1)}</span>
        </div>
      ),
    },
    {
      title: 'Name',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.name}</span>
        </div>
      ),
    },
    {
      title: 'Email',
      id: 'email',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.email}</span>
        </div>
      ),
    },
    {
      title: 'Phone Number',
      id: 'phone_number',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.phone_number}</span>
        </div>
      ),
    },
    {
      title: 'GST Number',
      id: 'gst',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.gst}</span>
        </div>
      ),
    },
    {
      title: 'PAN Number',
      id: 'pan',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.pan}</span>
        </div>
      ),
    },
    {
      title: 'Address',
      id: 'address',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.address_1}</span>
        </div>
      ),
    },
    {
      title: 'City',
      id: 'city',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.city}</span>
        </div>
      ),
    },
    {
      title: 'Verified',
      id: 'verified',
      width: '',
      render: (rowData) => (
        <div className="text-center">
          <span>
            {rowData.is_verified
              ? <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
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
        <div className="d-flex">
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/masters/vendors/edit-vendor/${rowData.id}`); setEditData(rowData); }} className="text-primary" />
          </button>
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                setShowDeleteModal(true);
                setEditData(rowData);
              }}
              className="text-danger"
            />
          </button>
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
                Vendors (
                {count}
                )
              </h2>
              </Col>
              <Col xs={12} md={4} className="text-end">
              <Button variant="primary" onClick={() => router.push('/dashboard/masters/vendors/add-vendor')} className="d-inline-flex">
                <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                {' '}
                Add Vendor
              </Button>
              </Col>
              </Row>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <GenericTable
            tableData={ProductsTableData}
            dataSet={vendors.length && vendors}
            loading={isLoading}
          />
        </Card.Body>
      </Card>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); getVendors(); }}
        id={editData.id}
        title={editData.name}
        type="vendor"
        deleteService={deleteVendorService}
      />
    </div>
  );
}
