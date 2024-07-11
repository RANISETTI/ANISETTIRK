import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Pagination, Spinner, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getHardwareAssetsService } from '../../../../services/dashboard/assets/hardware';
import DeleteModal from './DeleteModal';

export default function HardwareTable(props) {
  const {
    isLoading, hardwareData, nextPage, previousPage, handlePath,
  } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [action, setAction] = useState('');

  const router = useRouter();
  const renderTableData = (value) => {
    const tableRows = [];
    if (value) {
      { value.map((item) => {
        tableRows.push(
          <tr>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{`${'IT'}-${item.department.code} - ${item.id}`}</td>
            <td>{item.department && item.department.name}</td>
            <td>{item.os && item.os.name}</td>
            <td>{item.district && item.district.name}</td>
            <td>{item.municipality && item.municipality.name}</td>
            <td>{item.quantity}</td>
            <td>{item.other_details}</td>
            <td>{item.spoc_name}</td>
            <td>{item.spoc_email}</td>
            <td>{item.spoc_mobile}</td>
            <td className="table-action">
              <button className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/assets/hardware/edit-hardware/${item.id}`); }} className='text-primary' />
              </button>
              <button className="apts-admin-tenders-button">
                <FontAwesomeIcon icon={faTrash} onClick={() => { setDeleteData(item); setShowDeleteModal(true); setAction('Hardware'); }} className='text-danger' />
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
      <div >
        <Table bordered responsive>
          <thead>
            <tr>
              {/* <th>Type</th> */}
              <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Asset Id
            </th>
              <th>Department</th>
              <th>OS</th>
              <th>District</th>
              <th>Municipality</th>
              <th>Quantity</th>
              <th>Other Details</th>
              <th>SPOC</th>
              <th>Email</th>
              <th>Mobile</th>
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

      </div>
      <Pagination className='mt-3 pagenation-style'>
          <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
            &laquo; Previous
          </Pagination.Prev>
          <Pagination.Next
            onClick={() => {
              handlePath(nextPage);
            }}
            disabled={!nextPage}
          >
            Next &raquo;
          </Pagination.Next>
        </Pagination>
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
