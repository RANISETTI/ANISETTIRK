import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Pagination, Spinner, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getNetworkingDevicesServices from '../../../services/dashboard/assets/networkingDevices';
import DeleteModal from './DeleteModal';

export default function NetworkignDevicesTable() {


  const { accessToken } = useSelector((state) => state.user);

  const router = useRouter();
  const { query: { page } } = router;








  return 
}
