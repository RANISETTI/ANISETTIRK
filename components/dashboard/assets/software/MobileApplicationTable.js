import {
  faCircleCheck, faCircleXmark, faPen, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Pagination, Spinner, Table, Button,
} from 'react-bootstrap';
import { DeleteSoftwareService } from '../../../../services/dashboard/assets/software';
import DeleteModal from './DeleteModal';

export default function MobileApplicationTable(props) {
  const {
    mobileApplicationData, isLoading, previousPage, nextPage,
    handlePath, setSecurityModal,
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
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.name}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.os && item.os.name}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>
              {item.is_security_enabled ? <FontAwesomeIcon icon={faCircleCheck} className="color-green" />
                : <FontAwesomeIcon icon={faCircleXmark} />}
            </td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.application_url}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.developed_by}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.development_location}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.spoc_name}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.spoc_email}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.spoc_mobile}</td>
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
                <button type="button" className="apts-admin-tenders-button text-danger" onClick={() => { setEditData(item); setShowDeleteModal(true); }} >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </td>
          </tr>
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
              Mobile Application Name
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Mobile Application OS
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              SSLEnabled
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              App Store URL
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Developer Name
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Development Location
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Department SPOC
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Department Email
            </th>
            <th className="" style={{ whiteSpace: 'pre-wrap' }}>
              Department Moblie
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
          {mobileApplicationData && mobileApplicationData.length ? renderTableData(mobileApplicationData) : (
            <tr>
              <td colSpan={13} className="text-center p-3 text-danger fw-bold">
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
