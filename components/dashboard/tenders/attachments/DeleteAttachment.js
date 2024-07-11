import React, { useState } from 'react';
import {
  Button, Modal, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteTenderAttachmentService } from '../../../../services/dashboard/tenders';

export default function EditAttachment(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.user);

  const {
    onClose, action, onHide, tenderId, data,
  } = props;
  const { name, id } = data;

  const deleteTenderAttachment = () => {
    deleteTenderAttachmentService(accessToken, tenderId, id)
      .then(({ data, errors: deleteErrors }) => {
        if (deleteErrors && Object.keys(deleteErrors).length) {
          console.log('Delete Errors', deleteErrors);
        } else{
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
            Delete attachment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete
            {' '}
            {name}
            {' '}
            attachment?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button variant="danger" onClick={() => deleteTenderAttachment()}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return null;
}
