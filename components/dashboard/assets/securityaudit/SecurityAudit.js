import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Pagination, Row, Spinner, Table,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import { getSecurityAudits, getSecurityAuditsByDepartment } from '../../../../services/dashboard/assets/software';
import SecurityAuditModal from './SecurityAuditModalone';

export default function SecurityAudit() {
  const router = useRouter();
  const {
    query: {
      search, department, dataCenter, page, os,
    },
  } = router;

  const [securityAuditData, setSecurityAuditData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [count, setCount] = useState();
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  // const [showFilters, setShowFilter] = useState(false);
  // const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  // const [departmentOptions, setDepartmentOptions] = useState([]);
  // const [dataCenterOptions, setDataCenterOptions] = useState([]);
  // const [OSOptions, setOSOptions] = useState([]);
  // const [hodDepartmentType, setHodDepartmentType] = useState('');
  // const [departmentType, setDepartmentType] = useState();
  // const [defaultDepartmentId, setDefaultdepartmentId] = useState(department);
  // const [dataCenterType, setDataCenterType] = useState(dataCenter);
  // const [OSType, setOSType] = useState(os);
  const [securityModal, setSecurityModal] = useState(false);
  const [isAuditReport, setIsAuditReport] = useState(false);
  const [securityData, setSecurityData] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState('');
  const { accessToken, userDetails, userDetails: { type } } = useSelector((state) => state.user);
  const departmentId = userDetails.department && userDetails.department.id;
  const headers = getHeaders(accessToken);

  const getSecurityAuditData = () => {
    (type === 'DEPARTMENT' ? getSecurityAuditsByDepartment(accessToken, departmentId, searchText) : getSecurityAudits(accessToken, searchText))
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setSecurityAuditData(data.results);
        } else {
          setSecurityAuditData([]);
        }
      });
  };

  useEffect(() => {
    getSecurityAuditData();
  }, []);

  const renderTableData = (values) => {
    const tableRows = [];
    if (values) {
      values.map((item) => {
        tableRows.push(
          <tr>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.request_id}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{`${'IT'}-${item.asset.department.code}- ${item.asset.id}`}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.asset.application_url}</td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>
              <p>
                {' '}
                {item.asset.poc_name}
              </p>
              <p>
                (
                {item.asset.spoc_email}
                )
              </p>
            </td>
            <td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.request_date}</td>
            {!(type === 'DEPARTMENT')
                && (
                <td className="text-center" style={{ whiteSpace: 'pre-wrap' }}>
                  <Button
                    disabled={item.status === 'CLOSED'}
                    className="btn-sm download-btn"
                    onClick={() => {
                      setSecurityData(item);
                      setSecurityModal(true);
                      setIsAuditReport(true);
                    }}
                  >
                    Upload
                  </Button>
                </td>
                )}
            <td className="">
              {item.status_display_name}
            </td>
            {!(type === 'DEPARTMENT')
                && (
                <td className="text-center">
                  <Button
                    disabled={item.status === 'CLOSED'}
                    className="btn-sm download-btn"
                    onClick={() => {
                      setSecurityData(item);
                      setSecurityModal(true);
                      setIsAuditReport(false);
                    }}
                  >
                    Update
                  </Button>
                </td>
                )}
            <td className="table-action text-center">
              <div className="d-flex">
                <button type="button" className="apts-admin-tenders-button mx-3" onClick={() => router.push(`/dashboard/assets/security-audit/${departmentId}/audit-history/${item.id}`)}>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-primary"
                  />
                </button>
                <Button className='btn-sm' onClick={() => router.push(`/dashboard/assets/security-audit/${departmentId}/request-payment`)}>
                  Request Payment
                </Button>
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
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Row>
            <Col xs={12} md={4}>
              <h2 className="your-cart">Security Audit</h2>
            </Col>

          </Row>
        </div>
      </Card.Header>
      <SecurityAuditModal
        show={securityModal}
        onHide={() => setSecurityModal(false)}
        onClose={() => {
          setSecurityModal(false);
          getSecurityAuditData();
        }}
        securityAuditData={securityData}
        isAuditReport={isAuditReport}
      />
      <Card.Body>
        <div>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Request Id
                </th>
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Asset Id
                </th>
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Application URL
                </th>
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Department SPOC
                </th>
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Request Details
                </th>
                {!(type === 'DEPARTMENT')
                  && (
                    <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                      Audit Report
                    </th>
                  )}
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Status
                </th>
                {!(type === 'DEPARTMENT')
                  && (
                    <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                      Compliance Report
                    </th>
                  )}
                <th className="" style={{ whiteSpace: 'pre-wrap' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {securityAuditData && securityAuditData.length ?
                renderTableData(securityAuditData) : (
                <tr>
                  <td colSpan={9} className="text-center p-3 text-danger fw-bold">
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

      </Card.Body>
    </Card>
  );
}
