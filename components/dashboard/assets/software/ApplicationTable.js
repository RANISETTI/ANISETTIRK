import {
  faCircleCheck, faCircleXmark, faPen, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Button, Pagination, Spinner, Table,
} from 'react-bootstrap';
import { DeleteSoftwareService } from '../../../../services/dashboard/assets/software';
import DeleteModal from './DeleteModal';

export default function ApplicationTable(props) {
  const {
    applicationData, isLoading, previousPage, nextPage,
    handlePath, setSecurityModal, setsecurityId,
  } = props;
  const router = useRouter();

  const [editData, setEditData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const renderTableData = (values) => {
    const tableRows = [];
    if (values) {
      values.map((item) => {
        tableRows.push(
          <tr>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{`${'IT'}-${item.department.code} - ${item.id}`}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.application_url}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.ip_address}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.data_center && item.data_center.name}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.data_center_address}</td>
            <td className=" text-center" style={{ whiteSpace: 'pre-wrap' }}>
              {item.is_security_enabled ? <FontAwesomeIcon icon={faCircleCheck} className="color-green" />
                : <FontAwesomeIcon icon={faCircleXmark} />}
            </td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.developed_by}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.development_location}</td>
            <td className=" " style={{ whiteSpace: 'pre-wrap' }}>{item.spoc_name}</td>
            <td>
              <Button className="btn-sm download-btn text-nowrap" onClick={() => setSecurityModal(item)}>
                Security Audit
              </Button>
            </td>
            <td className="text-center">
              <Button className="btn-sm primary text-nowrap" onClick={() => router.push(`/dashboard/assets/software/${item.id}/payment`)}>
                Pay Now
              </Button>
            </td>
            <td className="table-action text-center">
              <div className="d-flex">
                <button
                  type="button"
                  className="apts-admin-tenders-button"
                  onClick={() => {
                    router.push(item.type === 'a' ? `/dashboard/assets/software/edit-software/${item.id}`
                      : `/dashboard/assets/software/edit-mobile-app/${item.id}`);
                  }}
                >
                  <FontAwesomeIcon className="text-primary" icon={faPen} />
                </button>
                <button
                  type="button"
                  className="apts-admin-tenders-button"
                  onClick={() => { setEditData(item); setShowDeleteModal(true); }}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-danger" />
                </button>

              </div>
            </td>
          </tr>,
        );
      });
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
        onHide={() => setShowDeleteModal(false)}
        data={editData}
        onClose={() => { setShowDeleteModal(false); router.reload(); }}
        deleteService={DeleteSoftwareService}
      />

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Asset Id
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Application Url
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              IP Address
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Data Center
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Postal Address
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              SSLEnabled
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Developer Company
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Development Location
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Department SPOC
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Request for audit
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Payment
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {applicationData && applicationData.length ? renderTableData(applicationData) : (
            <tr>
              <td colSpan={12} className="text-center p-3 text-danger fw-bold">
                NO DATA FOUND
              </td>
            </tr>
          )}
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
  );
}
