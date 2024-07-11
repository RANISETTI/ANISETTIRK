import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';
import SectionATable from './SectionATable';

function SectionA() {
  const {
    margin, padding, fontSize, weight, fontFamily,
  } = CommonStyles;
  const introduction = [
    {
      id: 'intro-1',
      description: 'This tender call is issued on e-procurement market place at www.apeprocurement.gov.in. All the terms and conditions are to be read jointly as mentioned in the e-procurement market website and in this document.',
    },
    {
      id: 'intro-2',
      description: 'APTS invites responses (“Tenders”) to this Request for Proposals (“RFP”) from OEMs Agencies/authorized Partners (“Bidders”) for the provision of Hardware as described in Section D of this RFP, “Scope of Work” (“Hardware supply”). APTS is the Purchaser for this Government procurement competition (“the Purchaser”)',
    },
    {
      id: 'intro-3',
      description: 'Any contract that may result from this RFP Process will be issued for a term of <insert relevant period> (“the Term”) which would include the hardware supply, warranty and maintenance support.',
    },
    {
      id: 'intro-4',
      description: 'The Purchaser reserves the right to extend the warranty and maintenance support term for a period or periods of up to <insert relevant period> with a maximum of <insert relevant period> such extension or extensions on the same terms and conditions, subject to the <Purchaser’s> obligations at law.',
    },
    {
      id: 'intro-5',
      description: 'Proposals must be received not later than time, date and venue mentioned in the Bid Data Sheet. Proposals that are received after the deadline WILL NOT be considered in this procurement process.',
    },
  ];
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section A – Schedule of Requirements</Text>
      </View>
      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>A.1. Introduction</Text>
      </View>
      <View>
        {
          introduction.map((mapItem, index) => (
            <View style={[{ display: 'flex', flexDirection: 'row' }, margin([10, 0])]}>
              <Text style={[fontSize(12), { marginRight: '10px' }]}>
                {index + 1}
              </Text>
              <Text style={[fontSize(12)]}>
                {mapItem.description}
              </Text>
            </View>
          ))
        }
      </View>
      <View>
        <View style={[padding([5, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>A.2. Project Description</Text>
        </View>
        <Text style={[{ color: 'red' }, fontSize(12)]}>[The “Project Description” should give project details around the need for the Hardware. However this may be minimal / brief as it has very low impact on the supply and maintenance of Hardware]</Text>
      </View>
      <View>
        <View style={[padding([20, 0, 5, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>A.3. Bid Data Sheet:</Text>
        </View>
        <SectionATable />
      </View>
    </View>

  );
}

export default SectionA;
