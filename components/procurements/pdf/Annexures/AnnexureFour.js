import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function AnnexureFour() {
  const {
    margin, padding, fontSize, weight, fontFamily, pointsCss,
  } = CommonStyles;
  return (
    <View>
      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Annexure IV – Manufacturer’s Authorization Form</Text>
      </View>
      <View style={fontSize(12)}>
        <Text style={[margin([20, 0, 5, 0])]}>APTS Tender ref.no.</Text>
        <Text style={[margin([15, 0, 5, 0]), { textAlign: 'center' }]}>Manufacturer Authorization</Text>
        <Text style={[margin([20, 0, 5, 0])]}>The authorization should be in the nature of a letter, memorandum or certificate regularly granted by the manufacturer to its channel partners, authorized solution providers, system integrators, distributors, etc. or a specific letter issued for purposes of this bid. Such communication should include statements / undertakings from the said manufacturer to the following effect:</Text>
      </View>
      <View style={[margin([20, 20])]}>
        <View style={[pointsCss]}>
          <Text style={[fontSize(12), { marginRight: '10px' }]}>
            1.
          </Text>
          <Text style={[fontSize(12)]}>
            Guarantee and warranty coverage in respect of the goods and services manufactured by the said manufacturer shall be honored by that manufacturer, their channel partners, distributors, authorized service centers as the case may be.
          </Text>
        </View>
        <View style={[pointsCss]}>
          <Text style={[fontSize(12), { marginRight: '10px' }]}>
            2.
          </Text>
          <Text style={[fontSize(12)]}>
            The manufacturer updates the bidder and their technical personnel with relevant technical literature, training and skill transfer workshops etc. on a regular basis.
          </Text>
        </View>
        <View style={[pointsCss]}>
          <Text style={[fontSize(12), { marginRight: '10px' }]}>
            3.
          </Text>
          <Text style={[fontSize(12)]}>
            The manufacturer provides back to back technical support to the said bidder on a continuing basis.
            {' '}

          </Text>
        </View>
        <View style={[pointsCss]}>
          <Text style={[fontSize(12), { marginRight: '10px' }]}>
            4.
          </Text>
          <Text style={[fontSize(12)]}>
            The said bidder is authorized to provide service and solutions using  hardware, firmware and  software as the case may be.
          </Text>
        </View>
      </View>
      <Text style={[fontSize(12)]}>Note:</Text>
      <Text style={[fontSize(12)]}>The letter of authority should be signed by a person competent and having the power of attorney to bind the manufacturer.</Text>
    </View>
  );
}

export default AnnexureFour;
