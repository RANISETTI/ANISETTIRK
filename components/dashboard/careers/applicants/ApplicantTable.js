import { saveAs } from 'file-saver';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Pagination, Spinner, Table,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../services/config';
import getApplicantsService from '../../../../services/dashboard/applicants';

export default function ApplicantsTable() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');

  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();
  const {
    query, query: {
      search, page, type, qualification, year_of_passing,
      start_date, end_date,
    },
  } = router;

  console.log('end_date: ', end_date, moment(end_date).format('yyyy-MM-DD'));

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setIsLoading(true);
      getApplicantsService(accessToken, `/admin/job/applications/?page=${page || 1}&job=${type || ''}&qualification=${qualification || ''}&year_of_pass=${Number(year_of_passing) || ''}&start_date=${start_date || ''}&end_date=${end_date || ''}&search=${search || ''}`)
        .then(({
          data, error,
        }) => {
          if (data) {
            const {
              results, count, previous, next,
            } = data;
            setData(results);
            setPreviousPage(previous);
            setNextPage(next);
          }
        })
        .finally(() => { setIsLoading(false); });
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search, type, qualification, year_of_passing, start_date, end_date]);

  const downloadResume = (id, name) => {
    const headers = { Authorization: `Token ${accessToken}` };
    axiosInstance.get(`/admin/job/applications/${id}/resume/`, { headers, responseType: 'blob' })
      .then((response) => {
        saveAs(response, `${name}`);
      });
  };

  const renderTableData = (tableData) => {
    if (tableData.length) {
      return (
        tableData.map((item) => {
          const {
            name, email, phone_number, id, resume, job: {
              title,
              type: { name: typeName },
              locations,
            }, modified_ts, qualification, year_of_pass,
          } = item;
          return (
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              <td>{phone_number}</td>
              <td>
                <Button className="btn-sm download-btn" onClick={() => { downloadResume(id, resume); }}>
                  Download
                </Button>
              </td>
              <td>{title}</td>
              <td>{typeName}</td>
              <td>{qualification && qualification.name}</td>
              <td>{year_of_pass}</td>
              <td>{locations}</td>
              <td>{moment(modified_ts).format('MMM Do YYYY')}</td>
            </tr>
          );
        })
      );
    }
    return null;
  };

  const handlePath = (path) => {
    setIsLoading(true);
    router.push({
      pathname: '/dashboard/careers/applicants',
      query: { ...query, page: (path.includes('page') && path.split('?').map((i) => i.split('='))[1][3].split('&')[0]) || 1 },
    });
    const pageNum = (path.includes('page') && path.split('?').map((i) => i.split('='))[1][3].split('&')[0]) || 1;
    getApplicantsService(accessToken, `/admin/job/applications?page=${pageNum || 1}&job=${type || ''}&qualification=${qualification || ''}&year_of_pass=${Number(year_of_passing) || ''}&start_date=${start_date || ''}&end_date=${end_date || ''}&search=${search || ''}`)
      .then(({ data, error }) => {
        if (data) {
          const {
            results, previous, next, count,
          } = data;
          setData(results);
          setPreviousPage(previous);
          setNextPage(next);
        }
      })
      .finally(() => { setIsLoading(false); });
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
              <th className="">Name</th>
              <th className="">Email</th>
              <th className="">Phone Number</th>
              <th className="">Resume</th>
              <th className="">Job Title</th>
              <th className="">Job Type</th>
              <th className="">Qualifications</th>
              <th className="">Year of Passing</th>
              <th className="">Locations</th>
              <th className="">Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length ? renderTableData(data) : (
              <tr>
                <td colSpan={10} className="text-center p-3 text-danger fw-bold">
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
    </div>
  );
}
