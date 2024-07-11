import {
  faCircleCheck, faCircleXmark, faPen, faPlus, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Col, Image, Pagination, Row, Spinner, Table
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getTeamMembersService, { deleteTeamMemberService } from '../../../../services/dashboard/teams';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function Teams() {
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
    getTeamMembersService(accessToken, `/admin/team/?page=${page || 1}`)
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

  const renderImage = (photo, gender) => {
    if (photo) {
      return (
        <img
          src={photo}
          alt="team-member"
          className="img-thumbnail img-fluid"
          style={{ width: '100px', height: '100px' }}
        />
      );
    }
    if (gender === 'FEMALE') {
      return (
        <Image src="/images/female.jpg" alt="team" className="img-thumbnail img-fluid" style={{ width: '100px', height: '100px' }} />
      );
    }
    return (
      <Image src="/images/male.jpg" alt="team" className="img-thumbnail img-fluid" style={{ width: '100px', height: '100px' }} />
    );
  };

  const renderTableData = (props) => {
    const tableRows = [];
    if (props) {
      {
        props.map((item) => {
          tableRows.push(
            <tr>
              <td>{renderImage(item.photo, item.gender)}</td>
              <td>{item.name}</td>
              <td>{item.designation}</td>
              <td>{item.email}</td>
              <td>{item.phone_number}</td>
              {/* <td>{item.gender_display_name}</td> */}
              <td>{item.sort_order}</td>
              <td>
                <div className="text-center">
                  {item.active ? <FontAwesomeIcon icon={faCircleCheck} className="text-success" /> : <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />}
                </div>
              </td>
              <td className="table-action">
                <button className="apts-admin-tenders-button">
                  <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/cms/teams/edit-member/${item.id}`); }} className="text-primary" />
                </button>
                <button className="apts-admin-tenders-button">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => {
                      setDeleteId(item.id);
                      setDeleteName(item.name);
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

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/cms/teams',
      query: {
        page: (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][0].split('=')[1])) || 1,
      },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][0].split('=')[1])) || 1;
    getTeamMembersService(accessToken, `/admin/team/?page=${pageNum || 1}`)
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

  return (
    <div>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); router.reload(); }}
        id={deleteId}
        title={deleteName}
        type="team member"
        deleteService={deleteTeamMemberService}
      />
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div className="">
            <Row>
              <Col xs={12} md={8}>
                <h3 className="your-cart">Teams</h3>
              </Col>

              <Col xs={12} md={4} className="text-end">
                <Button
                  variant="primary"
                  className=""
                  onClick={() => {
                    router.push('/dashboard/cms/teams/create-member');
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                  {' '}
                  Add Team Member
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
                    <th className="cust-width-table-15">Photo</th>
                    <th className="">Name</th>
                    <th className="">Designation</th>
                    <th className="">Email</th>
                    <th className="cust-width-table-15">Phone Number</th>
                    {/* <th className="">Gender</th> */}
                    <th className="">Sort Order</th>
                    <th className="">Status</th>
                    <th className="">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length ? renderTableData(data) : (
              <tr>
                <td colSpan={8} className='text-center p-3 text-danger fw-bold'>
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
