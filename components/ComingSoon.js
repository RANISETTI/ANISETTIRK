import React from "react";
import { Container, Card, Image } from "react-bootstrap";

export default function ComingSoon() {
  return (
    <div className="p-t-100">
      <Container>
        <Image  src="/images/coming-soon.jpg" alt="coming-soon" className="comming-soon-img-style" />
      </Container>
    </div>
  );
}
