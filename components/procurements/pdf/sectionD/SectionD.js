import React, { useEffect, useState } from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';
import { getQuotationCartItemsService } from '../../../../services/dashboard/custom-product/pdf';
import ProductsTable from './ProductsTable';

function SectionD({ uid, accessToken }) {
  const [itemsData, setItemsData] = useState([]);
  const {
    margin, padding, fontSize, weight, fontFamily, flex,
  } = CommonStyles;

  const dOneData = [
    'All the items are to be supplied with minimum technical specifications mentioned in D.1.2.',
    'Higher or better specifications than the mentioned specifications are acceptable.',
    'Make and Model of the offered items and their compliance to below mentioned technical specifications are to be clearly mentioned by the bidders in their technical compliance statement.',
    'Only one make and model to be quoted. Multiple options not acceptable. ',
    'Bidder should supply detailed operations and maintenance manual for each appropriate unit of the supplied items. ',
    'Successful bidder has to supply, install & maintain all the items including re-installation of Operating system and other applications incase gets corrupted. In case, the supplied items are down and not working, same need to be repaired and restored for normal functioning as per agreed Service Level Requirements. Failing which penalty will be recovered from Performance Security as per Clause C. 15.',
    'Warranty period as specified in the BoM will start from the date of delivery or from the date of installation of items whichever is earlier. During warranty period, bidder should attend for preventive maintenance of systems once in six months apart from regular service calls if any during the warranty period. ',
    'APTS may ask the bidders to demonstrate their offered devices before the Technical Committee for Technical Compliance. ',
    'APTS shall provide service desk portal for call logging and monitoring & resolution. The original call log for all the logged calls of complaints & calls closed status should be sent by email to Department on monthly basis for monitoring.  ',
    'Along with the above mentioned call log, a date wise abstract of calls logged and repair status within SLA and outside SLA shall be provided on the dash board by APTS. ',
    'Persistent complaints from the user department during the warranty/maintenance period relating to the improper service will be sufficient ground for the APTS to blacklist the successful bidder from participating in the future tenders. ',
    'At its discretion, APTS/Department may enter in to Annual Maintenance Contract with the supplier after completion of warranty period. AMC Payments will be released to the supplier quarterly after successful maintenance of the equipment under AMC for that period. Service Level Agreement mentioned in this RFP during warranty period is also applicable for AMC period.   ',
  ];
  useEffect(async () => {
    const { data, errors } = await getQuotationCartItemsService(accessToken, uid);
    if (errors) {
      console.log(errors);
    } else {
      const newItems = [];
      data.results.map((mapItem) => {
        const newResultItem = { ...mapItem, attributes: [] };
        mapItem.attributes.map((attributeItem) => {
          const newAttributeItem = { ...attributeItem.attribute };
          if (newResultItem.attributes.filter((attributesFilterItem) => attributesFilterItem.id === attributeItem.attribute.id).length) {
            newResultItem.attributes.map((attributeMapItem) => {
              if (attributeMapItem.id === attributeItem.attribute.id) {
                return { ...attributeMapItem, options: attributeMapItem.options.push(attributeItem.name) };
              }
              return attributeMapItem;
            });
          } else {
            newAttributeItem.options = [attributeItem.name];
            newResultItem.attributes.push(newAttributeItem);
          }
        });
        console.log('newResultItem', newResultItem);
        newItems.push(newResultItem);
      });
      setItemsData(newItems);
    }
  }, []);
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section D – Technical Specifications and Requirements </Text>
      </View>
      <View style={[padding([5, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>D.1. Scope of Work </Text>
      </View>
      <View>
        <View style={[flex('column'), margin([5, 0, 0, 25])]}>
          {
            dOneData.map((mapItem, index) => (
              <View key={index} style={[flex('row'), margin([2, 0])]}>
                <Text style={[fontSize(12)]}>
                  {index + 1}
                  .
                </Text>
                <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>
                  {mapItem}
                </Text>
              </View>
            ))
          }
        </View>
      </View>
      <View style={[margin([25, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>D.2. Technical Specification Requirements</Text>
      </View>
      <View>
        {
          itemsData.map((mapItem, index) => (
            <View style={[margin([15, 0, 5, 0])]}>
              <Text style={[fontSize(13), margin([0, 0, 8, 0])]}>
                Item
                {' '}
                {index + 1}
                {' '}
                :
                {' '}
                {' '}
                {mapItem.category.name}
              </Text>
              <View style={[margin([0, 0, 0, 15])]}>
                <ProductsTable data={mapItem.attributes} />
              </View>
            </View>
          ))
        }
      </View>
    </View>
  );
}

export default SectionD;
