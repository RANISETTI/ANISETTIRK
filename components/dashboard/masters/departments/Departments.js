import {
  faFileCsv,
  faPen, faPlus, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Col, Pagination, Row
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import getHeaders from '../../../../libs/utils/getHeaders';
import axiosInstance from '../../../../services/config';
import getSecretariatDepartments from '../../../../services/dashboard/departments';
import { deleteDepartmentService, getServices } from '../../../../services/dashboard/masters';
import ExportModal from '../../../common/ExportModal';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [secretariatDepartments, setSecretariatDepartments] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState();
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

  const { query: { page, parent } } = router;

  const headers = getHeaders(accessToken);

  const todayDate = moment(new Date()).format('LL');

  const getDepartments = (search) => {
    getSecretariatDepartments(search, headers)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setSecretariatDepartments(results);
        }
      }).finally(() => { setIsLoading(false); });
  };

  const getHodDepartments = (parent) => {
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
    getHodDepartments('');
    getDepartments('');
  }, []);

  const handlePath = (path) => {
    if (selectDepartment && selectDepartment.id) {
      router.push({
        pathname: '/dashboard/masters/department',
        query: {
          parent: selectDepartment.id,
          page: path.split('page=')[1] ? path.split('page=')[1][0] : 1,
        },
      });
    } else {
      router.push({
        pathname: '/dashboard/masters/department',
        query: { page: path.split('page=')[1] ? path.split('page=')[1][0] : 1 },
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
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                router.push(`/dashboard/masters/department/edit-department/${rowData.id}`); setEditData(rowData);
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

  const downloadFile = () => {
    axiosInstance.get('/admin/export/departments/', { headers, responseType: 'blob' })
      .then((response) => {
        saveAs(response, `${'departments_'}${todayDate}.csv`);
      });
  };
  return (
    <div>

      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">

          <Row>
            <Col xs={12} md={4}>
              <h2 className="your-cart">
                Departments (
                {count}
                )
              </h2>
            </Col>
            <Col xs={12} md={8} className="d-flex justify-content-end pb-3 px-0">
              <div style={{ width: '350px' }}>
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
                          getDepartments(inputValue);
                        } else {
                          getDepartments('');
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
                      getHodDepartments(newValue && newValue.id);
                      router.push({
                        pathname: '/dashboard/masters/department',
                        query: { parent: newValue && newValue.id },
                      });
                    }
                  }}
                />
              </div>
              <Button variant="primary" onClick={() => router.push('/dashboard/masters/department/add-department')} className="float-end mx-3">
                <FontAwesomeIcon icon={faPlus} className="mt-1 me-2 " />
                {' '}
                Add department
              </Button>
              {roles && roles.includes('Admin') && (
              <Button variant="primary" onClick={() => setShowExportModal(true)} className="float-end me-3">
                <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
              </Button>

              )}
            </Col>
          </Row>
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
        onClose={() => { setShowDeleteModal(false); getHodDepartments(); }}
        id={editData.id}
        title={editData.name}
        type="Department"
        deleteService={deleteDepartmentService}
      />
      <ExportModal
        show={showExportModal}
        onHide={() => setShowExportModal(false)}
        onClose={() => setShowExportModal(false)}
        path={`/admin/export/departments/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`}
        title="Departments"
        toDate={toDate}
        setTodDate={setTodDate}
        fromDate={fromDate}
        setFromDate={setFromDate}
      />
    </div>
  );
}
