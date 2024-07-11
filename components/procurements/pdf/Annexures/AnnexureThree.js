import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function AnnexureThree() {
  const {
    margin, padding, fontSize, weight, fontFamily, pointsCss,
  } = CommonStyles;
  return (
    <View>
      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Annexure III – Performance Security BG Form</Text>
      </View>
      <View style={fontSize(12)}>
        <Text style={[margin([20, 0, 5, 0])]}>APTS  Ref. No.....</Text>
        <Text style={[margin([15, 0, 5, 0]), { textAlign: 'center' }]}>Performance Security Form</Text>
        <Text style={[margin([0, 0, 15, 0])]}>(To be issued by a bank scheduled in India and having at least one branch in Vijayawada) </Text>
        <Text style={[margin([0, 0, 5, 0])]}>To: ............................ (Address of APTS)	</Text>
        <Text style={[margin([20, 0, 5, 0])]}>WHEREAS............................. (Name of Vendor) hereinafter called “the Vendor” has undertaken, in pursuance of  Contract No......... Dated ... (Date), to supply.................. called “the Contract”.</Text>
        <Text style={[margin([20, 0, 5, 0])]}>AND WHEREAS it has been stipulated by you in the said Contract that the Vendor shall furnish you with a Bank Guarantee by a recognized bank for the sum specified therein as security for compliance with the Supplier’s performance obligations in accordance with the Contract.</Text>
        <Text style={[margin([20, 0, 5, 0])]}>WHEREAS we have agreed to give the Vendor a Guarantee:</Text>
        <Text style={[margin([20, 0, 5, 0])]}>THEREFORE WE hereby affirm that we are Guarantors and responsible to you, on behalf of the Vendor, up to a total of Rs. ..................... and we undertake to pay you, upon your first written demand declaring the Vendor to be in default under the Contract and without cavil or argument,  any sum or sums within the limit of Rs.............. .  (Amount of Guarantee) as aforesaid, without your needing to prove or to show grounds or reasons for your demand or the sum specified therein.</Text>
        <Text style={[margin([20, 0, 5, 0])]}>This guarantee is valid until the ......... day of........ (Date)</Text>
      </View>
      <View style={[margin([20]), { display: 'flex', flexDirection: 'row' }]}>
        <View style={{ width: '60%' }}>
          <Text style={[fontSize(12)]}>Place:</Text>
          <Text style={[fontSize(12)]}>Date:</Text>
        </View>
        <View>
          <Text style={[fontSize(12)]}>Signature and seal of guarantors</Text>
        </View>
      </View>
    </View>
  );
}

export default AnnexureThree;
