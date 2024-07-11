import {
  faFileLines, faQuoteLeft, faQuoteRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Carousel, Col, Container, Row, Spinner
} from 'react-bootstrap';
import { genericGetService } from '../../../services/GenericService';
import { getNewsService } from '../../../services/home';

const renderTenders = (tenderDetails) => {
  const tendersData = [];
  {
    tenderDetails.map(
      (data) => {
        tendersData.push(
          <Row>
            <Col>
              <p className="text-white">
                {' '}
                <FontAwesomeIcon icon={faFileLines} className="apts-news-tenders-icon" />
                {' '}
                {data.title}
              </p>
            </Col>
          </Row>,
        );
      },
    );
  }
  return tendersData;
};

const renderNewsCarousel = (newsDetails) => (
  <div className='tenders-scroll'>

    {newsDetails.map((news) => (

      <div className="text-white mb-3">
        <FontAwesomeIcon icon={faQuoteLeft} className="apts-news-tenders-icon fa-lg mx-2" />
        {' '}
        <Link href={news.link} passHref>
          <a className="text-white" target="_blank">
            {news.title}
          </a>
        </Link>
        {' '}
        <FontAwesomeIcon icon={faQuoteRight} className="apts-news-tenders-icon fa-lg mx-2" />
      </div>

    ))}

  </div>
);

export default function News() {
  const [tenderDetails, setTenderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newsDetails, setNewsDetails] = useState([]);

  useEffect(() => {
    getNewsService()
      .then(({ data, errors }) => {
        if (errors) {
          setIsLoading(false);
        } else {
          setNewsDetails(data);
          setIsLoading(false);
        }
      });
    genericGetService('/tenders/', {})
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setTenderDetails(data);
        } else {
          setTenderDetails([]);
        }
      }).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="apts-tenders-background-image">
      <div className="apts-news-background">
        <Container>
          <Row>
            <Col className="apts-news-heading cust-head1" xs={12} md={12}>
              <h2>LATEST TENDERS</h2>
              <div className="tenders-scroll">
                {tenderDetails && tenderDetails.length ? renderTenders(tenderDetails) : 'No Tenders Available'}
              </div>
            </Col>
           {/*<Col className="apts-news-heading cust-head1 cust-head-h2" xs={12} md={6}>
              <h2 className="cust-head-h2-1">NEWS &amp; UPDATES</h2>
              {newsDetails && newsDetails.length ? renderNewsCarousel(newsDetails) : 'No News Available'}
  </Col> */} 
          </Row>
        </Container>
      </div>
    </div>
  );
}
