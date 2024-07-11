
import Dashboard from '../../../../../components/layout/dashboard/appstack/layouts/Dashboard';
import CreateJob from "../../../../../components/dashboard/careers/jobs/CreateJob";

export default function EditJob() {
  return (
    <Dashboard>
      <CreateJob action="EDIT" />
    </Dashboard>
  );
}
