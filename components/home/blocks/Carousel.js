import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Carousel, Image, Spinner } from 'react-bootstrap';
import getCarouselsService from '../../../services/home';

export default function ImageCarousel() {
  const [carousels, setCarousels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCarouselsService()
      .then(({ data, errors }) => {
        if (errors) {
          console.log('errors', errors);
        }
        if (data) {
          setCarousels(data);
        } else {
          setCarousels([]);
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
      <div>
        <Carousel>
          {carousels.length && carousels.map((carousel) => (
            <Carousel.Item key={carousel.id}>
              <Image
                src={carousel.image}
                className="apts-homepage-carousel"
                alt="carousel"
              />
              <Carousel.Caption className="apts-homepage-carousel-heading">
                <div className="mobile-font-size">
                  <Link href={carousel.link}>
                    <a className="text-white">
                      <h1>{carousel.heading}</h1>
                      <h4>{carousel.sub_heading}</h4>
                    </a>
                  </Link>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
     
    </div>
  );
}
