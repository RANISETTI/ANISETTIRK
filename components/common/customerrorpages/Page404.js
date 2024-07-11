import Link from 'next/link';
import React from 'react';
import { faSadTear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Image
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Page404({errors}) {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div>
      <Card className="p-5">
        <div className="text-center">
        <div>
         <Image src="/images/404.jpg" className="rounded m-auto bordered bg-light" />
          </div>
          <h5 className="display-4 fw-bold purpule">404</h5>
          <p className="h2 magenta text-center">{errors ? `Detail ${errors} ` :'Page not found.'}</p>
          <p className="h3 fw-normal mt-3 mb-4 your-cart text-center">
            The page you are looking for might have been removed.
          </p>
          <Link href={isLoggedIn ? '/dashboard' : '/'}>
            <a>
              <Button variant="primary" className='btn-success px-4'>
                Return to website
              </Button>
            </a>
          </Link>
        </div>
      </Card>
    </div>
  );
}
