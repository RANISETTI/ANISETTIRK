import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';
import EligibilityCriteriaTable from './EligibilityCriteriaTable';

function SectionB() {
  const {
    margin, padding, fontSize, weight, fontFamily, flex,
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
  });

  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section B – Pre-qualification Criteria</Text>
      </View>
      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>B.1. Eligibility Criteria </Text>
      </View>
      <View>
        <EligibilityCriteriaTable />
        <View style={[CommonStyles.itemsCenter]}>
          <Text style={[fontSize(13)]}>Note: Relevant documents in support of above eligibility criteria should be furnished.</Text>
        </View>
      </View>
      <View break>
        <View style={[padding([5, 0, 5, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>B.2. Consortium Terms & Conditions  </Text>
        </View>
        <Text style={[fontSize(12)]}>
          The following are terms and conditions are applicable only if consortium of bidders is allowed to submit bid in Clause B.1..
        </Text>
        <View>
          <View style={flex('column'), margin([15, 0, 0, 25])}>
            <View style={[flex('row'), margin([2, 0])]}>
              <Text style={[fontSize(12)]}>1.</Text>
              <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>Consortium of Bidders is allowed with maximum of &#60;&#60;two/three&#62;&#62; partners.</Text>
            </View>
            <View style={[flex('row'), margin([2, 0])]}>
              <Text style={[fontSize(12)]}>2.</Text>
              <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>One of the partners shall be designated as Prime Bidder.</Text>
            </View>
            <View style={[flex('row'), margin([2, 0])]}>
              <Text style={[fontSize(12)]}>3.</Text>
              <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>No partner of Consortium should Bid individually or be a Partner of another Consortium. In case, any consortiums have a common partner then such consortiums will stand disqualified and under no circumstances their bids will be entertained.</Text>
            </View>
            <View style={[flex('row'), margin([2, 0])]}>
              <Text style={[fontSize(12)]}>4.</Text>
              <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>
                Applicant consortia shall have a valid Memorandum of Understanding (MoU)/ Agreement (duly registered) among all the members signed by the Authorized Signatories of the companies dated prior to the submission of the bid. The MoU/ consortium agreement shall clearly state the composition of the consortium who shall be the prime bidder, the complete description of the partner and roles and responsibilities of the partners. The MoU/agreement shall be exclusively for this project and shall be responsible in case of failure by any partner.
              </Text>
            </View>
            <View style={[flex('row'), margin([2, 0])]}>
              <Text style={[fontSize(12)]}>5.</Text>
              <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>
                The Consortium Agreement in original shall be submitted.
              </Text>
            </View>
            <View style={[flex('row'), margin([2, 0])]}>
              <Text style={[fontSize(12)]}>6.</Text>
              <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>
                6.	Members of the Consortium shall be jointly and severally liable to the Purchaser for the execution of the project in accordance with the terms of the bid document and a statement of this effect shall be included in the Memorandum of Understanding/ consortium Agreement..
              </Text>
            </View>
            <View style={[flex('row'), margin([2, 0])]}>
              <Text style={[fontSize(12)]}>7.</Text>
              <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>
                7.	In case of Consortium all the payments will be made to the Prime Bidder only.
              </Text>
            </View>
            <View style={[flex('row'), margin([2, 0])]}>
              <Text style={[fontSize(12)]}>8.</Text>
              <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>
                8.	Prime bidder is responsible for delivering for all contractual obligations such as delivery, support services meeting SLA for repair and maintenance etc.
              </Text>
            </View>
            <View style={[flex('row'), margin([2, 0])]}>
              <Text style={[fontSize(12)]}>9.</Text>
              <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>
                9.	The bidder (Each member of the Consortium) shall have company registration certificate, registration under labour laws & contract act, valid GST registration certificate and Permanent Account Number (PAN) issued by income Tax department. (Copy of each registration should be provided).
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SectionB;
