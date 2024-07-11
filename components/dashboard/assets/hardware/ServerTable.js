import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Pagination, Spinner, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getServerAssetsService } from '../../../../services/dashboard/assets/hardware';
import DeleteModal from './DeleteModal';

export default function ServerTable(props) {
  const {
    departmentType,
    OSType, page,
    serverType,
    hostLocation,
    serverMake,
    searchText,
  } = props;
  const [hardwareData, setHardwareData] = useState([]);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [action, setAction] = useState('');

  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (departmentType || OSType || serverType || serverMake || hostLocation) {
      router.push({
        pathname: '/dashboard/assets/hardware/',
        query: {
          page,
          department_name: departmentType,
          make: serverMake,
          type: serverType,
          operating_system: OSType,
          host_location: hostLocation,
        },
      });
    }
    if (searchText) {
      const delayDebounceFn = setTimeout(() => {
        setIsLoading(true);
        router.push({
          pathname: '/dashboard/assets/hardware',
          query: { search_server: searchText },
        });
        getServerAssetsService(accessToken, `/admin/server-assets/?search=${searchText || ''}`)
          .then(({
            data: {
              results, count, previous, next,
            }, error,
          }) => {
            setHardwareData(results);
            setPreviousPage(previous);
            setNextPage(next);
          }).finally(() => { setIsLoading(false); });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
    getServerAssetsService(accessToken, `/admin/server-assets/?page=${page || 1}&department=${departmentType || ''}&os=${OSType || ''}&make=${serverMake || ''}&type=${serverType || ''}&host_location=${hostLocation || ''}`)
      .then(({
        data: {
          results, count, previous, next,
        }, error,
      }) => {
        setHardwareData(results);
        setPreviousPage(previous);
        setNextPage(next);
      }).finally(() => setIsLoading(false));
  }, [departmentType, OSType, serverType, serverMake, hostLocation, searchText]);

  const handlePath = (path) => {
    console.log((path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][4]).split('=')[1]), "mknnkn");
    router.push({
      pathname: '/dashboard/assets/hardware',
      query: {
        page: (path.includes('page') && (path.split('?').map((i) => i.split('&'))[1][4]).split('=')[1]) || 1,
        department_name: departmentType,
        make: serverMake,
        type: serverType,
        operating_system: OSType,
        host_location: hostLocation,
      },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && ((path.split('?').map((i) => i.split('&'))[1][4]).split('=')[1])) || 1;

    getServerAssetsService(accessToken, `/admin/server-assets/?page=${pageNum || 1}&department=${departmentType || ''}&os=${OSType || ''}&make=${serverMake || ''}&type=${serverType || ''}&host_location=${hostLocation || ''}`)
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        setHardwareData(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
  };

  const renderTableData = (props) => {
    const tableRows = [];
    if (props) {
      { props.map((item) => {
        tableRows.push(
          <tr>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{`${'IT'}-${item.department.code} - ${item.id}`}</td>
            <td>{item.department && item.department.name}</td>
            <td>{item.type && item.type.name}</td>
            <td>{item.os && item.os.name}</td>
            <td>{item.make && item.make.name}</td>
            <td>{item.model}</td>
            <td>{item.hard_disk}</td>
            <td>{item.ram}</td>
            <td>{item.host_location && item.host_location.name}</td>
            <td>{item.spoc_name}</td>
            <td className="table-action">
              <button className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/assets/hardware/server/edit-server/${item.id}`); }} className='text-primary' />
              </button>
              <button className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faTrash} onClick={() => { setDeleteData(item); setShowDeleteModal(true); setAction('Server'); }} className='text-danger' />
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
      <div>
        <Table bordered responsive>
          <thead>
            <tr>
              {/* <th>Type</th> */}
              <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Asset Id
            </th>
              <th>Department</th>
              <th>Server Type</th>
              <th>OS</th>
              <th>Make</th>
              <th>Model</th>
              <th>Storage(in GB)</th>
              <th>Ram</th>
              <th>Physical Location</th>
              <th>SPOC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hardwareData.length ? renderTableData(hardwareData) : (
              <tr>
                <td colSpan={10} className='text-center p-3 text-danger fw-bold'>
                  NO DATA FOUND
                </td>
              </tr>
            )

            }
          </tbody>
        </Table>
        <Pagination className='pagenation-style' >
          <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
            &laquo; Previous
          </Pagination.Prev>
          <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
            Next &raquo;
          </Pagination.Next>
        </Pagination>
      </div>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        data={deleteData}
        onClose={() => { router.reload(); setShowDeleteModal(false); }}
        action={action}
      />
    </div>
  );
}
