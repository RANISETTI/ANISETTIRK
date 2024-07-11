import React from 'react';
import {
  Text, View, StyleSheet, Link,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function SectionATable() {
  const {
    margin, padding, fontSize, weight, fontFamily,
  } = CommonStyles;
  const data = {
    id: '5df3180a09ea16dc4b95f910',
    items: [
      {
        id: 1,
        left: 'Tender Reference No',
        right: <Text />,
      },
      {
        id: 2,
        left: 'Tender Title',
        right: <Text />,
      },
      {
        id: 3,
        left: 'APTS contact person',
        right: (
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text>Sri_____________,</Text>
            <Text>Mobile_____________,</Text>
            <Text>Email_____________,</Text>
          </View>
        ),
      },
      {
        id: 4,
        left: 'Eligibility Criteria ',
        right: <Text>As per Section B </Text>,
      },
      {
        id: 5,
        left: 'No. of Schedules',
        right: <Text />,
      },
      {
        id: 6,
        left: 'Schedule wise Items and Quantity Details',
        right: <Text />,
      },
      {
        id: 7,
        left: 'Technical Specifications',
        right: <Text>Detailed technical specifications are mentioned in Section D</Text>,
      },
      {
        id: 8,
        left: 'Delivery/Installation Period permitted',
        right: <Text>___________ (weeks/days) from the date of issue of Notification of Award.</Text>,
      },
      {
        id: 9,
        left: 'Bid calling date	',
        right: <Text>DD-MM-YYYY	</Text>,
      },
      {
        id: 10,
        left: 'Bid documents downloadable from ',
        right: <Text>DD-MM-YYYY, HH:MM  AM/PM</Text>,
      },
      {
        id: 11,
        left: 'Pre-bid Meeting  date and time',
        right: <Text>DD-MM-YYYY, HH:MM  AM/PM</Text>,
      },
      {
        id: 12,
        left: 'Mode of pre-bid meeting',
        right: <Text>Physical/Online</Text>,
      },
      {
        id: 13,
        left: 'Venue',
        right: <Text>
          Physical: &#60;&#60;address to be provided&#62;&#62;
          Online : Request for online link to be made to email id: ________________ by  DD-MM-YYYY, HH:MM  AM/PM
        </Text>,
      },
      {
        id: 14,
        left: 'Last date and time for submission of pre-bid queries',
        right: <Text>DD-MM-YYYY, HH:MM  AM/PM</Text>,
      },
      {
        id: 15,
        left: 'Last date/time for Sale of document',
        right: <Text>DD-MM-YYYY, HH:MM  AM/PM</Text>,
      },
      {
        id: 16,
        left: 'Bid closing date/time',
        right: <Text>DD-MM-YYYY, HH:MM  AM/PM</Text>,
      },
      {
        id: 17,
        left: 'Reverse Auction ',
        right: <Text>Applicable/Not Applicable</Text>,
      },
      {
        id: 18,
        left: 'Minimum Decrement Value for Reverse Auction',
        right: <Text>Rs. __________</Text>,
      },
      {
        id: 19,
        left: 'Pre-qualification bid opening date & time',
        right: <Text>DD-MM-YYYY, HH:MM  AM/PM</Text>,
      },
      {
        id: 20,
        left: 'Technical bid opening date and time',
        right: <Text>Will be intimated to pre-qualified bidders</Text>,
      },
      {
        id: 21,
        left: 'Commercial bid opening & Reverse Auction date and time',
        right: <Text>Will be intimated to technically qualified bidders.</Text>,
      },
      {
        id: 22,
        left: 'Evaluation Method',
        right: <Text>Schedule wise/Item wise including/excluding taxes</Text>,
      },
      {
        id: 23,
        left: 'Selection criteria',
        right: <Text>Lowest quoted bid/QCB/QCBS</Text>,
      },
      {
        id: 24,
        left: 'Bid document can be downloaded from:',
        right: (
          <View>
            <Text>
              1.
              <Link href="https://apts.gov.in/tenders.aspx">https://apts.gov.in/tenders.aspx</Link>
              {' '}
            </Text>
            <Text>
              2.
              <Link href="https://tender.apeprocurement.gov.in/login.html# ">https://tender.apeprocurement.gov.in/login.html# </Link>
              {' '}
            </Text>
          </View>
        ),
      },
      {
        id: 25,
        left: 'Bid Document Fee',
        right: (
          <View>
            <Text>
              Rs.10,000/-  &#60;if proc value &#60;=10 Cr.&#62;
            </Text>
            <Text>
              Rs. 25,000/-&#60;if proc value &#62;10 Cr.&#62;
            </Text>
            <Text>
              to be paid through online transfer/DD
            </Text>
          </View>),
      },
      {
        id: 26,
        left: 'Bank Account Details for online transfer',
        right: (
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text>1. Bank A/c. No.: 52082155102</Text>
            <Text>2. IFSC Code: SBIN0003055</Text>
            <Text>3. Bank Name: State Bank of India, Labbipet, Vijayawada</Text>
            <Text>4. MICR Code: 520002007</Text>
          </View>),
      },
      {
        id: 27,
        left: 'Mode of bid submission',
        right: <Text>Online/Manual</Text>,
      },
      {
        id: 28,
        left: 'Sample Items of offered devices',
        right: <Text>To be submitted/Not Applicable</Text>,
      },
      {
        id: 29,
        left: 'Address for submission of bids',
        right: (
          <View>
            <Text>
              Online:
              {' '}
              <Link href="https://tender.apeprocurement.gov.in/login.html# ">httphttps://tender.apeprocurement.gov.in/login.html# </Link>

            </Text>

            <Text>
              Manual:
              &#60;&#60;Address to be provided &#62;&#62;

            </Text>
          </View>),
      },
      {
        id: 30,
        left: 'Earnest Money Deposit (EMD)',
        right: <Text>Rs.___________________ (2% of ECV)</Text>,
      },
      {
        id: 31,
        left: 'Acceptable EMD Payment Modes',
        right: <Text>Challan/BG/Online Payment</Text>,
      },
      {
        id: 32,
        left: 'EMD validity period',
        right: <Text>_____ days from the bid calling date. (Bid validity period + 45 days)</Text>,
      },
      {
        id: 33,
        left: 'Bid validity period',
        right: <Text>_____ days from the bid calling date. (90 to 180 days)</Text>,
      },
      {
        id: 34,
        left: 'Acceptable Banks for EMD BG/PBGs',
        right: <Text>Any Scheduled / Nationalized bank with atleast one branch in Vijayawada</Text>,
      },
      {
        id: 35,
        left: 'EMD BG in favor of ',
        right: <Text>The Managing Director, A.P. Technology Services Limited, Vijayawada</Text>,
      },
      {
        id: 36,
        left: 'Contract period',
        right: (
          <View>
            <Text>______ years from the date of signing of agreement</Text>
            <Text>(for procurement of items , contract period is up to end of warranty period – to be discussed)</Text>
          </View>
        ),
      },
      {
        id: 37,
        left: 'Contract signing authority',
        right: <Text>MD, APTS/Hod of User Department</Text>,
      },
      {
        id: 38,
        left: 'Variation in quantities',
        right: <Text>+/- 25%</Text>,
      },
      {
        id: 39,
        left: 'Period for furnishing performance security',
        right: <Text>Within 7/10 days from date of receipt of Notification of Award for the respective schedules.</Text>,
      },
      {
        id: 40,
        left: 'Performance Security Value',
        right: (
          <View>
            <Text>3% /10% of Contract Value</Text>
            <Text>(i)Total Items cost is considered as contract value during the warranty period.</Text>
            <Text>(ii) Total per year AMC value is considered as contract value during the AMC Period for submission of PBG.</Text>
          </View>
        ),
      },
      {
        id: 41,
        left: 'Performance security validity period',
        right: <Text>60 days beyond end of Warranty/AMC period.</Text>,
      },
      {
        id: 42,
        left: 'PBG in favor of ',
        right: <Text>The Contract signing authority </Text>,
      },
      {
        id: 43,
        left: 'Payment, LD, SLA & Other Terms',
        right: <Text>Please refer Section J</Text>,
      },
      {
        id: 44,
        left: 'Conditional bids',
        right: <Text>Not acceptable and liable for rejection.</Text>,
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
      <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]}><Text>{item.left}</Text></View>
      <View style={[fontSize(10), padding([5]), styles.xyz]}>{item.right}</View>
    </View>
  ));
  return <View style={styles.tableContainer}>{rows}</View>;
}

export default SectionATable;
