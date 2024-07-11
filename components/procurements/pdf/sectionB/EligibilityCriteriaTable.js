import React from 'react';
import {
  Text, View, StyleSheet, Link,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function EligibilityCriteriaTable() {
  const {
    margin, padding, fontSize, weight, fontFamily, flex,
  } = CommonStyles;
  const data = {
    id: '5df3180a09ea16dc4b95f910',
    items: [
      {
        id: 1,
        left: 'Eligible Bidders',
        right: (
          <View>
            <View style={{ marginLeft: '15px' }}>
              <Text>
                •	Manufacturer of
              </Text>
              <Text>
                •	Authorized representative of a manufacturer or
              </Text>
              <Text>
                •	Whole sale dealer
              </Text>
            </View>
            <Text>
              and should be in business of manufacture and or supply and maintenance of the IT & IT related equipment’s (or products type  under procurement) for a minimum period of three (3) years in India as on bid calling date.
            </Text>
          </View>),
      },
      {
        id: 2,
        left: 'Consortium ',
        right: (
          <View>
            <Text>
              Not Applicable/ Consortium of bidders is submitted to bid. Please refer B.2. for consortium terms and conditions.
            </Text>
            <Text>
              &#60;&#60;Incase consortium is permitted. Criteria to be met by each consortium member either individually or jointly is to  be mentioned&#62;&#62;&#62;&#62;
            </Text>
          </View>
        ),
      },
      {
        id: 3,
        left: 'AP GST Registration',
        right: (
          <View style={flex('column'), margin([0, 0, 0, 5])}>
            <View style={[flex('row')]}>
              <Text>•</Text>
              <Text style={margin([0, 0, 0, 10])}>Bidder should have at least one office with GST Registration in any of the 13 districts of AP.</Text>
            </View>
            <View style={[flex('row')]}>
              <Text>•</Text>
              <Text style={margin([0, 0, 0, 10])}>Billing/Invoice should be done from offices located in AP only.</Text>
            </View>
            <View style={[flex('row')]}>
              <Text>•</Text>
              <Text style={margin([0, 0, 0, 10])}>In case, Bidder does not have office in AP as on bid submission date, should submit an undertaking in Pre-qualification bid, to open the office in AP and register for AP GST.</Text>
            </View>
            <View style={[flex('row')]}>
              <Text>•</Text>
              <Text style={margin([0, 0, 0, 10])}>All Invoices should be raised with APGST Number only</Text>
            </View>
          </View>
        ),
      },
      {
        id: 4,
        left: 'Manufacturer’s Authorization Form  ',
        right: (
          <Text>
            The Bidder should submit the Manufacturer’s Authorization Form (MAF)
            for all the offered products / items,
            in the format provided at Annexure-III, specific to this tender issued
            by OEM authorizing the bidder to submit the bid for tendering which is deemed as
            an agreement in between the bidder and OEM for the support and spares t
            ill the warranty period.
          </Text>),
      },
      {
        id: 5,
        left: 'Service Centre Requirements',
        right: (
          <View>
            <Text>
              The Bidder/OEM should have Service Center /Franchise Service Centre in each district of Andhra Pradesh as on bid submission date. The details are to be provided in Form P-4.
            </Text>
            <Text style={margin([15, 0, 0, 0])}>
              In case Bidder/OEM does not have the service centers/Franchise service center as on bid submission date, bidder/OEM should give an undertaking in PQ bid to open the service centers as specified above and should submit the Service Centers / Franchise service center details before the due date of Delivery in case the contract is awarded. Failing which the Purchaser may forfeit the PBG and cancel the contract.
            </Text>
          </View>
        ),
      },
      {
        id: 6,
        left: 'Financial Turnover Criteria',
        right: (
          <View>
            <Text style={margin([10, 0, 0, 0])}>
              Minimum Rs. _____________ for the last three financial years as on bid calling date.
            </Text>
            <Text>
              (200% of the proposed project value computed on annual basis for the last three financial years as on bid calling date.
              Reference: G.O. Ms. No. 16, dated 19-07-2016).

            </Text>
            <Text>
              Provisional/Unaudited Certificate from CA is acceptable incase audit is not completed for last financial year.
            </Text>
          </View>
        ),
      },
      {
        id: 7,
        left: 'Positive Net Worth:',
        right: (
          <View>
            <Text style={margin([10, 0, 0, 0])}>
              The bidder should have an increasing and positive net worth during the last three financial years as on bid calling date.
            </Text>
            <Text style={margin([10, 0, 0, 0])}>
              (Reference: G.O.Ms.No. 16, dated 19-07-2016)
            </Text>
          </View>
        ),
      },
      {
        id: 8,
        left: 'Project Experience Criteria',
        right: (
          <View>
            <Text>
              The Bidder/OEM should have successfully executed &#60;&#60;similar projects&#62;&#62; in the last three financial years as mentioned below:
            </Text>
            <View style={[flex('row'), margin([10, 0, 0, 0])]}>
              <Text>(a)</Text>
              <Text style={margin([0, 0, 0, 10])}>single project of Rs.______ (100%* of proposed project value, computed on an annual basis) or </Text>
            </View>
            <View style={[flex('row'), margin([10, 0, 0, 0])]}>
              <Text>(b)</Text>
              <Text style={margin([0, 0, 0, 10])}>two projects of Rs. __________ each (55%* of proposed project value, computed on an annual basis) or</Text>
            </View>
            <View style={[flex('row'), margin([10, 0, 0, 0])]}>
              <Text>(c)</Text>
              <Text style={margin([0, 0, 0, 10])}>three projects of Rs. ________  each (40%* of proposed project value, computed on an annual basis)</Text>
            </View>
            <View style={[flex('row'), margin([10, 0, 0, 0])]}>
              <Text>*</Text>
              <Text style={margin([0, 0, 0, 10])}>The percentages will vary depending on type of project as per  G.O.Ms.No. 16, dated 19-07-2016)</Text>
            </View>
          </View>
        ),
      },
      {
        id: 9,
        left: 'Credentials',
        right: <Text>Satisfactory work completion certificates from the major customers during the last 3 financial years as on bid calling date to be submitted.	</Text>,
      },
      {
        id: 10,
        left: 'Clean Track Record ',
        right: (
          <View>
            <Text>
              The bidder should submit/give declaration stating that they are not debarred/blacklisted by any State Government, Central Government, Central & State Govt. Undertakings/enterprises/Organizations and by any other Quasi Government bodies/Organizations in India for non-satisfactory performance, corrupt & Fraudulent or any other unethical business practices in Form P5.
            </Text>
            <Text style={margin([10, 0, 0, 0])}>

              If the bidder is debarred/ blacklisted as mentioned above, such bidder becomes ineligible to participate in the bidding process. In case of any concealing of information relating to blacklisting or pending of cases as mentioned above or submission of fake information/fake documents, APTS reserves the right to cancel the work order/contract allotted, apart from forfeiting EMD/PBG. APTS reserves the right further to take penal action on the bidder.
            </Text>
          </View>
        ),
      },
      {
        id: 11,
        left: 'Restrictions imposed under GFR Rule 144xi',
        right: (
          <View>
            <Text>
              Bidder from a country which shares a land border with India will be eligible to bid in this tender only if the bidder is registered with the Competent Authority as per G.O. Ms. No. 9, Dt. 25-02-2021 issued by Industries & Commerce Department, GoAP.
            </Text>
            <Text style={margin([10, 0, 0, 0])}>DPIIT registration certificate copy to be submitted.</Text>
            <Text style={margin([10, 0, 0, 0])}>
              <Link href="#">(Bidder shall have to submit the Undertaking as per Form P6)</Link>

            </Text>
          </View>
        ),
      },
    ],
  };
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottom: '1px solid black',
    },
    borderRight: {
      borderRight: '1px solid black',

    },
    description: {
      width: '50%',
      height: '100%',
    },
    xyz: {
      width: '45%',
      // border: '1px solid black',
    },
    tableContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      border: '1px solid black',
    },
  });
  const rows = data.items.map((item) => (
    <View style={styles.row} key={item.id}>
      <View style={[fontSize(10), padding([5]), styles.borderRight, { width: '5%', height: '100%' }]}><Text>{item.id}</Text></View>
      <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]}>
        <Text>{item.left}</Text>
      </View>
      <View style={[fontSize(10), padding([5]), styles.xyz]}>{item.right}</View>
    </View>
  ));
  return <View style={styles.tableContainer}>{rows}</View>;
}

export default EligibilityCriteriaTable;
