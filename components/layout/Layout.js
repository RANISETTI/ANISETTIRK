import React from 'react';
import Footer from './Footer';
import Header from './Header';
import SiteHead from './SiteHead';

export default function Layout({
  title = 'Andhra Pradesh Technology Services Limited | APTS',
  description = 'Andhra Pradesh Technology Services - A nodal agency for IT & Technology services in Andhra Pradesh',
  keywords = 'apts, andhra pradesh technology services, apts vijayawada',
  children,
}) {
  return (
    <div className="bg-light">
      <SiteHead title={title} description={description} keywords={keywords} />
      <Header />
      <div className="bg-gray-50 m-r-84">
        {children}
      </div>
      <Footer />
    </div>
  );
}
