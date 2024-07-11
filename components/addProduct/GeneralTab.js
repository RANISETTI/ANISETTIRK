import React, { useEffect, useState } from 'react';
import {
  Form, Button, Row, Col, Accordion, InputGroup, FormControl,
} from 'react-bootstrap';

function GeneralTab({ categories, headers, prodId }) {
  const renderCategoriesOptions = () => categories.map((category) => (
    <option value={category.id}>{category.name}</option>
  ));
  return (
    <Form>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Basic Information</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control placeholder="Enter product name" />
            </Form.Group>
            <Form.Label htmlFor="basic-url">URL</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">
                /product/
                {prodId}
                /
              </InputGroup.Text>
              <FormControl id="basic-url" aria-describedby="basic-addon3" />
            </InputGroup>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Categories</Form.Label>
              <Form.Select id="disabledSelect">
                {renderCategoriesOptions()}
              </Form.Select>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Product price" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Reference Price</Form.Label>
                <Form.Control type="number" placeholder="Product reference price" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Total Quantity</Form.Label>
                <Form.Control type="number" placeholder="Product quantity" />
              </Form.Group>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Additional Information</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>SKU</Form.Label>
              <Form.Control placeholder="Product SKU" />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="number" placeholder="Product price" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Tax Class</Form.Label>
                <Form.Control type="number" placeholder="Product reference price" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Cost</Form.Label>
                <Form.Control type="number" placeholder="Product price" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Margin Type</Form.Label>
                <Form.Control type="number" placeholder="Product reference price" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Product Margin</Form.Label>
                <Form.Control type="number" placeholder="Product reference price" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Country of  Origin</Form.Label>
                <Form.Control type="number" placeholder="Product reference price" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Weight (grams)</Form.Label>
                <Form.Control type="number" placeholder="Product price" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Minimum Quantity</Form.Label>
                <Form.Control type="number" placeholder="Product reference price" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Maximum Quantity</Form.Label>
                <Form.Control type="number" placeholder="Product reference price" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail" className='flex-column'>
                <Form.Label>Sort Order</Form.Label>
                <Form.Control type="number" placeholder="Sort Order" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label />
                <Form.Check type="checkbox" label="Manage Inventory" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label />
                <Form.Check type="checkbox" label="Featured" />
              </Form.Group>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>SEO</Accordion.Header>
          <Accordion.Body>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail" className='flex-column'>
                <Form.Label>Sort Order</Form.Label>
                <Form.Control type="number" placeholder="SEO Title" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail" className='flex-column'>
                <Form.Label>Sort Description</Form.Label>
                <Form.Control as="textarea" placeholder="SEO Description" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail" className='flex-column'>
                <Form.Label>Sort Keyword</Form.Label>
                <Form.Control as="textarea" type="number" placeholder="SEO Keywordss" />
              </Form.Group>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button variant="primary" className="mt-3 mb-3 float-end" type="submit">Submit</Button>
    </Form>
  );
}

export default GeneralTab;
