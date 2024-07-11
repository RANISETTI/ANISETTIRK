import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

function AddVideos({ productId, storeId, headers }) {
    const renderTableRows = () => {

    }

    const renderAddedImages = () => {
        return (
            <Table striped hover className='table-cust-border'> 
                <thead>
                    <tr>
                        <th>Video</th>
                        <th>Sort Order</th>
                        <th>Featured</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </Table>
        )
    }
    return (
        <div>
            <Button className="mb-3 mt-3">
                Add Videos
            </Button>
            {renderAddedImages()}
        </div>
    )
}

export default AddVideos;