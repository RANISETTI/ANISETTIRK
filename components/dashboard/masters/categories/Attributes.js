import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Container,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';
import { deleteAttributeService, getServices } from '../../../../services/dashboard/masters';
import GenericTable from '../../../common/GenericTable';
import DeleteModal from '../../../common/modals/DeleteModal';

export default function Attributes(props) {
  const [attributes, setAttributes] = useState([]);
  const [attributeFields, setAttributeFields] = useState(
    [{
      name: '',
      sortOrder: '',
      isMandatory: false,
      errors: {},
    },
    ],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [formLoding, setFormLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState([]);

  const { accessToken } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const router = useRouter();
  const { asPath } = router;
  const { query: { categoryId } } = router;

  const getAttributes = () => {
    setIsLoading(true);
    getServices(accessToken, `/admin/categories/${categoryId}/attributes/`).then(({ data, errors }) => {
      if (data) {
        setAttributes(data.results);
      } else {
        console.log(errors);
        setAttributes([]);
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAttributes();
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
        <div className="d-flex justify-content-between">
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon icon={faPen} onClick={() => router.push(`/dashboard/masters/categories/${categoryId}/attributes/edit-attribute/${rowData.id}`)} className="text-primary" />
          </button>
          <button type="button" className="apts-admin-tenders-button">
            <FontAwesomeIcon icon={faTrash} onClick={() => { setEditData(rowData); setShowDeleteModal(true); }} className="text-danger" />
          </button>
          <Button className="btn-sm download-btn" onClick={() => router.push(`/dashboard/masters/categories/${categoryId}/attributes/${rowData.id}/attribute-options`)}>
            Attribute options
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Card.Header className="pt-3 bg-transparent">
          <div className="table-responsive">
            <div className="applicants-style">
              <h2 className="your-cart">Attributes</h2>
              <Button variant="primary" onClick={() => router.push(`/dashboard/masters/categories/${categoryId}/attributes/add-attribute`)} className="d-inline-flex">
                <FontAwesomeIcon icon={faPlus} className="mt-1 me-2" />
                {' '}
                Add Attribute
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <GenericTable
            tableData={AttributesTableData}
            dataSet={attributes.length && attributes}
            loading={isLoading}
          />
        </Card.Body>
      </Card>
      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); router.reload(); }}
        id={editData.id}
        title={editData.name}
        type="attribute"
        deleteService={
          () => deleteAttributeService(accessToken, categoryId, editData.id)
        }
      />
    </div>
  );
}
