import Axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Api from '../../../config/Api';
import getHeaders from '../../../libs/utils/getHeaders';
import { deleteAddressByAdmin } from '../../../services/dashboard/addresses';

export default function DeleteModal(props) {
  const user = useSelector((state) => state.user);
  const headers = getHeaders(user.accessToken);
  const router = useRouter();

  const {
    onClose, onHide, data,
  } = props;
  const { id } = data;
  const { userDetails } = user;
  const deleteAddress = () => {
    if (userDetails.type === 'APTS') {
      deleteAddressByAdmin(headers, id).then(({ data }) => {
        onClose();
        router.push('/dashboard/procurement/manage-address');
      });
    } else {
      Axios.delete(
        Api.getOrPatchAddress(user?.userDetails?.department?.slug, id),
        { headers },
      ).then(() => {
        onClose();
        router.push('/dashboard/procurement/manage-address');
      }).catch((err) => console.log(err));
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-transparent">
        <Modal.Title id="contained-modal-title-vcenter" className="text-black">
          Delete Address
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete this address ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={() => deleteAddress()}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}
