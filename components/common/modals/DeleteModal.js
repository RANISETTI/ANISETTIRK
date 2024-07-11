import { useState } from 'react';
import {
  Button, CloseButton, Modal, Spinner,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function DeleteModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState();
  const { accessToken } = useSelector((state) => state.user);

  const {
    onClose, onHide, id, title, deleteService, type, handleDelete,
  } = props;

  const deleteJob = () => {
    deleteService(accessToken, id).then(({ errors: applyErrors }) => {
      if (applyErrors && Object.keys(applyErrors).length) {
        setErrors(applyErrors);
      } else {
        setIsLoading(false);
        setErrors();
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

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        className="bg-transparent"
      >
        <Modal.Title id="contained-modal-title-vcenter" className="text-black">
          Delete
          {' '}
          {type}
        </Modal.Title>
        <CloseButton onClick={() => {
          setErrors();
          onHide();
        }}
        />
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete
          {' '}
          {type}
          {' '}
          {title}
          ?
        </p>
        <p style={{ color: '#dc3545', fontSize: '14px' }}>
          {errors && errors.non_field_errors}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setErrors();
            onHide();
          }}
        >
          Close

        </Button>
        <Button variant="danger" onClick={() => (handleDelete ? handleDelete() : deleteJob())}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}
