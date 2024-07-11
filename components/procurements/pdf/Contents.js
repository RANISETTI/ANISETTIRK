import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from './FirstPage';

function Contents() {
  const {
    margin, padding, fontSize, weight, fontFamily,
  } = CommonStyles;
  const contentsItems = [
    {
      id: 'a',
      name: 'Section A – Schedule of Requirements',
      page: '8',
      children: [
        {
          id: 'a1',
          name: 'A.1. Introduction',
          page: '8',
          slug: 'introduction',
        },
        {
          id: 'a2',
          name: 'A.2. Project Description',
          page: '8',
          slug: '',
        },
        {
          id: 'a3',
          name: 'A.3. Bid Data Sheet:',
          page: '8',
          slug: '',
        },
      ],
    },
    {
      id: 'b',
      name: 'Section B – Pre-qualification Criteria',
      page: '11',
      children: [
        {
          id: 'b1',
          name: 'B.1. Eligibility Criteria',
          page: '11',
          slug: 'introduction',
        },
        {
          id: 'b2',
          name: 'B.2. Consortium Terms & Conditions',
          page: '13',
          slug: '',
        },
      ],
    },
    {
      id: 'b',
      name: 'Section C – Instructions for online bid submission:',
      page: '14',
      children: [
        {
          id: 'c1',
          name: 'C.1. Transaction Fee',
          page: '14',
          slug: 'introduction',
        },
        {
          id: 'c2',
          name: 'C.2. Corpus Fund:',
          page: '14',
          slug: '',
        },
        {
          id: 'c3',
          name: 'C.3. Procedure for bid submission',
          page: '14',
          slug: '',
        },
        {
          id: 'c4',
          name: 'C.4. Other Conditions',
          page: '15',
          slug: '',
        },
      ],
    },
    {
      id: 'd',
      name: 'Section D – Technical Specifications and Requirements',
      page: '16',
      children: [
        {
          id: 'd1',
          name: 'D.1. Scope of Work',
          page: '16',
          slug: 'introduction',
        },
        {
          id: 'd2',
          name: 'D.2. Technical Specification Requirements',
          page: '16',
          slug: '',
        },
      ],
    },
    {
      id: 'b',
      name: 'Section C – Instructions for online bid submission:',
      page: '14',
      children: [
        {
          id: 'e1-definitions',
          name: 'E.1. Definitions',
          page: '14',
          slug: 'introduction',
        },
        {
          id: 'e1-General',
          name: 'E.1. Feneral',
          page: '14',
          slug: 'introduction',
        },
        {
          id: 'c2',
          name: 'E.2. Complaint Tenders / Completeness of Response:',
          page: '14',
          slug: '',
        },
        {
          id: 'c3',
          name: 'E.3. Code of  integrity',
          page: '14',
          slug: '',
        },
        {
          id: 'e4',
          name: 'E.4. Pre-bid Meeting & Clarifications',
          page: '15',
          slug: '',
        },
        {
          id: 'e5',
          name: 'E.4. Responses to Pre-Bid Queries and Issue of Corrigendum/Amendment',
          page: '15',
          slug: '',
        },
        {
          id: 'e6',
          name: 'E.4. Right to Terminate the Process',
          page: '15',
          slug: '',
        },
        {
          id: 'e7',
          name: 'E.4. RFP Document Fees',
          page: '15',
          slug: '',
        },
        {
          id: 'e8',
          name: 'E.8.  Earnest Money Deposit (EMD)/Bid Security',
          page: '15',
          slug: '',
        },
        {
          id: 'e9',
          name: 'E.9. Bidding Procedure',
          page: '15',
          slug: '',
        },
        {
          id: 'e10',
          name: 'E.10. General Eligibility',
          page: '15',
          slug: '',
        },
        {
          id: 'e11',
          name: 'E.11. Preferential Market Access Policy',
          page: '15',
          slug: '',
        },
        {
          id: 'e12',
          name: 'E.12. Authentication of Bids',
          page: '15',
          slug: '',
        },
        {
          id: 'e13',
          name: 'E.13. Bid forms',
          page: '15',
          slug: '',
        },
        {
          id: 'e14',
          name: 'E.14. Cost of bidding',
          page: '15',
          slug: '',
        },
        {
          id: 'e15',
          name: 'E.15. Language',
          page: '15',
          slug: '',
        },
        {
          id: 'e16',
          name: 'E.16. Venue & Deadline for Submission of bids',
          page: '15',
          slug: '',
        },
        {
          id: 'e17',
          name: 'E.17. Late bids',
          page: '15',
          slug: '',
        },
        {
          id: 'e18',
          name: 'E.18. Period of validity of bids',
          page: '15',
          slug: '',
        },
        {
          id: 'e19',
          name: 'E.19. Modification and withdrawal of bids',
          page: '15',
          slug: '',
        },
        {
          id: 'e20',
          name: 'E.20.  General Business information:',
          page: '15',
          slug: '',
        },
        {
          id: 'e21',
          name: 'E.21. Preparation of Pre-qualification bid:',
          page: '15',
          slug: '',
        },
        {
          id: 'e22',
          name: 'E.22. Preparation of  Technical Bid:',
          page: '15',
          slug: '',
        },
        {
          id: 'e23',
          name: 'E.23. Preparation of Financial Bid:',
          page: '15',
          slug: '',
        },
        {
          id: 'e24',
          name: 'E.24. Procedure for Reverse Auction ',
          page: '15',
          slug: '',
        },
        {
          id: 'e25',
          name: 'E.25. Bid evaluation procedure:',
          page: '15',
          slug: '',
        },
        {
          id: 'e26',
          name: 'E.26. Opening of bids:',
          page: '15',
          slug: '',
        },
        {
          id: 'e27',
          name: 'E.27. Preliminary examination of Bids',
          page: '15',
          slug: '',
        },
        {
          id: 'e28',
          name: 'E.28.  EMD Validity:',
          page: '15',
          slug: '',
        },
        {
          id: 'e29',
          name: 'E.29. Bid validity:',
          page: '15',
          slug: '',
        },
        {
          id: 'e30',
          name: 'E.30. Seeking Clarifications on received bids',
          page: '15',
          slug: '',
        },
        {
          id: 'e31',
          name: 'E.31. Evaluation of Pre-qualification bids:',
          page: '15',
          slug: '',
        },
        {
          id: 'e32',
          name: 'E.32. Evaluation of Technical bids:',
          page: '15',
          slug: '',
        },
        {
          id: 'e33',
          name: 'E.33. Evaluation of financial bids',
          page: '15',
          slug: '',
        },
        {
          id: 'e34',
          name: 'E.34. Performance and productivity of the equipment',
          page: '15',
          slug: '',
        },
        {
          id: 'e35',
          name: 'E.35. Contacting Purchaser',
          page: '15',
          slug: '',
        },
        {
          id: 'e36',
          name: 'E.36.  Purchaser’s  right to vary quantities at time of award',
          page: '15',
          slug: '',
        },
        {
          id: 'e37',
          name: 'E.37. Purchaser ’ right to accept any bid and to reject any or all bids.',
          page: '15',
          slug: '',
        },
        {
          id: 'e38',
          name: 'E.38. Negotiation',
          page: '15',
          slug: '',
        },
        {
          id: 'e39',
          name: 'E.39. Award Criterion',
          page: '15',
          slug: '',
        },
        {
          id: 'e40',
          name: 'E.40. Order Placing Authority',
          page: '15',
          slug: '',
        },
        {
          id: 'e41',
          name: 'E.41. Notification of award',
          page: '15',
          slug: '',
        },
        {
          id: 'e42',
          name: 'E.42. Performance security',
          page: '15',
          slug: '',
        },
        {
          id: 'e43',
          name: 'E.43. Signing of contract',
          page: '15',
          slug: '',
        },
        {
          id: 'e44',
          name: 'E.44. Corrupt, fraudulent and unethical practices',
          page: '15',
          slug: '',
        },
        {
          id: 'e45',
          name: 'E.45. Conflict of Interest',
          page: '15',
          slug: '',
        },
      ],
    },
    {
      id: 'f',
      name: 'Section F – General Conditions of Proposed Contract (GCC):',
      page: '14',
      children: [
        {
          id: 'f1-definitions',
          name: 'F.1.  Application',
          page: '14',
          slug: 'introduction',
        },
        {
          id: 'f2-General',
          name: 'F.2. Standards',
          page: '14',
          slug: 'introduction',
        },
        {
          id: 'f3',
          name: 'F.3. Use of documents and information',
          page: '14',
          slug: '',
        },
        {
          id: 'f4',
          name: 'F.4. User license and patent rights',
          page: '14',
          slug: '',
        },
        {
          id: 'f5',
          name: 'F.5. Performance security',
          page: '15',
          slug: '',
        },
        {
          id: 'f6',
          name: 'F.6. Manuals and drawings',
          page: '15',
          slug: '',
        },
        {
          id: 'f7',
          name: 'F.7. Inspection and acceptance tests',
          page: '15',
          slug: '',
        },
        {
          id: 'f8',
          name: 'F.8. Acceptance certificates',
          page: '15',
          slug: '',
        },
        {
          id: 'f9',
          name: 'F.9. Packing',
          page: '15',
          slug: '',
        },
        {
          id: 'f10',
          name: 'F.10. Delivery and Installation period:',
          page: '15',
          slug: '',
        },
        {
          id: 'f11',
          name: 'F.11. Delivery and documents',
          page: '15',
          slug: '',
        },
        {
          id: 'f12',
          name: 'F.12.Insurance',
          page: '15',
          slug: '',
        },
        {
          id: 'f13',
          name: 'F.13. Transportation',
          page: '15',
          slug: '',
        },
        {
          id: 'f14',
          name: 'F.14. Hardware Installation',
          page: '15',
          slug: '',
        },
        {
          id: 'f15',
          name: 'F.15. Incidental services',
          page: '15',
          slug: '',
        },
        {
          id: 'f16',
          name: 'F.16. Spare parts',
          page: '15',
          slug: '',
        },
        {
          id: 'f17',
          name: 'F.17. Warranty',
          page: '15',
          slug: '',
        },
        {
          id: 'f18',
          name: 'F.18. Maintenance service',
          page: '15',
          slug: '',
        },
        {
          id: 'f19',
          name: 'F.19. Payment',
          page: '15',
          slug: '',
        },
        {
          id: 'f20',
          name: 'F.20.  Prices:',
          page: '15',
          slug: '',
        },
        {
          id: 'f21',
          name: 'F.21. Change orders',
          page: '15',
          slug: '',
        },
        {
          id: 'f22',
          name: 'F.22. Contract amendment',
          page: '15',
          slug: '',
        },
        {
          id: 'f23',
          name: 'F.23. Assignment',
          page: '15',
          slug: '',
        },
        {
          id: 'f24',
          name: 'F.24. Subcontracts ',
          page: '15',
          slug: '',
        },
        {
          id: 'f25',
          name: 'F.25. Delays in the supplier’s performance',
          page: '15',
          slug: '',
        },
        {
          id: 'f26',
          name: 'F.26. Liquidated damages',
          page: '15',
          slug: '',
        },
        {
          id: 'f27',
          name: 'F.27. Taxes and duties',
          page: '15',
          slug: '',
        },
        {
          id: 'f28',
          name: 'F.28.  Licensing considerations',
          page: '15',
          slug: '',
        },
        {
          id: 'f29',
          name: 'F.29. Protection against damages- site conditions:',
          page: '15',
          slug: '',
        },
        {
          id: 'f30',
          name: 'F.30. Fail-safe procedure',
          page: '15',
          slug: '',
        },
        {
          id: 'f31',
          name: 'F.31. Training:',
          page: '15',
          slug: '',
        },
        {
          id: 'f32',
          name: 'F.32. Site Preparation and Installation:',
          page: '15',
          slug: '',
        },
        {
          id: 'f33',
          name: 'F.33. Governing language',
          page: '15',
          slug: '',
        },
        {
          id: 'f34',
          name: 'F.34. Applicable law',
          page: '15',
          slug: '',
        },
        {
          id: 'f35',
          name: 'F.35. Notices',
          page: '15',
          slug: '',
        },
        {
          id: 'f36',
          name: 'F.36.  Termination for default',
          page: '15',
          slug: '',
        },
        {
          id: 'f37',
          name: 'F.37. Force majeure',
          page: '15',
          slug: '',
        },
        {
          id: 'f38',
          name: 'F.38. Termination for insolvency',
          page: '15',
          slug: '',
        },
        {
          id: 'f39',
          name: 'F.39. Termination for convenience',
          page: '15',
          slug: '',
        },
        {
          id: 'f40',
          name: 'F.40. Resolution of disputes',
          page: '15',
          slug: '',
        },
      ],
    },
    {
      id: 'g',
      name: 'Section G – Special Conditions of Proposed Contract (SCC)',
      page: '16',
      children: [
        {
          id: 'g1',
          name: 'G.1. Payment Terms and Conditions',
          page: '16',
          slug: 'introduction',
        },
        {
          id: 'g2',
          name: 'G.2. LD for late deliveries/installations',
          page: '16',
          slug: '',
        },
        {
          id: 'g2',
          name: 'G.3. Maximum LD for late deliveries/ installation:',
          page: '16',
          slug: '',
        },
        {
          id: 'g2',
          name: 'G.4. Service Level Requirements',
          page: '16',
          slug: '',
        },
        {
          id: 'g2',
          name: 'G.5. Penalty for failure to maintain during warranty period for all items:',
          page: '16',
          slug: '',
        },
      ],
    },
    {
      id: 'h',
      name: 'Section H – Annexures',
      page: '16',
      children: [
        {
          id: 'h1',
          name: 'Annexure I : Model Contract Form',
          page: '16',
          slug: 'introduction',
        },
        {
          id: 'h2',
          name: 'Annexure II – Bid Security (EMD) BG Form',
          page: '16',
          slug: '',
        },
        {
          id: 'h2',
          name: 'Annexure III – Performance Security BG Form',
          page: '16',
          slug: '',
        },
        {
          id: 'h2',
          name: 'Annexure IV – Manufacturer’s Authorization Form',
          page: '16',
          slug: '',
        },
        {
          id: 'h2',
          name: 'Annexure V – Model Installation cum AT Report',
          page: '16',
          slug: '',
        },
      ],
    },
    {
      id: 'i',
      name: 'Section I – Bid Forms',
      page: '16',
      children: [
        {
          id: 'i1',
          name: 'Bid Letter Form',
          page: '16',
          slug: 'introduction',
        },
        {
          id: 'i2',
          name: 'Form P-1 - Bidder Information',
          page: '16',
          slug: '',
        },
        {
          id: 'i3',
          name: 'Form P-2 – Bidder Turnover Details',
          page: '16',
          slug: '',
        },
        {
          id: 'i4',
          name: 'Form P-3 - List of Major Customers',
          page: '16',
          slug: '',
        },
        {
          id: 'i5',
          name: 'Form P-4 - Details of service centers in AP',
          page: '16',
          slug: '',
        },
        {
          id: 'i6',
          name: 'Form P-5  - Declaration Regarding Clean Track Record',
          page: '16',
          slug: '',
        },
        {
          id: 'i7',
          name: 'Form P6 – Undertaking in compliance with GFR Rule 144(xi)',
          page: '16',
          slug: '',
        },
        {
          id: 'i8',
          name: 'Form T 1 – Technical Compliance Statement',
          page: '16',
          slug: '',
        },
        {
          id: 'i9',
          name: 'Form T 2 - Checklist',
          page: '16',
          slug: '',
        },
        {
          id: 'i10',
          name: 'Form T3 – Model declaration form for undertaking of authenticity for IT Hardware Supplies',
          page: '16',
          slug: '',
        },
        {
          id: 'i11',
          name: 'Cost Sheets - Form F1',
          page: '16',
          slug: '',
        },
      ],
    },
  ];
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(12)]}>Contents</Text>
      </View>
      <View style={[padding([0, 10])]}>
        {
          contentsItems.map((mapItem) => (
            <View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text key={mapItem.id} style={[fontSize(12)]}>{mapItem.name}</Text>
                <Text key={mapItem.id} style={[fontSize(12), margin([0, 0, 0, 'auto'])]}>{mapItem.page}</Text>
              </View>
              <View>
                {
                  mapItem.children && mapItem.children.map((childItem) => (
                    <View style={[padding([0, 0, 0, 20]), { display: 'flex', flexDirection: 'row' }]}>
                      <Text key={childItem.id} style={[fontSize(12)]}>{childItem.name}</Text>
                      <Text key={childItem.id} style={[fontSize(12), margin([0, 0, 0, 'auto'])]}>{childItem.page}</Text>
                    </View>
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>
    </View>
  );
}

export default Contents;
