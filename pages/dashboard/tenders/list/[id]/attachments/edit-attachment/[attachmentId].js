import AddTenderAttachment from '../../../../../../../components/dashboard/tenders/attachments/AddAttachment';
import Dashboard from '../../../../../../../components/layout/dashboard/appstack/layouts/Dashboard';

export default function TendersPage() {
  return (
    <Dashboard>
      <AddTenderAttachment action="EDIT" />
    </Dashboard>
  );
}
