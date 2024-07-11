import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import { deleteServerAssetsService, deleteHardwareAssetsService } from '../../../../services/dashboard/assets/hardware';

export default function DeleteModal(props) {
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const {
    onClose, onHide, data, action,
  } = props;
  const { id } = data;
  console.log('file: DeleteModal.js ~ line 15 ~ DeleteModal ~ data', data);

  const deleteHardwareJob = () => {
    deleteHardwareAssetsService(id, headers).then(({ data, errors: applyErrors }) => {
      if (applyErrors && Object.keys(applyErrors).length) {
        console.log('Login Errors', applyErrors);
      } else {
        onClose();
      }
    });
  };

  const deleteServerJob = () => {
    deleteServerAssetsService(id, headers).then(({ data, errors: applyErrors }) => {
      if (applyErrors && Object.keys(applyErrors).length) {
        console.log('Login Errors', applyErrors);
      } else {
        onClose();
      }
    });
  };

  if (action === 'Hardware') {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className='bg-transparent'>
          <Modal.Title id="contained-modal-title-vcenter" className="text-black">
            Delete Hardware Device
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete Hardware Device?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
          <Button variant="danger" onClick={() => deleteHardwareJob()}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className='bg-transparent'>
        <Modal.Title id="contained-modal-title-vcenter" className="text-black">
          Delete Server
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete Server?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={() => deleteServerJob()}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}
