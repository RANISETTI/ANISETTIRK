import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, Link, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';
import { getSelectedTermsAndConditions } from '../../../../services/dashboard/custom-product/pdf';

function TAndC({ uid, accessToken }) {
  const {
    margin, padding, fontSize, weight, fontFamily, flexRow, pointsCss,
  } = CommonStyles;
  const [tAndCData, setTAndCData] = useState([]);

  useEffect(async () => {
    const { data, errors } = await getSelectedTermsAndConditions(accessToken, uid);
    if (errors) {
      console.log(errors);
    } else {
      setTAndCData(data);
    }
  }, []);
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section G – Special Conditions of Proposed Contract (SCC) </Text>
      </View>
      <View>
        {
          tAndCData.map((mapItem) => (
            <View style={[margin([15, 0])]}>
              <View style={[padding([5, 0, 5, 0])]}>
                <Text style={[fontSize(14), { color: 'blue' }]}>{mapItem.terms_and_condition.name}</Text>
              </View>
              <View style={pointsCss}>
                <View>
                  <Text style={[fontSize(12)]}>
                    {mapItem.terms_and_condition.description}
                  </Text>
                </View>
              </View>
            </View>
          ))
        }
      </View>
    </View>
  );
}

export default TAndC;
