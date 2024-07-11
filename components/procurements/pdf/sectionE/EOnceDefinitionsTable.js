import React from 'react';
import {
  Text, View, StyleSheet, Link, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function EOnceDefinitionsTable() {
  const {
    margin, padding, fontSize, weight, fontFamily,
  } = CommonStyles;
  Font.register({ family: 'Times-Roman', fontStyle: 'normal', fontWeight: 'bold' });
  const data = [
    {
      id: 'E1-definition-1',
      name: 'Purchaser',
      description: 'Purchaser means the Andhra Pradesh Technology Services Limited (APTS) who is the procurement agency on behalf of the Government of Andhra Pradesh.',
    },
    {
      id: 'E1-definition-2',
      name: 'APTS',
      description: 'The Andhra Pradesh Technology Services Ltd.',
    },
    {
      id: 'E1-definition-3',
      name: 'User Department',
      description: 'The Department of end users on behalf of which APTS is procuring the items',
    },
    {
      id: 'E1-definition-4',
      name: 'HoD',
      description: 'Head of User Department',
    },
    {
      id: 'E1-definition-5',
      name: 'End User/User',
      description: 'Ultimate recipient of goods and services',
    },
    {
      id: 'E1-definition-6',
      name: 'e-Procurement website/Portal',
      description: (<Text><Link href="https://tender.apeprocurement.gov.in/ ">https://tender.apeprocurement.gov.in/ </Link></Text>),
    },
    {
      id: 'E1-definition-7',
      name: 'Online bid submission',
      description: (
        <Text>
          Bids submitted through
          {' '}
          <Link href="https://tender.apeprocurement.gov.in/ ">https://tender.apeprocurement.gov.in/ </Link>
        </Text>),
    },
    {
      id: 'E1-definition-8',
      name: 'NoA',
      description: 'Notification of Award synonymous with Letter of Award (LoA) or Letter of Indent (LoI)',
    },
    {
      id: 'E1-definition-9',
      name: 'Bidder',
      description: 'Any firm offering the solution(s), service(s) and/or materials required in the tender call. The word vendor when used in the pre award period shall be synonymous with bidder and when used after award of the contract shall mean the successful bidder with whom APTS signs the contract for rendering of goods and services.',
    },
    {
      id: 'E1-definition-10',
      name: 'Prime Bidder',
      description: 'A company part of the consortium wholly responsible for contractual obligations and act as Single Point of Contact for the contract management. May also be called as Lead Bidder.',
    },
    {
      id: 'E1-definition-11',
      name: 'Consortium',
      description: 'A group made up of two or more entities or companies that submits bid together for implementation of contractual obligations. Entities that participate in a consortium pool resources but are otherwise only responsible for the obligations that are set out in the consortium&#39;s agreement.',
    },
    {
      id: 'E1-definition-12',
      name: 'Successful Bidder',
      description: 'Successful Bidder means the Bidder who succeeds in the tender process.',
    },
    {
      id: 'E1-definition-13',
      name: 'Supplier/Vendor',
      description: 'The successful Bidder with whom APTS placed the purchase order and supplying the goods and services under this contract. ',
    },
    {
      id: 'E1-definition-14',
      name: 'District',
      description: 'District means the geographical division within the State of Andhra Pradesh. At present there are 13 Districts in Andhra Pradesh.',
    },
    {
      id: 'E1-definition-15',
      name: 'Service Centre',
      description: 'Service Centre means the centre or place, wherein the bidder, inter-alia undertakes and performs the service activities relating to the items indicated in the tender. The service centre will include bidder’s  own  service centre or authorized service centre.',
    },
    {
      id: 'E1-definition-16',
      name: 'Authorized Service Centre',
      description: 'Authorized Service Centre means a Service Centre run by another party by entering into a valid commercial agreement with the bidder. ',
    },
    {
      id: 'E1-definition-17',
      name: 'Cost',
      description: 'Cost means the total cost to be incurred towards the purchase of items and also charges to be incurred towards maintenance of items during the warranty period.',
    },
    {
      id: 'E1-definition-18',
      name: 'Day',
      description: 'A day means a calendar day',
    },
    {
      id: 'E1-definition-19',
      name: 'Tender call or invitation for bids',
      description: 'The detailed notification seeking a set of solution(s), service(s), materials or any combination of them.',
    },
    {
      id: 'E1-definition-20',
      name: 'Tender Document ',
      description: 'Detailed document with instructions to bidders, scope of work and other tender terms and conditions synonymously also knows as Bid Document or Request for Proposal (RFP) ',
    },
    {
      id: 'E1-definition-21',
      name: 'Specifications',
      description: 'The functional and technical specifications or statement of work, as the case may be.',
    },
    {
      id: 'E1-definition-22',
      name: 'Firm',
      description: 'A company, authority, co-operative or any other organization incorporated under appropriate statute as is applicable in the country of incorporation.',
    },
    {
      id: 'E1-definition-23',
      name: 'Pre-qualification and Technical bid',
      description: 'That part of the offer that provides information to facilitate assessment by APTS, professional, technical and financial standing of the bidder, conformity to specifications etc.',
    },
    {
      id: 'E1-definition-24',
      name: 'Financial Bid',
      description: 'That part of the offer, that provides price schedule, total project costs etc.',
    },
    {
      id: 'E1-definition-25',
      name: 'Three Part Bid',
      description: 'The pre-qualification bid, technical and financial bids submitted in Physical to APTS / through eProcurement portal.',
    },
    {
      id: 'E1-definition-26',
      name: 'Two Part Bid',
      description: 'The Technical bid (including Pre-Qualification) and financial bids submitted in physical to APTS / through eProcurement portal and their evaluation is sequential.',
    },
    {
      id: 'E1-definition-27',
      name: 'Composite Bid',
      description: 'A bid in which the technical and financial parts are combined into one, but their evaluation is sequential.',
    },
    {
      id: 'E1-definition-28',
      name: 'Goods and Services',
      description: 'The solution(s), service(s), materials or a combination of them in the context of the tender call and specifications. ',
    },
    {
      id: 'E1-definition-29',
      name: 'Goods',
      description: 'The word goods when used singly shall mean the hardware, firmware component of the goods and services.',
    },
    {
      id: 'E1-definition-30',
      name: 'Maintenance Period',
      description: 'Period mentioned in bid document for maintaining the systems beyond warranty period.',
    },
    {
      id: 'E1-definition-31',
      name: 'BG',
      description: 'Bank Guarantee',
    },
    {
      id: 'E1-definition-32',
      name: 'PBG',
      description: 'Bank Guarantee submitted towards Performance Security',
    },
    {
      id: 'E1-definition-33',
      name: 'EMD BG',
      description: 'Bank Guarantee submitted towards EMD/Bid Security',
    },
    {
      id: 'E1-definition-34',
      name: 'Contract',
      description: 'The agreement entered into between the Purchaser and the vendor, as recorded in the contract form signed by the parties, including all attachments and appendices thereto and all documents incorporated by reference therein',
    },
    {
      id: 'E1-definition-35',
      name: 'Contract Price',
      description: 'The price payable to the vendor under the contract for the full and proper performance of its contractual obligations.',
    },
    {
      id: 'E1-definition-36',
      name: 'Incidental Services',
      description: 'Those services ancillary to the supply of the goods and services, such as transportation and insurance, and any other incidental services, such as installation, commissioning, provision of technical assistance, training and other such obligations of the vendor covered under the contract.',
    },
    {
      id: 'E1-definition-37',
      name: 'GCC',
      description: 'The general conditions of contract contained in this section.',
    },
    {
      id: 'E1-definition-38',
      name: 'SCC',
      description: 'The special conditions of contract if any.',
    },
    {
      id: 'E1-definition-39',
      name: 'Project Site',
      description: 'Where applicable, means the place(s) where goods/services are to be made available to user.',
    },
    {
      id: 'E1-definition-40',
      name: 'Up Time',
      description: 'The time period when specified services with specified technical and service standards are available to user(s).',
    },
    {
      id: 'E1-definition-41',
      name: 'Down Time',
      description: 'The time period when specified services with specified technical and service standards are not available to user(s).',
    },
  ];
  const styles = StyleSheet.create({
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
      width: '45%',
      // border: '1px solid black',
    },
    tableContainer: {
      border: '1px solid black',
    },
  });
  const rows = data.map((item, index) => (
    <View style={styles.row} key={item.id}>
      <View style={[fontSize(10), padding([5]), styles.borderRight, { width: '5%', height: '100%' }]}><Text>{index + 1}</Text></View>
      <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]}>
        {
          typeof item.description === 'string' ? (
            <Text>{item.name}</Text>
          ) : (
            item.name
          )
              }
      </View>
      <View style={[fontSize(10), padding([5]), styles.xyz]}>
        {
          typeof item.description === 'string' ? (
            <Text>{item.description}</Text>
          ) : (
            item.description
          )
        }
      </View>
    </View>
  ));
  return (
    <View style={styles.tableContainer}>{rows}</View>
  );
}

export default EOnceDefinitionsTable;
