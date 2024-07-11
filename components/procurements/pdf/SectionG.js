import React from 'react';
import {
  Text, View, StyleSheet, Link, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from './FirstPage';

function SectionG() {
  const {
    margin, padding, fontSize, weight, fontFamily, flexRow, pointsCss,
  } = CommonStyles;
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

  const data = [
    {
      id: 1,
      left: 'Payment terms',
      right: 'By Purchase order issuing authority',
    },
    {
      id: 1,
      left: 'Upon submission of Delivery Challan &  Installation cum Acceptance Test Report',
      right: '90% of items cost as per Contract / PO for which DCs & IR cum AT reports submitted.',
    },
    {
      id: 1,
      left: 'Satisfactory Performance Certificate (SPC) from the competent authority of the Department after 30 days ',
      right: 'Remaining 10% of  items cost as per Contract / PO for which DCs, IR cum AT reports & SPCs submitted.',
    },
    {
      id: 1,
      left: 'Incase site not ready, for more than 30 days from the date of delivery',
      right: '75% of the Contract / PO value for that site / location.',
    },
    {
      id: 1,
      left: 'Billing/Invoice',
      right: 'Billing/Invoice should be done from any of the offices located in AP only. Invoice shall be submitted along with GST return copy (GSTR1). Invoices that are not in compliance with above conditions will not be processed.',
    },
  ];
  const GSectionData = [
    {
      id: 'G2',
      heading: 'G.2. LD for late deliveries/installations:',
      description: '1% of the late delivered or deemed late delivered/installed goods for One week or part thereof, 1.5% for Two weeks or part thereof, 2% for Three weeks or part thereof, 2.5% for 4 weeks or part thereof and so on.',
    },
    {
      id: 'G3',
      heading: 'G.3. Maximum LD for late deliveries/ installation:',
      description: (
        <View>
          <Text style={fontSize(12)}>
            Maximum LD for late deliveries/installations: 10% on the Total value of goods for that location/site for late delivery/installation or deemed late delivered/installed goods.
          </Text>
          <Text style={fontSize(12)}>
            However, Purchaser reserves the right further to take penal action on the bidder. The bidder will be disqualified, blacklisted, action will be initiated as deemed fit and the Bid Security will be forfeited.
          </Text>
        </View>
      ),
    },
    {
      id: 'G4',
      heading: 'G.4. Service Level Requirements',
      description: (
        <View>
          <Text style={[fontSize(12), margin([10, 0])]}>
            For the offices at DHQ level:
          </Text>
          <Text style={fontSize(12)}>
            The bidder should resolve the breakdown calls within 36 Hours of call reporting. Failing which penalty is applicable as per terms & conditions.
          </Text>
          <Text style={[fontSize(12), margin([10, 0])]}>
            For the offices at Mandal/Village level:
          </Text>
          <Text style={fontSize(12)}>
            The bidder should resolve the breakdown calls within 48 Hours of call reporting. Failing which penalty is applicable as per terms &conditions.
          </Text>
          <Text style={[fontSize(12), margin([10, 0])]}>
            The service provider shall maintain sufficient buffer stock of devices/spares at the district head quarters for this purpose.
          </Text>
        </View>
      ),
    },
    {
      id: 'G5',
      heading: 'G.5. Penalty for failure to maintain during warranty period for all items:',
      description: (
        <View>
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              <View style={[fontSize(12), padding([5]), styles.borderRight, styles.description]}><Text>Item</Text></View>
              <View style={[fontSize(12), padding([5]), styles.xyz]}><Text>Penalty applicable for the downtime as below.</Text></View>
            </View>
            <View style={styles.row}>
              <View style={[fontSize(12), padding([5]), styles.borderRight, styles.description]}><Text>All Items</Text></View>
              <View style={[fontSize(12), padding([5]), styles.xyz]}><Text>For any delay beyond permissible down time, a penalty of Rs.100/- will be levied for each day or part there of subject to a maximum of total equipment cost.</Text></View>
            </View>
          </View>

          <Text style={[fontSize(12), margin([10, 0])]}>
            The penalty amount will be deducted from the amount payable to the bidder by Purchaser. Once this amount is exhausted, penalty amount will be recovered from the Performance Security. Once the Performance Security also exhausted, the bidder will be required to recoup the Performance Security. If the bidder fails to recoup the Performance Security, the bidder will be debarred from participating in tenders till the time the bidder recoups the Performance Security.
          </Text>
          <Text style={[fontSize(12), margin([10, 0])]}>
            The penalty for crossing service level agreement will be limited to 10%. However, Purchaser reserves the right further to take penal action on the bidder. The bidder will be disqualified, blacklisted, action will be initiated as deemed fit and the Bid Security will be forfeited.
          </Text>
        </View>
      ),
    },
  ];

  const dataMapped = GSectionData.map((mapItem) => (
    <View id={mapItem.id} style={[margin([15, 0, 0, 0])]}>
      <View style={[margin([5, 0, 10, 0])]}>
        <Text style={[fontSize(14), { color: 'blue', marginTop: '4px' }]}>{mapItem.heading}</Text>
      </View>
      {
        mapItem.description && typeof mapItem.description === 'string' ? (
          <Text style={[fontSize(12)]}>
            {mapItem.description}
          </Text>
        ) : (
          mapItem.description
        )
      }

      <View style={[margin([0, 20, 0, 30])]}>
        {
        mapItem.children && mapItem.children.map((childItem, childIndex) => (
          <View key={`${mapItem.id}-${childIndex}`} style={pointsCss}>
            {
            childItem.description && (
              <Text style={[fontSize(12), { marginRight: '10px' }]}>
                {childItem.id ? childItem.id : childIndex + 1}
              </Text>
            )
          }
            <View>
              {
                childItem.description && typeof childItem.description === 'string' ? (
                  <Text style={[fontSize(12)]}>
                    {childItem.description}
                  </Text>

                ) : (
                  childItem.description
                )
              }
            </View>
          </View>
        ))
      }
      </View>
    </View>

  ));
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section G – Special Conditions of Proposed Contract (SCC) </Text>
      </View>
      <View style={[padding([5, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>G.1. Payment Terms and Conditions</Text>
      </View>
      <View>
        <View style={styles.tableContainer}>
          {
          data.map((item) => (
            <View style={styles.row} key={item.id}>
              <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]}><Text>{item.left}</Text></View>
              <View style={[fontSize(10), padding([5]), styles.xyz]}><Text>{item.right}</Text></View>
            </View>
          ))
        }
        </View>
        <Text style={fontSize(12)}>
          Note
        </Text>
        <View>
          <View style={[margin([0, 20, 0, 30])]}>
            <View style={pointsCss}>
              <Text style={[fontSize(12), { marginRight: '10px' }]}>
                1.
              </Text>
              <Text style={[fontSize(12)]}>
                All the Delivery Challans, Installation cum AT  Reports, OEM Quality Certificate to be Counter signed by the respective Competent Authority as designated by the user department.
              </Text>
            </View>
            <View style={pointsCss}>
              <Text style={[fontSize(12), { marginRight: '10px' }]}>
                2.
              </Text>
              <Text style={[fontSize(12)]}>
                The certificate/report should have Name, Designation, Signature, Phone number, Date and Seal of the Officer.
              </Text>
            </View>
            <View style={pointsCss}>
              <Text style={[fontSize(12), { marginRight: '10px' }]}>
                3.
              </Text>
              <Text style={[fontSize(12)]}>
                The DC/IR/SPC will not be processed for payments if the Name, Designation, Signature, Phone number, Date and Seal of the Officer are not available.
              </Text>
            </View>
            <View style={pointsCss}>
              <Text style={[fontSize(12), { marginRight: '10px' }]}>
                4.
              </Text>
              <Text style={[fontSize(12)]}>
                Purchaser reserves right to conduct random Acceptance Test  on items delivered if required.
              </Text>
            </View>
          </View>
        </View>
      </View>
      {dataMapped}
    </View>
  );
}

export default SectionG;
