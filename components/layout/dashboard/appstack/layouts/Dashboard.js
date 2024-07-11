// import NextHead from 'next/head';
import Wrapper from '../Wrapper';
import Sidebar from '../sidebar/Sidebar';
import Main from '../Main';
import Navbar from '../navbar/Navbar';
import Content from '../Content';
import Footer from '../Footer';
import { useSelector } from 'react-redux';

export default function Dashboard({ children }) {
  const { userDetails} = useSelector(state => state.user);



  return (
    <div className='dash-style'>
      {/* <NextHead>
        <title>Dashboard | APTS</title>
      </NextHead> */}
      <Wrapper>
       {!((userDetails && userDetails.type === 'VENDOR') && (userDetails.organization && userDetails.organization.status === 'REJECTED')) &&  <Sidebar />}
        <Main>
          <Navbar />
          <Content >
                {children}
              </Content> 
          <Footer />
        </Main>
      </Wrapper>
    </div>
  );
}
