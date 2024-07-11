import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function SectionC() {
  const {
    margin, padding, fontSize, weight, fontFamily, flex,
  } = CommonStyles;

  const data = [
    'Bidders are requested to submit the bids after issue of minutes of the pre bid meeting duly considering the changes made if any, during the pre-bid meeting.',
    'Bidders are totally responsible for incorporating/complying the changes/amendments issued if any during pre-bid meeting in their bid.',
    'The participating bidders in the tender should register themselves free of cost on e-procurement platform in the website www.apeprocurement.gov.in. ',
    'Bidders can log-in to e-procurement platform in Secure mode only by signing with the Digital certificates. ',
    'The bidders who are desirous of participating in e-procurement shall submit their pre-qualification bids, technical bids, price bids as per the standard formats available at the e-market place. ',
    'The bidders should scan and upload the respective documents in Pre-Qualification and Technical bid documentation as detailed at relevant sections of the RFP including EMD.',
    (
      <View style={[fontSize(12), margin([0, 0, 0, 10])]}>
        <Text>
          Bidders should submit their responses as per the procedure specified in the e-Procurement portal  being used for this purpose. Generally, the items to be uploaded on the portal would include all the related documents mentioned in this RFP, such as:
        </Text>
        <View style={[margin([0, 0, 0, 20])]}>
          <View style={[flex('row')]}>
            <Text>a.</Text>
            <Text style={margin([0, 0, 0, 10])}>Tender Fee</Text>
          </View>
          <View style={[flex('row')]}>
            <Text>b.</Text>
            <Text style={margin([0, 0, 0, 10])}>EMD</Text>
          </View>
          <View style={[flex('row')]}>
            <Text>c.</Text>
            <Text style={margin([0, 0, 0, 10])}>Pre-qualification response</Text>
          </View>
          <View style={[flex('row')]}>
            <Text>d.</Text>
            <Text style={margin([0, 0, 0, 10])}>Technical Proposal</Text>
          </View>
          <View style={[flex('row')]}>
            <Text>e.</Text>
            <Text style={margin([0, 0, 0, 10])}>Financial proposal</Text>
          </View>
          <View style={[flex('row')]}>
            <Text>f.</Text>
            <Text style={margin([0, 0, 0, 10])}>Additional certifications/documents Eg. Power of Attorney, CA certificates on turnover, etc.</Text>
          </View>
        </View>

      </View>
    ),
    'However, each of the above documents must be uploaded in the format specified for this purpose and as per the specified folder structure in the e-Procurement portal.',
    'The bidders shall sign on all the statements, documents certificates uploaded by them, owning responsibility for their correctness/authenticity. ',
    'The Prices should be quoted in online only. The Prices should not be indicated in the Pre-Qualification Proposal or Technical Proposal.',
    'The bidder must ensure that the bid is digitally signed by the Authorized Signatory of the bidding firm and has been duly submitted (freezed) within the submission timelines. The Purchaser will in no case be responsible if the bid is not submitted online within the specified timelines.',
    'All the pages of the Proposal document must be sequentially numbered and must contain the list of contents with page numbers. Any deficiency in the documentation may result in the rejection of the Bidder’s Proposal.',
  ];

  const cFourData = [
    'After uploading the documents, the copies of the uploaded statements, certificates, documents, original Demand Drafts in respect of Bid Security (except the Price bid/offer/break-up of taxes) are to be submitted by the bidder to the O/o The Managing Director, APTS, Vijayawada as and when required.',
    'When asked, failure to furnish any of the uploaded documents, certificates, will entitle in rejection of the bid.',
    'If any of the certificates, documents, etc., furnished by the Bidder are found to be false / fabricated / bogus, the bidder will be disqualified, blacklisted, action will be initiated as deemed fit and the Bid Security will be forfeited.',
    'APTS will not hold any risk and responsibility regulating non-visibility of the scanned and uploaded documents. ',
    'The Documents that are uploaded online will only be considered for Bid Evaluation. ',
    'Important Notice to Contractors, Suppliers and Department users ',
    'In the endeavor to bring total automation of processes in e-Procurement, the Govt. has issued orders vide G.O.Ms.No.13, dated05.07.2006 permitting integration of electronic Payment Gateway of ICICI/HDFC/Axis Banks with e-Procurement platform, which provides a facility to participating suppliers / contractors to electronically pay the transaction fee online using their credit cards.',
    'In case of consortium either the prime bidder or the consortium partner can purchase the bid document. The bid can be filed either with user ID of prime bidder or consortium partner.',
  ];
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section C – Instructions for online bid submission:</Text>
      </View>
      <View style={[padding([5, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>C.1. Transaction Fee</Text>
      </View>
      <Text style={[fontSize(12)]}>All the participating bidders who submit the bids have to pay </Text>
      <View>
        <View style={flex('column'), margin([15, 0, 25, 25])}>
          <View style={[flex('row'), margin([2, 0])]}>
            <Text style={[fontSize(12)]}>11.</Text>
            <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>An amount@ 0.03% (plus GST) of their final bid value online with a cap of Rs. 10,000/- for quoted value of purchase up to Rs.50 Crore (or).</Text>
          </View>
          <View style={[flex('row'), margin([2, 0])]}>
            <Text style={[fontSize(12)]}>12.</Text>
            <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>An amount of Rs.25,000/- if the purchase value is above Rs.50crores plus GST applicable on transaction fee through online in favor of MD, APTS. The amount payable to APTS is nonrefundable.</Text>
          </View>
        </View>
      </View>
      <View style={[padding([5, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>C.2. Corpus Fund:</Text>
      </View>
      <Text style={[fontSize(12)]}>Successful bidder shall pay corpus fund in favor of MD, APTS through online (through AP e-Procurement Portal)</Text>
      <View>
        <View style={flex('column'), margin([15, 0, 0, 25])}>
          <View style={[flex('row'), margin([2, 0])]}>
            <Text style={[fontSize(12)]}>11.</Text>
            <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>1.	An amount @ 0.04% of the contract value with a cap of Rs.10,000/- (Rupees Ten Thousand Only) for contract value up to Rs.50 Crore (or)</Text>
          </View>
          <View style={[flex('row'), margin([2, 0])]}>
            <Text style={[fontSize(12)]}>12.</Text>
            <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>2.	An amount of Rs.25,000/- (Rupees Twenty-Five Thousand Only) for the contract value above Rs.50 Crore.</Text>
          </View>
        </View>
      </View>
      <View style={[padding([5, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>C.3. Procedure for bid submission</Text>
      </View>
      <Text style={[fontSize(12)]}>Bids shall be submitted online on https://tender.apeprocurement.gov.in platform</Text>
      <View>
        <View style={flex('column'), margin([15, 0, 0, 25])}>
          {
            data.map((mapItem, index) => (typeof mapItem === 'string' ? (
              <View key={index} style={[flex('row'), margin([2, 0])]}>
                <Text style={[fontSize(12)]}>
                  {index + 1}
                  .
                </Text>
                <Text style={[fontSize(12), margin([0, 0, 0, 10])]}>
                  {mapItem}
                </Text>
              </View>

            ) : (
              <View style={[flex('row'), margin([2, 0])]}>
                <Text style={[fontSize(12)]}>
                  {index + 1}
                  .

                </Text>
                {mapItem}
              </View>

            )))
          }
        </View>
      </View>
      <View style={[padding([15, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>C.4. Other Conditions </Text>
      </View>
      <View>
        <View style={flex('column'), margin([5, 0, 0, 25])}>
          {
            cFourData.map((mapItem, index) => (
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
    </View>
  );
}

export default SectionC;
