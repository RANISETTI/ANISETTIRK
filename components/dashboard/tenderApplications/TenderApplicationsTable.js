import { saveAs } from 'file-saver';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Pagination, Spinner, Table
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../services/config';
import getTenderApplicationsService from '../../../services/dashboard/tenderApplications';

export default function TenderApplicationsTable(props) {
  const { searchText, page } = props;
  const [applicantsData, setapplicantsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');

  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (searchText) {
      const delayDebounceFn = setTimeout(() => {
        setIsLoading(true);
        router.push({
          pathname: '/dashboard/tenders/auditor-applications',
          query: { search: searchText },
        });
        getTenderApplicationsService(accessToken, '', searchText)
          .then(({
            data: {
              results,
              previous,
              next,
              count,
            }, error,
          }) => {
            setapplicantsData(results);
            setPreviousPage(previous);
            setNextPage(next);
          }).finally(() => { setIsLoading(false); });
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
    setIsLoading(true);
    getTenderApplicationsService(accessToken, 1)
      .then(({
        data: {
          results, count, previous, next,
        }, error,
      }) => {
        setapplicantsData(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
  }, [searchText]);

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const handlePath = (path) => {
    router.push({
      pathname: '/dashboard/tenders/auditor-applications',
      query: { page: (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1 },
    });
    setIsLoading(true);
    const pageNum = (path.includes('page') && path.split('?').map((i) => i.split('='))[1][1]) || 1;
    getTenderApplicationsService(accessToken, pageNum)
      .then(({
        data: {
          results, previous, next, count,
        }, error,
      }) => {
        setapplicantsData(results);
        setPreviousPage(previous);
        setNextPage(next);
      })
      .finally(() => { setIsLoading(false); });
  };

  const downloadDocument = (id, name, value) => {
    const headers = { Authorization: `Token ${accessToken}` };
    axiosInstance.get(`/admin/tender/applications/${id}/${value}/`, { headers, responseType: 'blob' })
      .then((response) => {
        saveAs(response, `${name}`);
      });
  };

  const renderTableData = (props) => {
    const tableRows = [];
    console.log(props);
    if (props) {
      {
        props.map((item) => {
          tableRows.push(
            <tr>
              <td>{item.company_name}</td>
              <td>{item.email}</td>
              <td>{item.mobile_number}</td>
              <td>
                <Button className='btn-sm download-btn'  onClick={() => { downloadDocument(item.id, item.technical_proposal, 'technical-proposal'); }}>
                  Download
                </Button>
              </td>
              <td>
                <Button className='btn-sm download-btn'  onClick={() => { downloadDocument(item.id, item.commercial_proposal, 'commercial-proposal'); }}>
                  Download
                </Button>
              </td>
              <td>{moment(item.modified_ts).format('MMM Do YYYY')}</td>
            </tr>,
          );
        });
      }
    }
    return tableRows;
  };

  return (
    <div>
      <div>
        <Table bordered responsive>
          <thead>
            <tr>
              <th className=''>Company Name</th>
              <th className='cust-width-table-'>Email</th>
              <th className='cust-width-table-17'>Phone Number</th>
              <th className='cust-width-table-15'>Technical Proposal</th>
              <th className='cust-width-table-18'>Commercial Proposal</th>
              <th className='cust-width-table-18'>Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {applicantsData && applicantsData.length ? renderTableData(applicantsData) : (
              <tr>
                <td colSpan={6} className='text-center p-3 text-danger fw-bold'>
                  NO DATA FOUND
                </td>
              </tr>
            )

            }
          </tbody>
        </Table>
        <Pagination className='pagenation-style'>
          <Pagination.Prev onClick={() => handlePath(previousPage)} disabled={!previousPage}>
            &laquo; Previous
          </Pagination.Prev>
          <Pagination.Next onClick={() => handlePath(nextPage)} disabled={!nextPage}>
            Next &raquo;
          </Pagination.Next>
        </Pagination>
      </div>
    </div>
  );
}
