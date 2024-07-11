import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';

export default function DeleteModal(props) {
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const {
    onClose, onHide, deleteService, data,
  } = props;
  const { type, id } = data;

  const deleteJob = () => {
    deleteService(headers, id).then(({ data, errors: applyErrors }) => {
      if (applyErrors && Object.keys(applyErrors).length) {
        console.log('Login Errors', applyErrors);
      } else {
        onClose();
      }
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete
          {' '}
          {type === 'a' ? 'Application' : 'Mobile App'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete
          {' '}
          {type === 'a' ? 'Application' : 'Mobile App'}
          {' '}
          ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={() => deleteJob()}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}
