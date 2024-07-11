import React, { useEffect, useState } from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';
import { TableStyles } from '../sectionD/ProductsTable';
import { getQuotationCartItemsService } from '../../../../services/dashboard/custom-product/pdf';

function AnnexuresFive({ uid, accessToken }) {
  const {
    margin, padding, fontSize, weight, fontFamily, pointsCss,
  } = CommonStyles;
  const [itemsData, setItemsData] = useState([]);
  useEffect(async () => {
    const { data, errors } = await getQuotationCartItemsService(accessToken, uid);
    if (errors) {
      console.log(errors);
    } else {
      setItemsData(data.results);
    }
  }, []);
  const rows = (mapItem) => mapItem && mapItem.map((item, index) => (
    <View style={TableStyles.row} key={item.id}>
      <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '5%' }]}><Text>{index + 1}</Text></View>
      <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.description]}><Text>{item.attribute.name}</Text></View>
      <View style={[fontSize(10), padding([5]), TableStyles.xyz]}><Text /></View>
    </View>
  ));

  return (
    <View>
      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Annexure V – Model Installation cum AT Report</Text>
      </View>
      <View style={fontSize(12)}>
        <Text style={[margin([15, 0, 5, 0]), { textAlign: 'center' }]}>(On Company Letterhead with other statutory details)</Text>

        <View style={[margin([20]), { display: 'flex', flexDirection: 'row' }]}>
          <View style={{ width: '60%' }}>
            <Text style={[fontSize(12)]}>IR No</Text>
          </View>
          <View>
            <Text style={[fontSize(12)]}>IR date</Text>
          </View>
        </View>
        <Text style={[fontSize(12)]}>Office Name & Location:</Text>
        <View>

          {
          itemsData.map((mapItem, index) => (
            <View style={[margin([15, 0, 5, 0])]}>
              <View style={[margin([20, 0]), { display: 'flex', flexDirection: 'row' }]}>
                <View style={{ width: '33%' }}>
                  <Text style={[fontSize(13), margin([0, 0, 8, 0])]}>
                    {index + 1}
                    {' '}
                    {mapItem.category.name}
                  </Text>
                </View>
                <View style={{ width: '33%' }}>
                  <Text style={[fontSize(12)]}>Qty: 	</Text>
                </View>
                <View style={{ width: '33%' }}>
                  <Text style={[fontSize(12)]}>S.NO.  	</Text>
                </View>
              </View>
              <View style={[margin([0, 0, 0, 15])]}>
                <View style={TableStyles.tableContainer}>
                  <View style={TableStyles.row}>
                    <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '5%', height: '100%' }]}><Text>SN</Text></View>
                    <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.description]}><Text>Complete specifications  as per RFP/Tender Document are to be mentioned such as </Text></View>
                    <View style={[fontSize(10), padding([5]), TableStyles.xyz]}><Text>Functionality</Text></View>
                  </View>
                  {rows(mapItem.attributes)}
                  <View style={TableStyles.row}>
                    <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '5%', height: '100%' }]}><Text>{mapItem.attributes && mapItem.attributes.length + 1}</Text></View>
                    <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.description]}><Text>Installation observations</Text></View>
                    <View style={[fontSize(10), padding([5]), TableStyles.xyz]}><Text>Working satisfactorily or observations found if any</Text></View>
                  </View>
                </View>
              </View>
            </View>
          ))
        }

        </View>
      </View>
      <View>

        <Text style={[fontSize(12), margin([20])]}>  General Remarks:  </Text>
        <View style={[margin([20]), { display: 'flex', flexDirection: 'row' }]}>
          <View style={{ width: '60%' }}>
            <Text style={[fontSize(12)]}>Signature of Installation Engineer</Text>
            <Text style={[fontSize(12)]}>Name</Text>
            <Text style={[fontSize(12)]}>Contact No.</Text>
          </View>
          <View>
            <Text style={[fontSize(12)]}>Signature of Dept. Official </Text>
            <Text style={[fontSize(12)]}>with Name, Contact No., Seal & Date </Text>
          </View>
        </View>

      </View>

    </View>
  );
}

export default AnnexuresFive;
