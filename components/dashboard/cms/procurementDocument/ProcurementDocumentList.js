import {
  faCircleCheck, faCircleXmark, faPen, faPlus, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Pagination, Row, Spinner, Table,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getProcurementDocumentService, { deletegetProcurementDocumentDetailsService } from '../../../../services/dashboard/procurementDocument';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function ProcurementDocumentList() {
  const router = useRouter();
  const { query: { page } } = router;
  const { accessToken } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deleteName, setDeleteName] = useState('');

  const getProcurementDocuments = () => {
    setIsLoading(true);
    getProcurementDocumentService(accessToken, `/admin/procurement/documents/?page=${page || 1}`)
      .then(({
        data: {
          results, count, previous, next,
        }, error,
      }) => {
        setCount(count);
        setData(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
  };
  useEffect(() => {
    getProcurementDocuments();
  }, [page]);

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/cms/procurement-document',
      query: {
        page: (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][0].split('=')[1])) || 1,
      },
    });
    setIsLoading(true);
  };

  const renderTableData = (tableData) => {
    if (tableData.length) {
      return (tableData.map((item) => {
        const {
          file, active, id,  name,
        } = item;
        return (
          <tr>
            <td>{name}</td>
            <td>
              <div className="text-center">
                {active ? <FontAwesomeIcon icon={faCircleCheck} className="text-success" /> : <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />}
              </div>
            </td>
            <td className="table-action">
              <Link href={file}>
                <a target="_blank">
                  <Button className="btn-sm download-btn">
                    Document
                  </Button>
                </a>
              </Link>
              <button className="apts-admin-tenders-button mx-4" type="button">
                <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/cms/procurement-document/edit-document/${id}`); }} className="text-primary" />
              </button>
              <button className="apts-admin-tenders-button" type="button">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => {
                    setDeleteId(id);
                    setDeleteName(name);
                    setShowDeleteModal(true);
                  }}
                  className="text-danger"
                />
              </button>
            </td>
          </tr>
        );
      }));
    }
    return (
      <tr>
        <td colSpan={3} className="text-center p-3 text-danger fw-bold">
          NO DATA FOUND
        </td>
      </tr>
    );
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
    <div>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); getProcurementDocuments(); }}
        id={deleteId}
        title={deleteName}
        type="procurement document"
        deleteService={deletegetProcurementDocumentDetailsService}
      />
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div className="">
            <Row>
              <Col xs={12} md={8}>
                <h3 className="your-cart">
                  Procurement Document (
                  {count}
                  )
                </h3>
              </Col>
              <Col xs={12} md={4} className="text-end">
                <Button
                  variant="primary"
                  className=""
                  onClick={() => {
                    router.push('/dashboard/cms/procurement-document/add-document');
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                  {' '}
                  Add Document
                </Button>
              </Col>
            </Row>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="">
            <div>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th className="">Document Name</th>
                    <th className=" text-center">Published</th>
                    <th className="">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableData(data)}
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
        </Card.Body>
      </Card>
    </div>
  );
}
