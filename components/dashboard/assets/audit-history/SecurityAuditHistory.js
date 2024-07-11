import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Spinner, Table,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import axiosInstance from '../../../../services/config';
import { getSecurityAuditHistory, getSecurityAuditHistoryById } from '../../../../services/dashboard/assets/software';
import DeleteModal from '../software/DeleteModal';

export default function SecurityAuditHistory() {
  const router = useRouter();
  const {
    query: {
      id, securityId,
    },
  } = router;

  const [securityAuditHistory, setSecurityAuditHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [count, setCount] = useState();
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState('');
  const { accessToken, userDetails: { type } } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const todayDate = moment(new Date()).format('LL');

  const getsecurityDepartmentAuditHistory = () => {
    setIsLoading(true);
    getSecurityAuditHistoryById(accessToken, id, securityId)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setSecurityAuditHistory(data.reports);
        } else {
          setSecurityAuditHistory([]);
        }
      }).finally(() => setIsLoading(false));
  };

  const getsecurityAuditHistory = () => {
    setIsLoading(true);
    getSecurityAuditHistory(accessToken, securityId)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setSecurityAuditHistory(data);
        } else {
          setSecurityAuditHistory([]);
        }
      }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (type === 'DEPARTMENT') {
      getsecurityDepartmentAuditHistory();
    } else {
      getsecurityAuditHistory();
    }
  }, []);

  const downloadFile = (fileId) => {
    axiosInstance.get(`/admin/audit-reports/${fileId}/report/`, { headers, responseType: 'blob' })
      .then((response) => {
        saveAs(response, `${'Audit_Report'}${todayDate}`);
      });
  };

  const renderTableData = (values) => {
    const tableRows = [];
    if (values) {
        values.map((item) => {
          tableRows.push(
            <tr>
              <td className="" style={{ whiteSpace: 'pre-wrap' }}>{moment(item.created_ts).format('YYYY-MM-DD')}</td>
              {/* <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.audit_report && item.audit_report.split('/').pop()}</td> */}
              <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.high_level_issues}</td>
              <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.medium_level_issues}</td>
              <td className="" style={{ whiteSpace: 'pre-wrap' }}>{ item.low_level_issues}</td>

              {!(type === 'DEPARTMENT') && (
              <td className="" style={{ whiteSpace: 'pre-wrap' }}>
                {item.created_by.first_name }
                {item.created_by.last_name}
              </td>
              )}
              <td className="">
                <Button onClick={() => downloadFile(item.id)} className="btn-sm download-btn">
                  Document
                </Button>
              </td>
              <td className=" my-2" style={{ whiteSpace: 'pre-wrap' }}>
                {/* <Button className="btn-sm download-btn">
                  View Report
                </Button> */}
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
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div className="d-flex justify-content-between">
          <h2 className="your-cart">Audit History</h2>
          <Button className="float-end" onClick={() => router.push('/dashboard/assets/security-audit')}>
            <FontAwesomeIcon icon={faChevronLeft} />
            {' '}
            Back
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <div>
          <DeleteModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            data={editData}
            onClose={() => { setShowDeleteModal(false); router.reload(); }}
          />
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Created On
                </th>
                <th>
                  High level issues
                </th>
                <th>
                  Medium level issues
                </th>
                <th>
                  Low level issues
                </th>
                {!(type === 'DEPARTMENT') && (
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Created by
                </th>
                )}
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Audit Report
                </th>
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Compliance Report
                </th>
              </tr>
            </thead>
            <tbody>
              {securityAuditHistory
                && securityAuditHistory.length ? renderTableData(securityAuditHistory) : (
                  <tr>
                    <td colSpan={9} className="text-center p-3 text-danger fw-bold">
                      NO DATA FOUND
                    </td>
                  </tr>
                )}
            </tbody>
          </Table>
          {/* <Pagination className="pagenation-style">
            <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
              &laquo; Previous
            </Pagination.Prev>
            <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
              Next &raquo;
            </Pagination.Next>
          </Pagination> */}
        </div>

      </Card.Body>
    </Card>
  );
}
