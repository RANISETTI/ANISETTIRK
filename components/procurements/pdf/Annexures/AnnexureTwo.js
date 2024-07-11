import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function AnnexureTwo() {
  const {
    margin, padding, fontSize, weight, fontFamily, pointsCss,
  } = CommonStyles;
  return (
    <View>
      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Annexure II – Bid Security (EMD) BG Form</Text>
      </View>
      <View style={fontSize(12)}>
        <Text style={[margin([20, 0, 5, 0])]}>APTS  Ref. No.....</Text>
        <Text style={[margin([0, 0, 20, 0]), { textAlign: 'center' }]}>Bid Security (EMD) Form</Text>
        <Text style={[margin([10, 0])]}>(To be issued by a bank scheduled in India and having at least one branch in Vijayawada)</Text>
        <Text style={[margin([10, 0])]}>Whereas...................................... (Here in after called “the Bidder”) has submitted its bid Dated ……........ (Date)  for the execution of........................ (Here in after called “the Bid”) </Text>
        <Text style={[margin([10, 0])]}>KNOW ALL MEN by these presents that We ...................  of ........................ having our registered office at........................ (hereinafter called the “Bank”)  are bound into the Andhra Pradesh Technology Service Ltd. (hereinafter called “The APTS”) in the sum of  ................ for which payment well and truly to be made to the said APTS itself, its successors  and assignees by these presents.</Text>
        <Text style={[margin([10, 0])]}>The conditions of this obligation are:</Text>
        <View style={[margin([20, 20])]}>
          <View style={[pointsCss]}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              If the bidder withdraws its bid during the period of bid validity  or
            </Text>
          </View>
          <View style={[pointsCss]}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <View>
              <Text style={[fontSize(12)]}>
                If the bidder, having been notified of the acceptance of its bid by the APTS during the period of bid validity:
              </Text>
              <View>
                <View style={[pointsCss]}>
                  <Text style={[fontSize(12), { marginRight: '10px' }]}>
                    a.
                  </Text>
                  <Text style={[fontSize(12)]}>
                    fails or refuses to execute the contract form if required; or
                  </Text>
                </View>
                <View style={[pointsCss]}>
                  <Text style={[fontSize(12), { marginRight: '10px' }]}>
                    b.
                  </Text>
                  <Text style={[fontSize(12)]}>
                    fails or refuses to furnish the performance security, in accordance with the bid requirement;
                  </Text>
                </View>
                <View style={[pointsCss]}>
                  <Text style={[fontSize(12), { marginRight: '10px' }]}>
                    c.
                  </Text>
                  <Text style={[fontSize(12)]}>
                    Submits fake documents.
                  </Text>
                </View>

              </View>
            </View>
          </View>
        </View>
      </View>

      <Text style={[fontSize(12), margin([0, 15])]}>
        We undertake to pay the APTS up to the above amount upon receipt of its first written demand, without the APTS having to substantiate its demand, provided that in its demand the APTS will note that the amount claimed by it is due to it, owing to the occurrence of one or both of the two conditions, specifying the occurred condition or conditions.
      </Text>

      <Text style={[fontSize(12), margin([0, 15])]}>
        This guarantee will remain in force up to and including 45 days after the period of the bid validity, and any demand in respect thereof should reach the Bank not later than the above date.
      </Text>
      <View style={[margin([20]), { display: 'flex', flexDirection: 'row' }]}>
        <View style={{ width: '60%' }}>
          <Text style={[fontSize(12)]}>Place:</Text>
          <Text style={[fontSize(12)]}>Date:</Text>
        </View>
        <View>
          <Text style={[fontSize(12)]}>Signature of the Bank</Text>
          <Text style={[fontSize(12)]}>and seal. </Text>
        </View>
      </View>
    </View>
  );
}

export default AnnexureTwo;
