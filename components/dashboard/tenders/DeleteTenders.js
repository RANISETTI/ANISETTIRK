import React, { useState } from 'react';
import {
  Button, Modal, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteTenderService } from '../../../services/dashboard/tenders';

export default function DeleteTender(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.user);

  const {
    onClose, action, onHide, data: { id, title },
  } = props;

  const deleteTender = () => {
    deleteTenderService(accessToken, id)
      .then(({ data, errors: applyErrors }) => {
        if (applyErrors && Object.keys(applyErrors).length) {
          console.log('Login Errors', applyErrors);
        } else if (data) {
          setIsLoading(false);
          onClose();
        }
      });
  };

  if (isLoading) {
    return (
      <Modal>
        <div className="tender-loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Modal>
    );
  }

  if (action === 'DELETE') {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className='bg-transparent'>
          <Modal.Title id="contained-modal-title-vcenter" className="text-black">
            Delete tender
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete
            {' '}
            {title}
            {' '}
            tender?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button variant="danger" onClick={() => deleteTender()}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return null;
}
