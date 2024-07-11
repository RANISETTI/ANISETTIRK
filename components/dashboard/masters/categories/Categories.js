import {
  faFileCsv, faPen, faPlus, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Row, Col,Pagination
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { deleteCategoryService, getServices } from '../../../../services/dashboard/masters';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';
import ExportModal from '../../../common/ExportModal';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTodDate] = useState(new Date());

  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);

  const router = useRouter();

  const { query: { page } } = router;

  const getCategories = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/categories/?page=${page || 1}`)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setCategories(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/masters/categories',
      query: { page: (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1 },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1;
    getServices(accessToken, `/admin/categories/?page=${pageNum || 1}`)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setCategories(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  const CategoriesTableData = [
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
      title: 'Parent',
      id: 'parent',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.parent ? rowData.parent.name : '-' }</span>
        </div>
      ),
    },
    {
      title: 'Actions',
      id: 'actions',
      width: '',
      render: (rowData) => (
        <div className="d-flex justify-content-between">
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/masters/categories/edit-category/${rowData.id}`); }} className="text-primary" />
          </button>
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon icon={faTrash} onClick={() => { setEditData(rowData); setShowDeleteModal(true); }} className="text-danger" />
          </button>
          <Button className="btn-sm download-btn" onClick={() => router.push(`/dashboard/masters/categories/${rowData.id}/attributes`)}>
            Attributes
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <Card.Header className="pt-3 bg-transparent">
        <div className="">
          <div className="">
            <Row>
              <Col xs={12} md={8}>
                <h2 className="your-cart">
                  Categories (
                  {count}
                  )
                </h2>
              </Col>

              <Col xs={12} md={4} className="text-end">
                <Button variant="primary" className="d-inline-flex me-3" onClick={() => router.push('/dashboard/masters/categories/add-category')}>
                  <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                  {' '}
                  Add Category
                </Button>
                {roles && roles.includes('Admin') && (
                <Button variant="primary" onClick={() => setShowExportModal(true)} className="float-end ">
                  <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
                </Button>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <div>
          <GenericTable
            tableData={CategoriesTableData}
            dataSet={categories.length && categories}
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
        </div>
      </Card.Body>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); getCategories(); }}
        id={editData.id}
        title={editData.name}
        type="category"
        deleteService={
          deleteCategoryService
        }
      />
      <ExportModal
        show={showExportModal}
        onHide={() => setShowExportModal(false)}
        onClose={() => setShowExportModal(false)}
        path={`/admin/export/categories/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`}
        title="Jobs"
        toDate={toDate}
        setTodDate={setTodDate}
        fromDate={fromDate}
        setFromDate={setFromDate}
      />
    </Card>
  );
}
