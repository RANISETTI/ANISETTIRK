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
import getEmpanelledService, { deleteEmpanelledService } from '../../../../services/dashboard/empanelledlist';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function EmpanelmentList() {
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

  const getEmpanelledList = () => {
    setIsLoading(true);
    getEmpanelledService(accessToken, `/admin/empanelled/vendor/list/?page=${page || 1}`)
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
    getEmpanelledList();
  }, [page]);

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/vendor-empanelment/empanelmentlist',
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
          file, active, id, title,
        } = item;
        return (
          <tr>
            <td>{file.split('/').pop()}</td>
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
                <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/vendor-empanelment/empanelmentlist/edit-empanelment-list/${id}`); }} className="text-primary" />
              </button>
              <button className="apts-admin-tenders-button" type="button">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => {
                    setDeleteId(id);
                    setDeleteName(title);
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
        onClose={() => { setShowDeleteModal(false); getEmpanelledList(); }}
        id={deleteId}
        title={deleteName}
        type="Empanelled List Content"
        deleteService={deleteEmpanelledService}
      />
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div className="">
            <Row>
              <Col xs={12} md={8}>
                <h3 className="your-cart">
                  Empanelment List (
                  {count}
                  )
                </h3>
              </Col>
              <Col xs={12} md={4} className="text-end">
                <Button
                  variant="primary"
                  className=""
                  onClick={() => {
                    router.push('/dashboard/vendor-empanelment/empanelmentlist/add-empanelment-list');
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                  {' '}
                  Add Empanelment List
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
