import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Container, Pagination
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getHelpDeskService, { deleteHelpDeskService } from '../../../../services/dashboard/helpdesk';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function HelpDesks({fromDashboard}) {
  const [helpDesks, setHelpDesks] = useState([]);
  const [secretariatDepartments, setSecretariatDepartments] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState();
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();

  const { query: { page, } } = router;

  const getHelpDesks = () => {
    setIsLoading(true);
    const token = fromDashboard ? '' : accessToken;
    const url = fromDashboard ? `/helpdesks/  ` : `/admin/helpdesks/?page=${page || 1}`;

    getHelpDeskService(token, url)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setHelpDesks(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    getHelpDesks('');
  }, []);

  const handlePath = (path) => {
    if (selectDepartment && selectDepartment.id) {
      router.push({
        pathname: '/dashboard/masters/department',
        query: {
          parent: selectDepartment.id,
          page:  path.split('page=')[1] ? path.split('page=')[1][0] : 1,
        },
      });
    } else {
      router.push({
        pathname: '/dashboard/masters/department',
        query: { page:  path.split('page=')[1] ? path.split('page=')[1][0] : 1},
      });
    }

    const pageNum = path.split('page=')[1] ? path.split('page=')[1][0] : 1;
    setIsLoading(true);

    const url = selectDepartment ? `/admin/helpDesks/?hod_departments=${true}&parent=${selectDepartment.id}&page=${pageNum || 1}` : `/admin/helpDesks/?hod_departments=${true}&page=${pageNum || 1}`;

    getServices(accessToken, url)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setHelpDesks(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  const TableData = [
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
      title: 'HelpDesk Recruitment',
      id: 'title',
      width: '',
      render: (rowData) => (
        <div className="d-flex items-center">
          <span>{rowData.title}</span>
        </div>
      ),
    },
     {
      title: 'Reference to steps mentioned',
      id: 'refrence_to_steps',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.reference_to_steps}</span>
        </div>
      ),
    },
    {
      title: 'Contact Person',
      id: 'code',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.contact_person}</span>
        </div>
      ),
    },
    {
      title: 'Contact No',
      id: 'parent',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.contact_no}</span>
        </div>
      ),
    },
      {title: 'Actions',
      id: 'actions',
      width: '',
      render: (rowData) => (
        <div className="d-flex flex-end">
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/cms/helpdesk/edit-helpdesk/${rowData.id}`); setEditData(rowData); }} className="text-primary" />
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
      )
    },
  ];

  return (
    <>
    <div className="apts-downloads-title">
    {fromDashboard &&   <h2 className="text-center apts-services-title p-4">Hepl Desk</h2>}
      </div>
      
      <Card>
        <Card.Header className="pt-3 bg-transparent">
          <div className="">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>
                <h2 className="your-cart">
                  HeplDesk (
                  {count}
                  )
                </h2>
              </div>
              {!fromDashboard && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button variant="primary" onClick={() => router.push('/dashboard/cms/helpdesk/add-helpdesk')} className="float-end">
                  <FontAwesomeIcon icon={faPlus} className="mt-1 me-2 " />
                  {' '}
                  Add Help Desk
                </Button>
              </div>}
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <GenericTable
            tableData={fromDashboard ?  TableData.splice(0,5) : TableData}
            dataSet={helpDesks.length && helpDesks}
            loading={isLoading}
          />
          {/* <Pagination className="pagenation-style">
            <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
              &laquo; Previous
            </Pagination.Prev>
            <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
              Next &raquo;
            </Pagination.Next>
          </Pagination> */}
        </Card.Body>
      </Card>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); getHelpDesks(); }}
        id={editData.id}
        title={editData.name}
        type="Helpdesk"
        deleteService={deleteHelpDeskService}
      />
    </>
  );
}
