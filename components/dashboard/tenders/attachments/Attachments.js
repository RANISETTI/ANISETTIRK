import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTenderAttachmentService, getTenderDetailsService } from '../../../../services/dashboard/tenders';
import AttachmentData from './AttachmentTable';

export default function TenderAttachments() {
  const [tenderDetails, setTenderDetails] = useState([]);
  const [attachmentData, setAttachmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { accessToken } = useSelector((state) => state.user);
  const router = useRouter();

  const tenderId = router.asPath.split('/')[4];

  useEffect(() => {
    setIsLoading(true);
    getTenderDetailsService(accessToken, tenderId)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          setTenderDetails(data);
        }
      });
    getTenderAttachmentService(accessToken, tenderId)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          setAttachmentData(data);
        }
      })
      .finally(() => { setIsLoading(false); });
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
    <div>
      <Card>
        <Card.Header className="pt-3 bg-transparent">
          <div>
            <Button className="float-end" onClick={() => router.push('/dashboard/tenders/list/')}>
              <FontAwesomeIcon icon={faChevronLeft} />
              {' '}
              Back </Button>
              <Button variant="primary" className="float-end mx-3" onClick={() => router.push(`/dashboard/tenders/list/${tenderId}/attachments/add-attachment`)}>
              <FontAwesomeIcon icon={faPlus} />
              {' '}
              Add Attachment </Button>
            <h3 className="your-cart"> Tender Attachments 
              {' '}
              </h3>
          </div>
        </Card.Header>
        <Card.Body className="pb-4">
          <Card className='p-3 mt-3'>
          {tenderDetails && tenderDetails.title} {' '} Attachments
          </Card>
          <p>
          <AttachmentData tableData={attachmentData} accessToken={accessToken} tenderId={tenderId} />
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
