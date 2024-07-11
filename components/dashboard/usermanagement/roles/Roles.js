import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Pagination
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { deleteDepartmentService, getServices } from '../../../../services/dashboard/masters';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function Roles() {
  const [departments, setDepartments] = useState([]);
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

  const { query: { page, parent } } = router;

  const getSecretariatDepartments = (search) => {
    setIsLoading(true);
    getServices(accessToken, `/admin/departments/?secretariat_departments=${true}&search=${search || 1}`)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setSecretariatDepartments(results);
        }
      }).finally(() => { setIsLoading(false); });
  };

  const getDepartments = (parent) => {
    setIsLoading(true);
    getServices(accessToken, `/admin/departments/?hod_departments=${true}&parent=${parent || ''}&page=${page || 1}`)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setDepartments(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    getDepartments('');
    getSecretariatDepartments('');
  }, []);

  const handlePath = (path) => {
    if (selectDepartment && selectDepartment.id) {
      router.push({
        pathname: '/dashboard/user-management/roles',
        query: {
          parent: selectDepartment.id,
          page:  path.split('page=')[1] ? path.split('page=')[1][0] : 1,
        },
      });
    } else {
      router.push({
        pathname: '/dashboard/user-management/roles',
        query: { page:  path.split('page=')[1] ? path.split('page=')[1][0] : 1},
      });
    }

    const pageNum = path.split('page=')[1] ? path.split('page=')[1][0] : 1;
    setIsLoading(true);

    const url = selectDepartment ? `/admin/departments/?hod_departments=${true}&parent=${selectDepartment.id}&page=${pageNum || 1}` : `/admin/departments/?hod_departments=${true}&page=${pageNum || 1}`;

    getServices(accessToken, url)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setDepartments(results);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(count);
        }
      }).finally(() => { setIsLoading(false); });
  };

  const DepartmentsTableData = [
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
      title: 'Department Name',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div className="d-flex items-center">
          <span>{rowData.name}</span>
        </div>
      ),
    },
    {
      title: 'Code',
      id: 'code',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.code}</span>
        </div>
      ),
    },
    {
      title: 'Parent',
      id: 'parent',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.parent ? rowData.parent.name : '-'}</span>
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
            <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/user-management/roles/
edit-department/${rowData.id}`); setEditData(rowData); }} className="text-primary" />
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
                  Roles (
                  {count}
                  )
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: '300px', marginRight: '20px' }}>
                  <Select
                    name="secretariat_department"
                    defaultValue={selectDepartment}
                    options={secretariatDepartments}
                    getOptionLabel={(options) => options.name}
                    getOptionValue={(options) => options.id}
                    placeholder="Select Secretariat Department"
                    onInputChange={(
                      inputValue,
                      { action, prevInputValue },
                    ) => {
                      switch (action) {
                        case 'set-value':
                          return prevInputValue;
                        case 'input-change':
                          if (inputValue) {
                            getSecretariatDepartments(inputValue);
                          } else {
                            getSecretariatDepartments('');
                          }
                          return inputValue;
                        default:
                          return inputValue;
                      }
                    }}
                    isSearchable
                    isClearable
                    closeMenuOnSelect
                    onChange={(newValue, actionMeta) => {
                      const { action } = actionMeta;
                      if (action === 'select-option' || action === 'remove-value' || action === 'clear') {
                        setSelectDepartment(newValue);
                        getDepartments(newValue && newValue.id);
                        router.push({
                          pathname: '/dashboard/user-management/roles',
                          query: { parent: newValue && newValue.id },
                        });
                      }
                    }}
                  />
                </div>
                <Button variant="primary" onClick={() => router.push('/dashboard/user-management/roles/add-department')} className="float-end">
                  <FontAwesomeIcon icon={faPlus} className="mt-1 me-2 " />
                  {' '}
                  Add Department
                </Button>
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <GenericTable
            tableData={DepartmentsTableData}
            dataSet={departments.length && departments}
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
        onClose={() => { setShowDeleteModal(false); getDepartments(); }}
        id={editData.id}
        title={editData.name}
        type="Department"
        deleteService={deleteDepartmentService}
      />
    </div>
  );
}
