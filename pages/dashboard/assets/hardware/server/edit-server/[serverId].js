import AddServer from '../../../../../../components/dashboard/assets/hardware/AddServer';
import Dashboard from '../../../../../../components/layout/dashboard/appstack/layouts/Dashboard';

export default function EditServerPage() {
  return (
    <Dashboard>
      <AddServer action="EDIT" />
    </Dashboard>
  );
}
