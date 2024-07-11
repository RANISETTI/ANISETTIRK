import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import marginAndPaddingClassifiers from './bodyClassifiers';

Font.register({
  family: 'Oswald', src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
export const CommonStyles = StyleSheet.create({
  itemsCenter: {
    position: 'relative',
    textAlign: 'center',
  },
  image: {
    position: 'relative',
    textAlign: 'center',
    alignItems: 'center',
    margin: marginAndPaddingClassifiers([100, 'auto', 20, 'auto']),
    height: '50px',
    width: '150px',
  },
  flex: (direction) => ({
    display: 'flex',
    flexDirection: direction,
  }),
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  pointsCss: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '3px',
  },
  margin: (marginArr) => ({
    margin: marginAndPaddingClassifiers(marginArr),
  }),
  padding: (paddingArr) => ({
    padding: marginAndPaddingClassifiers(paddingArr),
  }),
  fontSize: (size) => ({
    fontSize: `${size}px`,
  }),
  weight: (weight) => ({
    fontWeight: `${weight}`,
  }),
  fontFamily: (name) => ({
    fontFamily: name,
  }),
});
function FirstPage() {
  const {
    margin, padding, fontSize, weight, fontFamily,
  } = CommonStyles;
  const disclaimerContent = [
    {
      key: 'description1',
      description: 'The information contained in this Request for Proposal (“RFP / Bid Document”) or information provided subsequently to bidder(s) or applicants whether verbally or in documentary form by or on behalf of A.P. Technology Services Limited (“APTS”), is provided to the bidder(s) on the terms and conditions set out in this RFP document and all other terms and conditions subject to which such information is provided.',
    },
    {
      key: 'description2',
      description: 'This RFP document is not an agreement and is neither an offer. The purpose of this RFP is to provide applicants who are qualified to submit the bids (“Bidders”) with information to assist them in formulation of their proposals (“Bids”). This RFP does not claim to contain all the information each Bidder may require. Each Bidder may conduct its own independent investigations and analysis and is free to check the accuracy, reliability and completeness of the information in this RFP. APTS makes no representation or warranty, express or implied, and shall incur no liability whatsoever under any law, statute, rules or regulations as to the accuracy, reliability or completeness of this RFP. APTS may in its absolute discretion, but without being under any obligation to do so, update, amend or supplement the information in this RFP.',
    },
    {
      key: 'description3',
      description: 'The information contained in the RFP document is selective and is subject to update, expansion, revision and amendment. APTS does not undertake to provide any Bidder with access to any additional information or to update the information in this RFP or to correct any inaccuracies therein, which may become apparent. APTS reserves the right of discretion to change, modify, add to or alter any or all of the provisions of this RFP and/or the bidding process, without assigning any reasons whatsoever. Such change will be intimated or made accessible to all Bidders. Any information contained in this document will be superseded by any later written information on the same subject made available/accessible to all recipients by APTS.',
    },
    {
      key: 'description4',
      description: 'APTS reserves the right to reject any or all the responses to RFPs / Bids received in response to this RFP at any stage without assigning any reason whatsoever and without being liable for any loss/injury that Bidder might suffer due to such reason. The decision of APTS shall be final, conclusive and binding an all the parties directly or indirectly connected with the bidding process.',
    },
    {
      key: 'description5',
      description: 'No part of this document can be reproduced in any form or by any means, disclosed or distributed to any person without the prior consent of APTS except to the extent required for submitting bid and no more.',
    },
  ];
  return (
    <View>
      <View style={CommonStyles.itemsCenter}>
        <View>
          <Image
            style={CommonStyles.image}
            src="/images/logo_beta.png"
          />
        </View>
        <Text style={[margin([20, 0]), fontSize(20), fontFamily('Oswald')]}>Request for Open Competitive Bid (OCB)</Text>
        <Text style={[margin([15, 0]), fontSize(20), fontFamily('Oswald')]}>for </Text>
        <Text style={[margin([15, 0]), fontSize(20), fontFamily('Oswald')]}>&#60;&#60; title of the procurement&#62;&#62;</Text>
        <Text style={[margin([40, 0]), fontSize(20), fontFamily('Oswald')]}>&#60;&#60;Month & Year&#62;&#62;</Text>
        <View style={[margin([60, 0, 0, 0])]}>
          <Text style={[fontSize(12)]}>Issued by</Text>
          <Text style={[fontSize(16), weight(900)]}>ANDHRA PRADESH TECHNOLOGY SERVICES LIMITED</Text>
          <Text style={[fontSize(12)]}>(Government of AP Undertaking)</Text>
          <Text style={[fontSize(12)]}>(CERT-In Empanelled and ISO 9001:2015, ISO 27001:2013 Certified)</Text>
          <Text style={[fontSize(12)]}>3rd Floor, R&B Building, Opp. Indira Gandhi Municipal Stadium,</Text>
          <Text style={[fontSize(12)]}>MG Road, Labbipet, Vijayawada-520010, Andhra Pradesh, India.</Text>
          <Text style={[fontSize(12)]}>Ph.0866-2468102 | md_apts@ap.gov.in | https://www.apts.gov.in</Text>
        </View>
      </View>
      <View break>
        <View style={[padding([10, 0, 10, 0]), CommonStyles.itemsCenter]}>
          <Text style={[fontSize(12)]}>Disclaimer</Text>
        </View>
        <View>
          {
            disclaimerContent.map((mapItem) => (
              <View>
                <Text style={[fontSize(12), margin([0, 10, 20, 10])]}>{mapItem.description}</Text>
              </View>
            ))
          }
        </View>
      </View>
    </View>
  );
}

export default FirstPage;
