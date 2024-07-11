import React, { useState } from 'react';
import {
  Row, Col, Button, Form, Alert,
} from 'react-bootstrap';

function Splitting({ setSelectedStep }) {
  const [isSplitting, setIsSplitting] = useState(false);
  const [splittingMembers, setSplittingMembers] = useState(0);
  const [isPurchasePreference, setsPurchasePreference] = useState(false);
  const [maxPurchasePreference, setMaxPurchasePreference] = useState(0);
  return (
    <div className="px-4 pb-6">
      <p>Total Quantity: 7</p>
      <Row className="mb-3">
        <Col lg={4} md={4} xs={12}><p>Splitting Required</p></Col>
        <Col>
          <Form.Check type="checkbox" checked={isSplitting} onClick={() => setIsSplitting(!isSplitting)} />
        </Col>
      </Row>
      {
        isSplitting && (
          <Row className="mb-3">
            <Col lg={4} md={4} xs={12}><p>Bid Offer Validity date / time( from end date) *</p></Col>
            <Col lg={4} md={4} xs={12}>
              <Form.Control type="number" max={3} placeholder="Bid Offer Validity days" value={splittingMembers} onChange={(e) => setSplittingMembers(e.target.value)} />
            </Col>
          </Row>
        )
      }
      <Row className="mb-3">
        <Col lg={4} md={4} xs={12}><p>Do you want to provide Purchase Preference to MSE within L1+15% ?</p></Col>
        <Col>
          <Form.Check type="checkbox" checked={isPurchasePreference} onClick={() => setsPurchasePreference(!isPurchasePreference)} />
        </Col>
      </Row>
      {
        isPurchasePreference && (
          <Row className="mb-3">
            <Col lg={4} md={4} xs={12}><p>Number of MSE To BE Considered For Purchase Preference (Max) *</p></Col>
            <Col lg={4} md={4} xs={12}>
              <Form.Control type="number" placeholder="Bid Offer Validity days" value={maxPurchasePreference} onChange={(e) => setMaxPurchasePreference(e.target.value)} />
            </Col>
          </Row>
        )
      }
      <div className="d-flex justify-content-end">
        <Button>Save</Button>
      </div>
    </div>
  );
}

export default Splitting;
