import { faChevronLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Card, Container,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { deleteAttributeOptionsService, getServices } from '../../../../services/dashboard/masters';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function AttributeOptions(props) {
  const router = useRouter();
  const { attributeId, categoryId } = router.query;
  console.log('file: AttributeOptions.js ~ line 15 ~ AttributeOptions ~ router.query', router.query);
  const { accessToken } = useSelector((state) => state.user);

  const [attributeOptions, setAttributeOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});


  const getAttributeOptions = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/attributes/${attributeId}/options/`).then(({ data, errors }) => {
      if (errors) {
        console.log(errors);
      } else {
        setAttributeOptions(data.results);
        console.log('file: AttributeOptions.js ~ line 28 ~ getServices ~ data', data);
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAttributeOptions();
  }, []);

  const AttributesTableData = [
    {
      title: 'S. No.',
      id: 'no',
      width: '',
      render: (rowData, name, index) => (
        <div>
          <span>{(index + 1)}</span>
        </div>
      ),
    },
    {
      title: 'Name',
      id: 'name',
      width: '',
      render: (rowData) => (
        <div>
          <span>{rowData.name}</span>
        </div>
      ),
    },
    {
      title: 'Actions',
      id: 'actions',
      width: '',
      render: (rowData) => (
        <div className="d-flex">
          <button type="button" className="apts-admin-tenders-button px-3">
            <FontAwesomeIcon icon={faPen} onClick={() => router.push(`/dashboard/masters/categories/${categoryId}/attributes/edit-attribute/${attributeId}`)} className="text-primary" />
          </button>
          <button type="button" className="apts-admin-tenders-button px-3">
            <FontAwesomeIcon icon={faTrash} onClick={() => { setEditData(rowData); setShowDeleteModal(true); }} className="text-danger" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Card className="p-2">
      <Card.Header className="pt-3 bg-transparent">
        <div className="d-flex justify-content-between">
          <h3 className="your-cart">
            Attributes Options
          </h3>
          <Button
            className="px-3"
            onClick={() => router.push(`/dashboard/masters/categories/${categoryId}/attributes`)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            { ' ' }
            Back
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <GenericTable
          tableData={AttributesTableData}
          dataSet={attributeOptions.length && attributeOptions}
          loading={isLoading}
        />
      </Card.Body>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); router.reload(); }}
        id={editData.id}
        title={editData.name}
        type="attribute option"
        deleteService={
          () => deleteAttributeOptionsService(accessToken, attributeId, editData.id)
        }
      />
    </Card>
  );
}
