import {
  faCircleCheck, faCircleXmark, faPen, faPlus, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Pagination, Tab, Tabs,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteDepartmentUserService, deleteDepartmentVendorService, getServices } from '../../../../services/dashboard/masters';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function Users() {
  const [key, setKey] = useState('department');
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState();
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [vendorpreviousPage, setVendorPreviousPage] = useState(null);
  const [vendorNextPage, setVendorNextPage] = useState(null);
  const [count, setCount] = useState(0);
  const [vendorcount, setVendorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();

  const { query: { page, parent } } = router;

  const getUsers = (parent) => {
    setIsLoading(true);
    getServices(accessToken, '/admin/users/')
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setUsers(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  const getVendorUsers = () => {
    setIsLoading(true);
    getServices(accessToken, '/admin/vendor/users/')
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setVendors(results);
          setVendorPreviousPage(previous);
          setVendorNextPage(next);
          setVendorCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    getUsers('');
    getVendorUsers('');
  }, []);

  const handlePath = (path) => {
    if (selectDepartment && selectDepartment.id) {
      router.push({
        pathname: '/dashboard/user-management/users',
        query: {
          parent: selectDepartment.id,
          page: path.split('page=')[1] ? path.split('page=')[1][0] : 1,
        },
      });
    } else {
      router.push({
        pathname: '/dashboard/user-management/users',
        query: { page: path.split('page=')[1] ? path.split('page=')[1][0] : 1 },
      });
    }

    const pageNum = path.split('page=')[1] ? path.split('page=')[1][0] : 1;
    setIsLoading(true);

    const url = selectDepartment ? `/admin/users/?hod_departments=${true}&parent=${selectDepartment.id}&page=${pageNum || 1}` : `/admin/users/?hod_departments=${true}&page=${pageNum || 1}`;

    getServices(accessToken, url)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setUsers(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  const deleteService = () => {
    if (key === 'vendor') {
      deleteDepartmentVendorService(accessToken, !editData.user.is_active, editData.id).then(({ errors }) => {
        if (!errors) {
          setShowDeleteModal(false);
        }
      });
    } else {
      deleteDepartmentUserService(accessToken, !editData.user.is_active, editData.id)
        .then(({ errors }) => {
          if (!errors) {
            setShowDeleteModal(false);
          }
        });
    }
  };

  const DepartmentUsersTableData = [
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
      title: 'User',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div className="d-flex items-center">
          <span>
            {rowData.user.first_name}
            {rowData.user.last_name}
          </span>
        </div>
      ),
    },
    {
      title: 'Role',
      id: 'role',
      width: '',
      render: (rowData) => (
        <div>
          {rowData.roles.map((role) => (
            <span>
              {role.name}
              {', '}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Email',
      id: 'email',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.user.email ? rowData.user.email : '-'}</span>
        </div>
      ),
    },
    {
      title: 'Mobile',
      id: 'mobile',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.user.mobile ? rowData.user.mobile : '-'}</span>
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
            {rowData.user.is_active
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
        <div className="d-flex flex-end">
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                router.push(`/dashboard/user-management/users/
edit-department-user/${rowData.id}`); setEditData(rowData);
              }}
              className="text-primary"
            />
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
  const VendorUsersTableData = [
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
      title: 'User',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div className="d-flex items-center">
          <span>
            {rowData.user.first_name}
            {rowData.user.last_name}
          </span>
        </div>
      ),
    },
    // {
    //   title: 'Role',
    //   id: 'role',
    //   width: '',
    //   render: (rowData) => (
    //     <div>
    //         <span>
    //           {rowData.role.name}
    //         </span>
    //     </div>
    //   ),
    // },
    {
      title: 'Email',
      id: 'email',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.user.email ? rowData.user.email : '-'}</span>
        </div>
      ),
    },
    {
      title: 'Mobile',
      id: 'mobile',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.user.mobile ? rowData.user.mobile : '-'}</span>
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
            {rowData.user.is_active
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
        <div className="d-flex flex-end">
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                router.push(`/dashboard/user-management/users/
edit-vendor-user/${rowData.id}`); setEditData(rowData);
              }}
              className="text-primary"
            />
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
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>
                <h2 className="your-cart">
                  Users (
                  {key === 'department' ? count : vendorcount}
                  )
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button variant="primary" onClick={() => router.push('/dashboard/user-management/users/add-department-user')} className="float-end mx-2">
                  <FontAwesomeIcon icon={faPlus} className="mt-1 me-2 " />
                  {' '}
                  Add Department User
                </Button>
                {/* <Button variant="primary" onClick={() => router.push('/dashboard/user-management/users/add-vendor-user')} className="float-end">
                  <FontAwesomeIcon icon={faPlus} className="mt-1 me-2 " />
                  {' '}
                  Add Vendor User
                </Button> */}
              </div>
            </div>
          </div>
        </Card.Header>
        {/* <Tabs
          activeKey={key}
          id="uncontrolled-tab-example"
          className="mb-3 mx-3"
          onSelect={(k) => {
            setKey(k);
          }}
        >
          <Tab eventKey="department" title="Department Users"> */}
            <Card.Body>
              <GenericTable
                tableData={DepartmentUsersTableData}
                dataSet={users.length && users}
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
          {/* </Tab>
          <Tab eventKey="vendor" title="Vendor Users">
            <Card.Body>
              <GenericTable
                tableData={VendorUsersTableData}
                dataSet={vendors.length && vendors}
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
          </Tab>
        </Tabs> */}

      </Card>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); getUsers(); }}
        id={editData.id}
        title={editData.name}
        type={key === 'vendor' ? 'Vendor User' : 'Department User'}
        handleDelete={() => deleteService()}
      />
    </div>
  );
}
