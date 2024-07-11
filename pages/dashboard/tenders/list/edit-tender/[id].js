import AddTender from '../../../../../components/dashboard/tenders/AddTender';
import Dashboard from '../../../../../components/layout/dashboard/appstack/layouts/Dashboard';

export default function EditTender() {
  return (
    <Dashboard>
      <AddTender action="EDIT" />
    </Dashboard>
  );
}
