import React, { useState } from 'react';
import {
  Page, Text, View, Document, StyleSheet, PDFViewer, pdf, PDFDownloadLink,
} from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Button, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import FirstPage from './FirstPage';
import Contents from './Contents';
import SectionA from './sectionA/SectionA';
import SectionATable from './sectionA/SectionATable';
import SectionB from './sectionB/SectionB';
import SectionC from './sectionC/SectionC';
import SectionD from './sectionD/SectionD';
import SectionE from './sectionE/SectionE';
import SectionF from './sectionF/SectionF';
import SectionG from './SectionG';
import SectionH from './sectionH/SectionH';
import AnnexureTwo from './Annexures/AnnexureTwo';
import AnnexureThree from './Annexures/AnnexureThree';
import AnnexureFour from './Annexures/AnnexureFour';
import AnnexuresFive from './Annexures/AnnexuresFive';
import BidLetterForm from './forms/BidLetterForm';
import POneForm from './forms/POneForm';
import FormPTwo from './forms/FormP-2';
import TAndC from './tAndC/TAndC';

function CustomizedProductPDF() {
  const [loader, setLoader] = useState(false);
  const { accessToken } = useSelector((state) => state.user);
  const { uid } = useSelector((state) => state.quotation);

  // const uid = '26cedfbf';
  console.log('uid', uid);
  const styles = StyleSheet.create({
    page: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    section: {
      flexGrow: 1,
    },
  });
  const generatePdfDocument = async (fileName) => {
    const blob = await pdf((
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <FirstPage />
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    )).toBlob();
    saveAs(blob, fileName);
  };

  return (
    <div>
      {/* <PDFViewer style={{ height: '90vh', width: '100%' }}>
        <Document onLoadSuccess={loader}>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <FirstPage />
            </View>
            <View break style={styles.section}>
              <Contents />
            </View>
            <View break style={styles.section}>
              <SectionA />
            </View>
            <View break style={styles.section}>
              <SectionB />
            </View>
            <View break style={styles.section}>
              <SectionC />
            </View>
            <View break style={styles.section}>
              <SectionD uid={uid} accessToken={accessToken} />
            </View>
            <View break style={styles.section}>
              <SectionE />
            </View>
            <View break style={styles.section}>
              <SectionF />
            </View>
            <View break style={styles.section}>
              <TAndC uid={uid} accessToken={accessToken} />
            </View>
            <View break style={styles.section}>
              <SectionH />
            </View>
            <View break style={styles.section}>
              <AnnexureTwo />
            </View>
            <View break style={styles.section}>
              <AnnexureThree />
            </View>
            <View break style={styles.section}>
              <AnnexureFour />
            </View>
            <View break style={styles.section}>
              <AnnexuresFive uid={uid} accessToken={accessToken} />
            </View>
            <View break style={styles.section}>
              <BidLetterForm />
            </View>
            <View break style={styles.section}>
              <POneForm />
            </View>
            <View break style={styles.section}>
              <FormPTwo />
            </View>
            <View />
          </Page>
        </Document>
      </PDFViewer> */}
      <PDFDownloadLink
        document={(
          <Document onLoadSuccess={loader}>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <FirstPage />
              </View>
              <View break style={styles.section}>
                <Contents />
              </View>
              <View break style={styles.section}>
                <SectionA />
              </View>
              <View break style={styles.section}>
                <SectionB />
              </View>
              <View break style={styles.section}>
                <SectionC />
              </View>
              <View break style={styles.section}>
                <SectionD uid={uid} accessToken={accessToken} />
              </View>
              <View break style={styles.section}>
                <SectionE />
              </View>
              <View break style={styles.section}>
                <SectionF />
              </View>
              <View break style={styles.section}>
                <TAndC uid={uid} accessToken={accessToken} />
              </View>
              <View break style={styles.section}>
                <SectionH />
              </View>
              <View break style={styles.section}>
                <AnnexureTwo />
              </View>
              <View break style={styles.section}>
                <AnnexureThree />
              </View>
              <View break style={styles.section}>
                <AnnexureFour />
              </View>
              <View break style={styles.section}>
                <AnnexuresFive uid={uid} accessToken={accessToken} />
              </View>
              <View break style={styles.section}>
                <BidLetterForm />
              </View>
              <View break style={styles.section}>
                <POneForm />
              </View>
              <View break style={styles.section}>
                <FormPTwo />
              </View>
              <View />
            </Page>
          </Document>
          )}
        fileName="custom_product.pdf"
      >
        {({
          blob, url, loading, error,
        }) => (loading
          ? (
            <Button variant="primary" disabled className="mx-1 my-3 p-2">
              Loading document...
            </Button>
          )
          : (
            <Button variant="primary" className="mx-1 my-3 p-2">
              Download now!
            </Button>
          ))}
      </PDFDownloadLink>
    </div>
  );
}

export default CustomizedProductPDF;
