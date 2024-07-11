import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';
import { TableStyles } from '../sectionD/ProductsTable';

function POneForm() {
  const {
    margin, padding, fontSize, weight, fontFamily, pointsCss,
  } = CommonStyles;
  const biddreFormTableColumns = [
    {
      id: 'p-1-bidderInformation-1',
      name: 'Name of the organization	',
    },
    {
      id: 'p-1-bidderInformation-2',
      name: 'Year of establishment	',
    },
    {
      id: 'p-1-bidderInformation-3',
      name: 'Registered Office Address	',
    },
    {
      id: 'p-1-bidderInformation-4',
      name: 'Phone No.		',
    },
    {
      id: 'p-1-bidderInformation-5',
      name: 'Fax No.		',
    },
    {
      id: 'p-1-bidderInformation-6',
      name: 'Email		',
    },
    {
      id: 'p-1-bidderInformation-7',
      name: 'Contact person details with phone no.',
    },
    {
      id: 'p-1-bidderInformation-8',
      name: 'Total No. of branch offices in AP ',
    },
    {
      id: 'p-1-bidderInformation-9',
      name: 'Total Support engineers at -',
    },
    {
      id: 'p-1-bidderInformation-10',
      name: 'At Head office ( No.)		',
    },
    {
      id: 'p-1-bidderInformation-11',
      name: 'At  branch offices (No.)	',
    },
    {
      id: 'p-1-bidderInformation-12',
      name: 'Whether Manufacturer?',
      description: 'If Yes, Provide relevant documents',
    },
    {
      id: 'p-1-bidderInformation-13',
      name: 'Whether authorized dealer/ Service Provider?',
      description: 'If Yes, Provide relevant documents',
    },
    {
      id: 'p-1-bidderInformation-14',
      name: 'Details of EMD furnished',
    },
    {
      id: 'p-1-bidderInformation-15',
      name: 'Details of certificates enclosed.',
    },
    {
      id: 'p-1-bidderInformation-16',
      name: 'Details of Purchasing document.',
      description: 'Provide details like APTS Receipt  No& Date.',
    },
  ];
  return (
    <View>
      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Form P-1 - Bidder Information</Text>
      </View>
      <View style={margin([15])}>
        <View style={TableStyles.tableContainer}>
          {
            biddreFormTableColumns.map((mapItem, index) => (
              <View style={TableStyles.row}>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>{index + 1}</Text></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text>{mapItem.name}</Text></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text>{mapItem.description && mapItem.description}</Text></View>
              </View>
            ))
          }
        </View>
      </View>
      <View style={[margin([20]), { display: 'flex', flexDirection: 'row' }]}>
        <View style={{ width: '60%' }}>
          <Text style={[fontSize(12)]}>Place:</Text>
          <Text style={[fontSize(12)]}>Date:</Text>
        </View>
        <View>
          <Text style={[fontSize(12)]}>Bidder’s signature and seal.</Text>
        </View>
      </View>
    </View>
  );
}

export default POneForm;
