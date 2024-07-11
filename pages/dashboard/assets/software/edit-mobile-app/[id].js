import React from 'react';
import CreateMobileApplication from '../../../../../components/dashboard/assets/software/AddMobile';
import Dashboard from '../../../../../components/layout/dashboard/appstack/layouts/Dashboard';

export default function AddSoftware() {
  return (
    <Dashboard>
      <CreateMobileApplication action="EDIT" />
    </Dashboard>
  );
}
