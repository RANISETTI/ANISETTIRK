import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Dashboard from '../../components/dashboard/dashboard';
import DashboardLayout from '../../components/layout/dashboard/appstack/layouts/Dashboard';
// import { getServices } from '../../../../../services/dashboard/masters';
import { useRouter } from 'next/router';
import { getServices } from '../../services/dashboard/masters';




export default function TestPage() {
  const { accessToken,userDetails,isLoggedIn} = useSelector(state => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [vendorDetails, setVendorDetails] = useState('');

  const router = useRouter();




  const getVendorEmpanelmentDetails = () => {
    setIsLoading(true);
    getServices(accessToken,`/vendors/${userDetails.organization?.id}/edit/`).then(({ data }) => {
      if (data) {
        setVendorDetails(data)
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() =>{
    if(userDetails && userDetails.type === 'VENDOR' ){
      getVendorEmpanelmentDetails();
    }
  },[])

  const renderDetails = () =>(
    <div className='text-center' style={{
      margin: '20px', padding:'20px', borderRadius:15, backgroundColor:'white'}}>
          <div className='my-10'>
        <p style={{
          fontSize: '25px', textAlign:'center', fontWeight:'400px'}}>Your application has been rejected  </p>
            <div style={{
          fontSize: '15px', textAlign:'center', fontWeight:'400px', color:'red', marginBottom:20}}>{vendorDetails.rejected_reason}
            </div>
        <Button variant="primary"onClick={() => router.push(`/dashboard/my-profile/edit/?application_rejected=${true}`)}>Resubmit your application</Button>
          </div>
        </div>
  )

if(((userDetails && userDetails.type === 'VENDOR') &&  (userDetails.organization && userDetails.organization.status === 'REJECTED'))){
  return(
    <DashboardLayout>
      {renderDetails()}
    </DashboardLayout>
  )
}
  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
}
