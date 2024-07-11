import {
  faCircleCheck, faCircleXmark, faPen, faTrash
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useTable } from 'react-table';
import DeleteAttachment from './DeleteAttachment';

function AttachmentTable({ columns, data }) {
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Table bordered hover {...getTableProps()} responsive>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default function AttachmentData(props) {
  console.log('file: AttachmentTable.js ~ line 50 ~ AttachmentData ~ props', props);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [action, setAction] = useState('');

  const [editData, setEditData] = useState([]);

  const router = useRouter();

  const { tableData, tenderId } = props;

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Document',
      accessor: 'document',
      Cell: ({ value }) => (
        <div>
          <Link href={value}>
            <a target="_blank">
              <Button className='btn-sm download-btn'>
                Download
              </Button>
            </a>
          </Link>
        </div>
      ),
    },
    {
      Header: 'Published',
      accessor: 'published',
      Cell: ({ value }) => (
        <div className='text-center'>
          {value ? <FontAwesomeIcon icon={faCircleCheck} className='text-success' /> : <FontAwesomeIcon icon={faCircleXmark} />}
        </div>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ value }) => (
        <div className='d-flex'>
          <button className="apts-admin-tenders-button">
            <FontAwesomeIcon className='text-primary' icon={faPen} onClick={() => router.push(`/dashboard/tenders/list/${tenderId}/attachments/edit-attachment/${value.id}`)} />
          </button>
          <button className="apts-admin-tenders-button" >
            <FontAwesomeIcon className='text-danger' icon={faTrash} onClick={() => { setEditData(value); setShowDeleteModal(true); setAction('DELETE'); }} />
          </button>
        </div>
      ),
    },
  ], []);

  const data = useMemo(() => tableData && tableData.map(
    (result) => ({ ...result, action: result, document: result.attachment }),
  ), []) || [];

  return (
    <div>
      <AttachmentTable columns={columns} data={data} />
      <DeleteAttachment
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        data={editData}
        onClose={() => { router.reload(); setShowDeleteModal(false); }}
        action={action}
        tenderId={tenderId}
      />
    </div>
  );
}
