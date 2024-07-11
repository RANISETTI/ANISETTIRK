import React from 'react';
import {
  Text, View, StyleSheet, Link, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

export const TableStyles = StyleSheet.create({
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
    width: '50%',
    // border: '1px solid black',
  },
  tableContainer: {
    border: '1px solid black',
  },
});
function ProductsTable({ data }) {
  const {
    margin, padding, fontSize, weight, fontFamily,
  } = CommonStyles;
  Font.register({ family: 'Times-Roman', fontStyle: 'normal', fontWeight: 'bold' });

  const rows = data.map((item, index) => (
    <View style={TableStyles.row} key={item.id}>
      <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.description]}><Text>{item.name}</Text></View>
      <View style={[fontSize(10), padding([5]), TableStyles.xyz]}>
        <Text>
          <td className="p-2">
            {item.options.map((optionItem) => `${optionItem}, `)}
          </td>
        </Text>

      </View>
    </View>
  ));
  return (
    <View style={TableStyles.tableContainer}>
      <View style={TableStyles.row}>
        <View style={[fontSize(12), padding([5]), TableStyles.borderRight, TableStyles.description]}><Text>Feature</Text></View>
        <View style={[fontSize(10), padding([5]), TableStyles.xyz]}><Text>Required Specification</Text></View>
      </View>
      {rows}
    </View>
  );
}

export default ProductsTable;
