
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Col, Row
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteCategoryDocument, getServices } from '../../../../services/dashboard/masters';
import ExportModal from '../../../common/ExportModal';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';


export default function CategoryDocuments() {
    const [categoryDocuments, setCategoryDocuments] = useState([]);
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

    const getCategoryDocuments = () => {
      setIsLoading(true);
      getServices(accessToken, '/admin/category/required/documents')
        .then(({ data }) => {
          if (data) {
            const {
              results, previousPage, nextPage, count,
            } = data;
            setCategoryDocuments(results);
            setPreviousPage(previousPage);
            setNextPage(nextPage);
            setCount(count);
          }
        }).finally(() => { setIsLoading(false); });
    };

    useEffect(() => {
      getCategoryDocuments();
    }, []);

    const DocumentsTableData = [
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
          title: 'Category Name',
          id: 'name',
          width: '',
          render: (rowData) => (
            <div>
              <span>{rowData.category.name}</span>
            </div>
          ),
      },
        {
          title: 'Required Documents',
          id: 'name',
          width: '',
          render: (rowData) => (
          <>

                <div>
                <p> {rowData.document_types.map((item, index) => `${item.name}  `).join()}</p>
              </div>
              </>
          ),
        },
        {
          title: 'Actions',
          id: 'actions',
          width: '',
          render: (rowData) => (
            <div className="d-flex justify-content-between">
              <button type="button" className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/masters/category-documents/${rowData.id}/edit-category-document/`); }} className="text-primary" />
              </button>
              <button type="button" className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faTrash} onClick={() => { setEditData(rowData); setShowDeleteModal(true); }} className="text-danger" />
              </button>
            </div>
          ),
        },
      ];


    return(
        <Card>
        <Card.Header className="pt-3 bg-transparent">
          <div className="">
            <div className="">
              <Row>
                <Col xs={12} md={8}>
                  <h2 className="your-cart">
                    Category Documents (
                    {count}
                    )
                  </h2>
                </Col>

                <Col xs={12} md={4} className="text-end">
                  <Button variant="primary" className="d-inline-flex me-3" onClick={() => router.push('/dashboard/masters/category-documents/add-category-document')}>
                    <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                    {' '}
                    Add Document
                  </Button>
                  {/* {roles && roles.includes('Admin') && (
                  <Button variant="primary" onClick={() => setShowExportModal(true)} className="float-end ">
                    <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
                  </Button>
                  )} */}
                </Col>
              </Row>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            <GenericTable
              tableData={DocumentsTableData}
              dataSet={categoryDocuments.length && categoryDocuments}
              loading={isLoading}
            />
          </div>
        </Card.Body>
        <DeleteModal
          show={showDeleteModal}
          onHide={() => { setShowDeleteModal(false); }}
          onClose={() => { setShowDeleteModal(false); getCategoryDocuments(); }}
          id={editData.id}
          title={editData.name}
          type="category document"
          deleteService={
            deleteCategoryDocument
          }
        />
        <ExportModal
          show={showExportModal}
          onHide={() => setShowExportModal(false)}
          onClose={() => setShowExportModal(false)}
          path={`/admin/export/categoryDocuments/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`}
          title="Jobs"
          toDate={toDate}
          setTodDate={setTodDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
        />
      </Card>
    )
}
