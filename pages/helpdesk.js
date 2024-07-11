import HelpDesk from '../components/HelpDesk';
import ContactUs from '../components/home/blocks/ContactUs';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Layout from '../components/layout/Layout';

export default function HelpDeskPage() {
  return (
    <Layout>
      <Header />
      <HelpDesk />
      <ContactUs />
    </Layout>
  );
}
