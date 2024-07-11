import React from 'react';
import Dashboard from '../../../components/layout/dashboard/appstack/layouts/Dashboard';
import Bookings from '../../../components/dashboard/conference/Bookings';

export default function AllBookingsPage() {
  return (
    <Dashboard>
      <Bookings view="All Bookings" />
    </Dashboard>
  );
}
