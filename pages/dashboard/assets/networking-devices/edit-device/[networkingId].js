import AddNetworkingDevice from '../../../../../components/dashboard/assets/networkingDevices/AddDevice';
import Dashboard from '../../../../../components/layout/dashboard/appstack/layouts/Dashboard';

export default function EditNetworkingDevicePage() {
  return (
    <Dashboard>
      <AddNetworkingDevice action="Edit" />
    </Dashboard>
  );
}
