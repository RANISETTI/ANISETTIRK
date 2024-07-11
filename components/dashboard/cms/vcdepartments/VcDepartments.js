import {
  faPen, faPlus, faTrash, faFileCsv,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteVCDepartmentService, getServices } from '../../../../services/dashboard/masters';
import ExportModal from '../../../common/ExportModal';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function VcDepartments() {
  const [vcDepartments, setVcDepartments] = useState([]);
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

  const getVcDepartments = (parent) => {
    setIsLoading(true);
    getServices(accessToken, `/admin/vc-departments/?page=${page || 1}`)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setVcDepartments(data);
          setPreviousPage(previous);
          setNextPage(next);
          setCount(data.length);
        }
      }).finally(() => { setIsLoading(false); });
  };

  useEffect(() => {
    getVcDepartments('');
  }, []);

  const handlePath = (path) => {
    if (selectDepartment && selectDepartment.id) {
      router.push({
        pathname: '/dashboard/conference/department',
        query: {
          parent: selectDepartment.id,
          page: path.split('page=')[1] ? path.split('page=')[1][0] : 1,
        },
      });
    } else {
      router.push({
        pathname: '/dashboard/conference/department',
        query: { page: path.split('page=')[1] ? path.split('page=')[1][0] : 1 },
      });
    }

    const pageNum = path.split('page=')[1] ? path.split('page=')[1][0] : 1;
    setIsLoading(true);

    const url = selectDepartment ? `/admin/vcDepartments/?hod_departments=${true}&parent=${selectDepartment.id}&page=${pageNum || 1}` : `/admin/vcDepartments/?hod_departments=${true}&page=${pageNum || 1}`;

    getServices(accessToken, url)
      .then(({ data }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setVcDepartments(results);
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
      title: 'Actions',
      id: 'actions',
      width: '',
      render: (rowData) => (
        <div className="d-flex flex-end text-center">
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => {
                router.push(`/dashboard/conference/vc-departments
/edit-vc-department/${rowData.id}`); setEditData(rowData);
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
                  VC Departments (
                  {count}
                  )
                </h2>
              </div>
              <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center',
              }}
              >
                <Button variant="primary" onClick={() => router.push('/dashboard/conference/vc-departments/add-vc-department')} className="float-end mx-3">
                  <FontAwesomeIcon icon={faPlus} className="mt-1 me-2 " />
                  {' '}
                  Add VC Department
                </Button>
                {roles && roles.includes('Admin') && (
                <Button variant="primary" onClick={() => setShowExportModal(true)} className="float-end">
                  <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
                </Button>

                )}
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <GenericTable
            tableData={TableData}
            dataSet={vcDepartments.length && vcDepartments}
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
        onClose={() => { setShowDeleteModal(false); getVcDepartments(); }}
        id={editData.id}
        title={editData.name}
        type="VC Department"
        deleteService={deleteVCDepartmentService}
      />
      <ExportModal
        show={showExportModal}
        onHide={() => setShowExportModal(false)}
        onClose={() => setShowExportModal(false)}
        path={`/admin/export/vc-departments/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`}
        title="VcDepartments"
        toDate={toDate}
        setTodDate={setTodDate}
        fromDate={fromDate}
        setFromDate={setFromDate}
      />
    </div>
  );
}
