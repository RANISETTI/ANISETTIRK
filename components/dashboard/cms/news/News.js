import {
  faCircleCheck, faCircleXmark, faFilter, faPen, faPlus, faSearch, faTrash, faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Card, Col, Form, Pagination, Row, Spinner, Table, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getNewsService, { deleteNewsService } from '../../../../services/dashboard/news';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function News() {
  const router = useRouter();
  const { query: { page } } = router;
  const { accessToken } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deleteName, setDeleteName] = useState('');

  useEffect(() => {
    getNewsService(accessToken, `/admin/news/?page=${page || 1}`)
      .then(({
        data: {
          results, count, previous, next,
        }, error,
      }) => {
        setData(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
  }, []);

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/cms/news',
      query: {
        page: (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][0].split('=')[1])) || 1,
      },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][0].split('=')[1])) || 1;
    getNewsService(accessToken, `/admin/news/?page=${pageNum || 1}`)
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        setData(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
  };

  const renderTableData = (props) => {
    const tableRows = [];
    if (props) {
      {
        props.map((item) => {
          tableRows.push(
            <tr>
              <td>{item.title}</td>
              <td>{item.link}</td>
              <td>{item.sort_order}</td>
              <td>
                <div className="text-center">
                  {item.published ? <FontAwesomeIcon icon={faCircleCheck} className="text-success" /> : <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />}
                </div>
              </td>
              <td className="table-action">
                <button className="apts-admin-tenders-button">
                  <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/cms/news/edit-news/${item.id}`); }} className="text-primary" />
                </button>
                <button className="apts-admin-tenders-button">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => {
                      setDeleteId(item.id);
                      setDeleteName(item.title);
                      setShowDeleteModal(true);
                    }}
                    className="text-danger"
                  />
                </button>
              </td>
            </tr>,
          );
        });
      }
    }
    return tableRows;
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
        onClose={() => { setShowDeleteModal(false); router.reload(); }}
        id={deleteId}
        title={deleteName}
        type="News Content"
        deleteService={deleteNewsService}
      />
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div className="">
          <Row>
          <Col xs={12} md={8}>
            <h3 className="your-cart">News</h3>
            </Col>
          <Col xs={12} md={4} className='text-end'>
            <Button
              variant="primary"
              className=""
              onClick={() => {
                router.push('/dashboard/cms/news/add-news');
              }}
            >
              <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
              {' '}
              Add News
            </Button>
            </Col>
            </Row>
          </div>
        </Card.Header>
        <Card.Body>
          <div className=''>
            <div>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th className="">Content</th>
                    <th className="">Link</th>
                    <th className="">Sort Order</th>
                    <th className="">Published</th>
                    <th className="">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length ? renderTableData(data) : (
              <tr>
                <td colSpan={5} className='text-center p-3 text-danger fw-bold'>
                  NO DATA FOUND
                </td>
              </tr>
            )
                  
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
        </Card.Body>
      </Card>
    </div>
  );
}
