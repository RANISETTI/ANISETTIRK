import { faCheckCircle, faChevronLeft, faTimes, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Card, Spinner, Table, Button, Row, Form, Col
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import getHeaders from '../../../libs/utils/getHeaders';
import axiosInstance from '../../../services/config';
import { getTenderAttachmentService } from '../../../services/dashboard/tenders';
import { genericGetService } from '../../../services/GenericService';
import Page404 from '../../common/customerrorpages/Page404';

export default function TenderDetails() {
  const [tenderDetails, setTenderDetails] = useState();
  const [attachments, setAttachments] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [approveType, setApproveType] = useState('');
  const [showApproveOrderModal, setShowApproveOrderModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [vendors, setVendors] = useState([]);
  const [errors, setErrors] = useState();

  const router = useRouter();
  const { query: { id } } = router;
  console.log(id);
  const {
    accessToken,
    userDetails: { type, roles },
  } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const getTenderDetails = () => {
    setIsLoading(true);
    genericGetService(`/admin/tenders/${id}/`, headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setTenderDetails(data);
          setIsLoading(false);
        }
      });
  };

  const getTenderAttachments = () => {
    setIsLoading(true);
    getTenderAttachmentService(accessToken, id)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          setIsLoading(false);
        } else {
          setAttachments(data);
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    getTenderDetails();
    getTenderAttachments();
  }, []);

  const downloadDocument = (id, name) => {
    axiosInstance.get(`/tenders/${id}/attachments/`, { headers, responseType: 'blob' })
      .then((response) => {
        saveAs(response, `${name}`);
      });
  };

  if (errors && Object.keys(errors).length > 0) {
    return (
      <Page404 errors={errors} />
    );
  }

  const renderTenderDetails = () => (
    <div className="my-3">
      <Table className="order-details mb-0" responsive>
        <thead>
          <tr>
            <th>
              S. No
            </th>
            <th>
              Attachment Name
            </th>
            <th>
              Attachment
            </th>
          </tr>
        </thead>
        <tbody>
          {
            attachments && attachments.map((item, index) => (
              <tr>
                <td>
                  {index + 1}
                </td>
                <td>
                  <p className="text-success text-start m-2">
                    {item.name}
                  </p>
                </td>
                <td>
                  {
                    item.attachment && (
                      <div>
                        <Link href={item.attachment}>
                          <a target="_blank">
                            <p>
                              {item.attachment.split('/').pop()}
                            </p>
                          </a>
                        </Link>
                      </div>
                    )
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );

  if (isLoading || !(tenderDetails && Object.keys(tenderDetails).length)) {
    return (
      <div className="id-loading text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const {
    title,
    type: tenderType,
    notes,
    startDate,
    endDate,

  } = tenderDetails;
  console.log(tenderDetails);
  return (
    <div>
      <Card className="pb-1">
        <Card.Header className="pt-3 bg-transparent">
          <div className="order-details-style1">
            <h3 className="your-cart"> Tender Details </h3>
            <Button className="float-end" onClick={() => router.push('/dashboard/tenders/list')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Card className="py-3 rounded mt-3">
            <Card.Body>
              <Row className=''>
                <Form.Group as={Col} xs={12} md={12} className="mb-2">
                  <Form.Label>Title : </Form.Label>
                  {' '}
                  <Form.Text className=""> {title} </Form.Text>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={12} className="mb-2">
                  <Form.Label>Tender Type :</Form.Label>
                  <Form.Text className=""> {tenderType.name}</Form.Text>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={12} className="mb-2">
                  <Form.Label>Notes :</Form.Label>
                  {' '}
                  <Form.Text className=""> {notes} </Form.Text>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={12} className="mb-2">
                  <Form.Label>Start Date :</Form.Label>
                  <Form.Text className=""> {startDate} </Form.Text>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={12} className="mb-2">
                  <Form.Label>End Date :</Form.Label>
                  <Form.Text className=""> {endDate} </Form.Text>
                </Form.Group>
                
              </Row>
             
            </Card.Body>
          </Card>
          <h3 className="your-cart"> Attchments </h3>
          {renderTenderDetails()}
        </Card.Body>
      </Card>
    </div>
  );
}
