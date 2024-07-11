import React from 'react';
import { Spinner, Table } from 'react-bootstrap';

export default function GenericTable({
  tableData, dataSet, loading,
}) {
  const renderHeaders = () => (
    <tr>
      {
        tableData.map((header) => (
          <th key={header.id} className={`${header.width && header.width}`}>

            {header.title}

          </th>
        ))
      }
    </tr>
  );
  const renderBody = (dataItem, index) => (
    <tr key={dataItem.slug}>
      {
        tableData.map((tableSet) => (
          <td key={tableSet.id}>
            {tableSet.render(dataItem, dataItem[tableSet.id], index)}
          </td>
        ))
      }
    </tr>
  );

  if (loading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          {renderHeaders()}
        </thead>
        <tbody>
          {
            dataSet && dataSet.length ? dataSet.map((dataItem, index) => renderBody(dataItem, index)) : (
              <tr>
                <td colSpan={11} className="text-center p-3 text-danger fw-bold">
                  NO DATA FOUND
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  );
}
