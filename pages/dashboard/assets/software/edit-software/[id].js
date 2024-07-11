import React from 'react';
import CreateApplication from '../../../../../components/dashboard/assets/software/AddSoftware';
import Dashboard from '../../../../../components/layout/dashboard/appstack/layouts/Dashboard';

export default function AddSoftware() {
  return (
    <Dashboard>
      <CreateApplication action="EDIT" />
    </Dashboard>
  );
}
