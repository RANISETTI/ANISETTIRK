import {
  faCircleCheck, faCircleXmark, faEye, faFileArrowUp, faFileCsv, faFilter, faPen, faPlus,
  faSearch, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row, Spinner, Table,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getHeaders from '../../../libs/utils/getHeaders';
import { getTendersService } from '../../../services/dashboard/tenders';
import { genericGetService } from '../../../services/GenericService';
import ExportModal from '../../common/ExportModal';
import DeleteTender from './DeleteTenders';

export default function Tenders() {
  const router = useRouter();
  const {
    query,
    query: {
      search, type, active, page,
    },
  } = router;

  const [tendersData, setTendersData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tenderTypeOptions, setTenderTypeOptions] = useState([]);
  const [previousPage, setPreviousPage] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [editData, setEditData] = useState([]);
  const [action, setAction] = useState([]);
  const [showFilters, setShowFilter] = useState(false);
  const [tenderType, setTenderType] = useState(type || '');
  const [published, setPublished] = useState(active || '');
  const [searchText, setSearchText] = useState(search || '');
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setTodDate] = useState(new Date());

  const { accessToken, userDetails: { roles } } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  function getTenderTypes() {
    genericGetService('/admin/tender/types/?published=true', headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setTenderTypeOptions(data);
          // setPreviousPage(data.previous);
          // setNextPage(data.next);
        } else {
          setTenderTypeOptions([]);
        }
      });
  }

  function getTenders() {
    const delayDebounceFn = setTimeout(() => {
      setIsLoading(true);
      getTendersService(accessToken, `/admin/tenders/?type=${tenderType || ''}&page=${page || 1}&published=${published || ''}&search=${searchText || ''}`)
        .then(({
          data: {
            results, previous, next, count,
          }, error,
        }) => {
          setTendersData(results);
          setPreviousPage(previous);
          setNextPage(next);
        }).finally(() => { setIsLoading(false); });
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }

  useEffect(() => {
    getTenderTypes();
    getTenders();
    if (tenderType || published) {
      setShowFilter(true);
    }
  }, [searchText, tenderType, page, published]);

  const renderFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Form.Group className="mb-3">
          <Row>
            <Col xs={12} md={6}>
              <Form.Label className="font-weight-bold">Tender Type</Form.Label>
              <Form.Select
                id="tenderType"
                name="tenderType"
                value={tenderType}
                onChange={(e) => {
                  router.push({
                    pathname: '/dashboard/tenders/list',
                    query: { ...query, type: e.target.value, page: 1 },
                  });
                  setTenderType(e.target.value);
                }}
              >
                <option value="">Select a type</option>
                {tenderTypeOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={6}>
              <Form.Label className="font-weight-bold">Published</Form.Label>
              <Form.Select
                autoFocus
                type="text"
                autoComplete="off"
                id="published"
                name="published"
                value={published}
                onChange={(e) => {
                  router.push({
                    pathname: '/dashboard/tenders/list',
                    query: { ...query, active: e.target.value, page: 1 },
                  });
                  setPublished(e.target.value);
                }}
              >
                <option value="">Select an option</option>
                <option value>
                  Yes
                </option>
                <option value={false}>
                  No
                </option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Card>
  );

  const handlePath = (path) => {
    setIsLoading(true);
    router.push({
      pathname: '/dashboard/tenders/list',
      query: {
        ...query,
        page: (path.includes('page') && (path.split('?').map((i) => i.split('='))[1][1]).split('&')[0]) || 1,
      },
    });
  };

  const renderTables = () => (
    <div>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>
              Type
            </th>
            <th>
              Title
            </th>
            <th>
              Start Date
            </th>
            <th>
              End Date
            </th>
            <th>
              Published
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tendersData && tendersData.length ? renderTableData(tendersData) : (
            <tr>
              <td colSpan={6} className="text-center p-3 text-danger fw-bold">
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

  const renderTableData = (props) => {
    const tableRows = [];
    if (props) {
      props.map((item) => {
        tableRows.push(
          <tr>
            <td>
              {' '}
              {item.type.name}
            </td>
            <td className="limit-char">
              {item.title}
            </td>
            <td>{item.start_date}</td>
            <td>{item.end_date}</td>
            <td>
              <div className="text-center">
                {item.published
                  ? <FontAwesomeIcon icon={faCircleCheck} className="text-success" />
                  : <FontAwesomeIcon icon={faCircleXmark} className="text-danger" />}
              </div>
            </td>
            <td className="table-action text-center">
              <div className="d-flex">
                <button type="button" className="apts-admin-tenders-button">
                  <FontAwesomeIcon icon={faEye} onClick={() => { router.push(`/dashboard/tenders/list/${item.id}`); }} className="text-primary" />
                </button>
                <button type="button" className="apts-admin-tenders-button">
                  <FontAwesomeIcon icon={faPen} onClick={() => { router.push(`/dashboard/tenders/list/edit-tender/${item.id}`); }} className="text-primary" />
                </button>
                <button type="button" className="apts-admin-tenders-button">
                  <FontAwesomeIcon icon={faTrash} onClick={() => { setEditData(item); setShowModal(true); setAction('DELETE'); }} className="text-danger" />
                </button>
                <button type="button" className="apts-admin-tenders-button">
                  <FontAwesomeIcon icon={faFileArrowUp} onClick={() => { router.push(`/dashboard/tenders/list/${item.id}/attachments`); }} className="text-info" />
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
    <Card>
      <Card.Header className="pt-3 bg-transparent">
        <div className="">
          <div className="">
            <Row>
              <Col xs={12} md={6}>
                <h2 className="your-cart">Tenders</h2>
              </Col>
              <Col xs={12} md={6}>
                <div className="applicants-style1">
                  <InputGroup size="md">
                    <InputGroup.Text id="basic-addon1">
                      {' '}
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Search Here.."
                      aria-label="Username"
                      value={searchText}
                      onChange={(e) => {
                        router.push({
                          pathname: '/dashboard/tenders/list',
                          query: { ...query, search: e.target.value },
                        });
                        setSearchText(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <Button variant="primary" className="mx-3" onClick={() => setShowFilter(!showFilters)}>
                    <FontAwesomeIcon icon={faFilter} />
                  </Button>
                  <Button variant="primary" onClick={() => router.push('/dashboard/tenders/list/add-tender')} className="d-inline-flex text-nowrap me-3">
                    <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                    {' '}
                    {' '}
                    Add Tender
                  </Button>
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
        {showFilters && renderFilters()}
        {renderTables()}
        <DeleteTender
          show={showModal}
          onHide={() => setShowModal(false)}
          data={editData}
          onClose={() => {
            setShowModal(false);
            getTenders();
          }}
          action={action}
        />
        <ExportModal
          show={showExportModal}
          onHide={() => setShowExportModal(false)}
          onClose={() => setShowExportModal(false)}
          path={`/admin/export/tenders/?from_date=${moment(fromDate).format('YYYY-MM-DD')}&to_date=${moment(toDate).format('YYYY-MM-DD')}`}
          title="Tenders"
          toDate={toDate}
          setTodDate={setTodDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
        />
      </Card.Body>
    </Card>
  );
}
