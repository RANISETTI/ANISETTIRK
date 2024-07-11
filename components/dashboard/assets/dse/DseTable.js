import { faFilter, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, FormControl, InputGroup, Row, Tab, Tabs
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import getHeaders from '../../../../libs/utils/getHeaders';

export default function Dse() {
  const router = useRouter();

  const { accessToken, userDetails: { type: userType } } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  return (
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div className="">
          <div className="">
            <Row>
              <Col>
                <h2 className="your-cart">DSC</h2>
              </Col>
              {/* <Col xs={12} md={3} className="d-flex justify-content-end pb-3 px-0">
                  <InputGroup size="md">
                    <InputGroup.Text id="basic-addon1">
                      {' '}
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Search Here.."
                      aria-label="Username"
                      value={searchHardwareText}
                      // onChange={(e) => {
                      //   router.push({
                      //     pathname: '/dashboard/assets/hardware',
                      //     query: { search: e.target.value },
                      //   });
                      //   setSearchHardwareText(e.target.value);
                      // }}
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
              </Col> */}
              <Col className="text-end px-0">
                <Button variant="primary" className="float-end me-2" onClick={() => router.push('/dashboard/assets/dse/add-dse')}>
                  <FontAwesomeIcon icon={faPlus} />
                  {' '}
                  Add DSC
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Card.Header>
    </Card>

  );
}
