import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Breadcrumb, Card, Col, Container, Image, Row, Spinner
} from 'react-bootstrap';
import { getTeamDetailsService } from '../services/home';

const renderImage = (photo, gender) => {
  if (photo) {
    return (
      <img
        src={photo}
        alt="team-member"
      />
    );
  } else if(gender === 'FEMALE'){
    return (
      <Image src="/images/female.jpg" alt="team" />
    );
  }
  return (
    <Image src="/images/male.jpg" alt="team" />
  );
};

const renderOurteamContent = (teamData) => {
  const Teams = [];
  {
    teamData.map((team) => {
      Teams.push(
        <Col xs={12} md={4} xl={3}>
          <Card className="apts-team-card">
            {renderImage(team.photo, team.gender)}
            <Card.Body>
              <Card.Title className="text-center">{team.name}</Card.Title>
              <Card.Text className="text-center">{team.designation}</Card.Text>
              <Card.Text className="text-center">
                <strong className="font-12">Phone/Mobile:</strong>
                {' '}
                {team.phone_number}
              </Card.Text>
              <Card.Text className="text-center">
                <strong className="font-12">Email ID:</strong>
                {' '}
                {team.email}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>,
      );
    });
  }
  return Teams;
};

export default function OurTeams() {
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTeamDetailsService()
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setTeamData(data);
        } else {
          setTeamData([]);
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
    <div>
      <div className="ourteam-page-bg-style">
        <div className="ourteam-page-bg-style1">
          <Container className="position-relative innerPage">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">
                  <a className="text-dec-color">
                    Home
                  </a>
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="text-white">Our Team</Breadcrumb.Item>
            </Breadcrumb>
            <h2 className="text-white my-2 text-uppercase"> Meet Our Team</h2>
          </Container>
        </div>
      </div>
      <div className="ourteam-bg">
          <Container>
            <h2 className="apts-team-title">
              MEET OUR TEAM
            </h2>
            <Row xs={2} md={4} className="g-3 mb-4">
              {teamData && teamData.length ? renderOurteamContent(teamData) : 'No Data Available'}
            </Row>
          </Container>
      </div>
    </div>
  );
}
