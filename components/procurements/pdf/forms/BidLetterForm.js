import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function BidLetterForm() {
  const {
    margin, padding, fontSize, weight, fontFamily, pointsCss,
  } = CommonStyles;
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section I – Bid Forms</Text>
      </View>
      <View style={[padding([5, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>Bid Letter Form</Text>
      </View>
      <View>
        <Text style={[fontSize(10), margin([20, 0, 0, 0])]}>Form:</Text>
        <Text style={[fontSize(10), margin([0, 0, 20, 0])]}>(Registered name and address of the bidder.)</Text>
        <Text style={[fontSize(10)]}>To:</Text>
        <Text style={[fontSize(10)]}>Andhra Pradesh Technology Services Ltd,</Text>
        <Text style={[fontSize(10)]}>3rd Floor, R&B Building, MG Road, Labbipet,</Text>
        <Text style={[fontSize(10)]}>Vijayawada-520010, Andhra Pradesh, India</Text>

        <Text style={[fontSize(10), margin([20, 0, 0, 0])]}>Sir,</Text>
        <Text style={[fontSize(10), margin([10, 0])]}>Having examined the bidding documents and amendments there on, we the  undersigned, offer to provide services/execute the works including supply, delivery installation of hardware, firm wares and softwares as the case may be, in conformity with the terms and conditions of the bidding document and amendments there on, for the following project in response to your tender Ref. no   _________call dated  .......................</Text>
      </View>
      <Text style={[fontSize(10), margin([10, 0])]}>Project title: </Text>
      <Text style={[fontSize(10), margin([10, 0])]}>We undertake to provide services/execute the above project or its part assigned to us in conformity with the said bidding documents in accordance with the schedule of prices attached herewith/submitted through online bid and coverage options made by APTS or its user organization.</Text>
      <Text style={[fontSize(10), margin([10, 0, 0, 0])]}>If our bid is accepted, we undertake to;</Text>
      <View style={fontSize(10)}>
        <View style={[pointsCss]}>
          <Text style={[{ marginRight: '10px' }]}>
            1.
          </Text>
          <Text>
            Provide services/execute the work according to the time schedule specified in the bid document,
          </Text>
        </View>
        <View style={[pointsCss]}>
          <Text style={[{ marginRight: '10px' }]}>
            2.
          </Text>
          <Text>
            Obtain the performance guarantee of a bank in accordance with bid requirements for the due performance of the contract, and
          </Text>
        </View>
        <View style={[pointsCss]}>
          <Text style={[{ marginRight: '10px' }]}>
            3.
          </Text>
          <Text>
            Agree to abide by the bid conditions, including pre-bid meeting minutes if any, which remain binding upon us during the entire bid validity period and bid may be accepted any time before the expiration of that period.
          </Text>
        </View>
      </View>
      <Text style={[fontSize(10), margin([10, 0])]}>
        We understand that you are not bound to accept the lowest or any bid you may receive, nor to give any reason for the rejection of any bid and that you will not defray any expenses incurred by us in bidding.
      </Text>
      <View style={[fontSize(10), margin([20]), { display: 'flex', flexDirection: 'row' }]}>
        <View style={{ width: '60%' }}>
          <Text>Place:</Text>
          <Text>Date:</Text>
        </View>
        <View>
          <Text>Bidder’s signature and seal.</Text>
        </View>
      </View>
    </View>
  );
}

export default BidLetterForm;
