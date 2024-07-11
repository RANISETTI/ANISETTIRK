import { faFileCsv, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, FormControl, InputGroup, Row, Spinner
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getHeaders from '../../../libs/utils/getHeaders';
import getTenderApplicationsService from '../../../services/dashboard/tenderApplications';
import ExportModal from '../../common/ExportModal';
import TenderApplicationsTable from './TenderApplicationsTable';

export default function TenderApplications() {
  const router = useRouter();
  const { query: { search, page } } = router;
  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState(search);
  const [applicantsData, setApplicantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTodDate] = useState(new Date());
  // const [previousPage, setPreviousPage] = useState('');
  // const [nextPage, setNextPage] = useState('');

  const headers = getHeaders(accessToken);

  useEffect(() => {
    getTenderApplicationsService(accessToken, page)
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        setApplicantsData(results);
        // setPreviousPage(previous);
        // setNextPage(next);
      });
  }, []);

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
    <Card>
      <Card.Header className="pt-3 bg-transparent">
        <div className="">
          <div className="">
            <Row>
              <Col xs={12} md={8}>
                <h2 className="your-cart">Auditor Applications</h2>
              </Col>
              <Col xs={12} md={4}>
                <div className="applicants-style1">
                  <InputGroup size="md" className="mx-3">
                    <InputGroup.Text id="basic-addon1">
                      {' '}
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Search Here.."
                      aria-label="Username"
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                        router.push({
                          pathname: '/dashboard/tenders/auditor-applications',
                          query: { search: e.target.value },
                        });
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  {roles && roles.includes('Admin') && (
                  <Button variant="primary" onClick={() => setShowExportModal(true)} className="float-end">
                    <FontAwesomeIcon icon={faFileCsv} className="mt-1" size="lg" />
                  </Button>

                  )}
                </div>

              </Col>
            </Row>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <TenderApplicationsTable searchText={searchText} page={page} />
        <ExportModal
          show={showExportModal}
          onHide={() => setShowExportModal(false)}
          onClose={() => setShowExportModal(false)}
          path={`/admin/export/tender-applications/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`}
          title="Tender Applications"
          toDate={toDate}
          setTodDate={setTodDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
        />
      </Card.Body>
    </Card>
  );
}
