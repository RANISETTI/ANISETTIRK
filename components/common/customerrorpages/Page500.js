import Link from 'next/link';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Page500() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div>
      <Card>
        <div className="text-center">
          <h1 className="display-1 fw-bold">500</h1>
          <p className="h1">Internal server error.</p>
          <p className="h2 fw-normal mt-3 mb-4">
            The server encountered something unexpected that didn't allow it to
            complete the request.
          </p>
          <Link href={isLoggedIn ? '/dashboard' : '/'}>
            <a>
              <Button variant="primary" size="lg">
                Return to website
              </Button>
            </a>
          </Link>
        </div>
      </Card>
    </div>
  );
}
