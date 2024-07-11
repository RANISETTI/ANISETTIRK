import React from 'react';
import {
  Text, View, StyleSheet, Link, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';
import EOnceDefinitionsTable from './EOnceDefinitionsTable';
import SectionEMapped from './SectionEMapped';

function SectionE() {
  const {
    margin, padding, fontSize, weight, fontFamily, flexRow, pointsCss,
  } = CommonStyles;

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
      width: '30%',
      height: '100%',
    },
    xyz: {
      width: '45%',
      // border: '1px solid black',
    },
    tableContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      border: '1px solid black',
    },
  });
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section E – Instructions to Bidders </Text>
      </View>
      <View style={[padding([5, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>E.1. Definitions:</Text>
      </View>
      <View>
        <EOnceDefinitionsTable />
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.1. General: </Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              While every effort has been made to provide comprehensive and accurate background information and requirements and specifications, Bidders must form their own conclusions about the SI support required. Bidders and recipients of this RFP may wish to consult their own legal advisers in relation to this RFP.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              All information supplied by Bidders may be treated as contractually binding on the Bidders, on successful award of the assignment by the Purchaser on the basis of this RFP.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              No commitment of any kind, contractual or otherwise shall exist unless and until a formal written contract has been executed by or on behalf of the Purchaser. Any notification of preferred Bidder status by the  &#60;Purchaser&#62; shall not give rise to any enforceable rights by the Bidder. The Purchaser may cancel this public procurement at any time prior to a formal written contract being executed by or on behalf of the Purchaser.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              This RFP supersedes and replaces any previous public documentation & communications, and Bidders should place no reliance on such communications.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.2. Compliant Tenders / Completeness of Response</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              Bidders are advised to study all instructions, forms, terms , requirements, appendices and other information in the RFP documents carefully. Submission of the bid / proposal shall be deemed to have been done after careful study and examination of the RFP document with full understanding of its implications.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              Failure to furnish all information required by the bidding documents or to submit a bid not substantially responsive to the bidding documents in every respect will be at the bidder’s risk and may result in the rejection of its bid.
            </Text>
          </View>
          <View style={[pointsCss]}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <View style={[fontSize(12)]}>
              <Text>Failure to comply with the requirements of this paragraph may render the Proposal non- compliant and the Proposal may be rejected. Bidders must:</Text>
              <View style={margin([0, 20, 0, 30])}>

                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      a.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Comply with all requirements as set out within this RFP.
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      b.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Submit the forms as specified in this RFP and respond to each element in the order as set out in this RFP
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      c.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Include all supporting documentations specified in this RFP
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.3.	Code of integrity</Text>
        </View>
        <Text style={[fontSize(12)]}>No official of a procuring entity or a bidder shall act in contravention of the codes which includes</Text>
        <View style={[margin([0, 20, 0, 30])]}>

          <View style={[pointsCss]}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <View style={[fontSize(12)]}>
              <Text>prohibition of</Text>
              <View style={margin([0, 20, 0, 30])}>

                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      i.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Making offer, solicitation or acceptance of bribe, reward or gift or any material benefit, either directly or indirectly, in exchange for an unfair advantage in the procurement process or to otherwise influence the procurement process.
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      ii.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Any omission, or misrepresentation that may mislead or attempt to mislead so that financial or other benefit may be obtained or an obligation avoided.
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      iii.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Any collusion, bid rigging or anticompetitive behavior that may impair the transparency, fairness and the progress of the procurement process.
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      iv.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Improper use of information provided by the procuring entity to the bidder with an intent to gain unfair advantage in the procurement process or for personal gain.
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      v.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Any financial or business transactions between the bidder and any official of the procuring entity related to tender or execution process of contract; which can affect the decision of the procuring entity directly or indirectly.
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      vi.	.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Any coercion or any threat to impair or harm, directly or indirectly, any party or its property to influence the procurement process.
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      vii.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Obstruction of any investigation or auditing of a procurement process.
                    </Text>
                  </View>
                </View>
                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      viii.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Making false declaration or providing false information for participation in a tender process or to secure a contract;
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              Disclosure of Conflict of Interest
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              Disclosure by the bidder of any previous transgressions made in respect of the provisions of sub-clause (a) with any entity in any country during the last three years or of being debarred by any other procuring entity.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              In case of any reported violations, the procuring entity, after giving a reasonable opportunity of being heard, comes to the conclusion that a bidder or prospective bidder, as the case may be, has contravened the code of integrity, may take appropriate measures
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.4. Pre-Bid Meeting & Clarifications</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              Pre-bid meeting with the prospective Bidders will be conducted on &#60;Date & time&#62; at &#60;Address of the Venue&#62;. Please refer to Bid Data Sheet in Section A for details.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              The Bidders will have to ensure that their queries for Pre-Bid meeting should reach to
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              &#60;Name, Address, Fax and email id of the Nodal Officer&#62; by post, facsimile or email on or before &#60;Date & time&#62; as mentioned in Bid Data Sheet in Section A.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <View style={[fontSize(12)]}>
              <Text>
                The queries should necessarily be submitted in the following format:

              </Text>
              <View style={[styles.tableContainer, { marginBottom: '5px' }]}>
                <View style={styles.row}>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, { width: '10%', height: '100%' }]}><Text>S.No.</Text></View>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]}><Text>RFP Document Reference(s) (Section & Page Number(s))</Text></View>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]}><Text>Content of RFP requiring Clarification(s)</Text></View>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]}><Text>Points of Clarification /Amendment with justification</Text></View>
                </View>
                <View style={styles.row}>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, { width: '10%', height: '100%' }]}><Text>2</Text></View>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                </View>
                <View style={styles.row}>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, { width: '10%', height: '100%' }]}><Text>3</Text></View>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                </View>
                <View style={styles.row}>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, { width: '10%', height: '100%' }]}><Text>4</Text></View>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                </View>
                <View style={styles.row}>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, { width: '10%', height: '100%' }]}><Text>5</Text></View>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                </View>
                <View style={styles.row}>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, { width: '10%', height: '100%' }]}><Text>6</Text></View>
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                  <View style={[fontSize(10), padding([5]), styles.borderRight, styles.description]} />
                </View>
              </View>
            </View>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              5.
            </Text>
            <Text style={[fontSize(12)]}>
              Purchaser shall not be responsible for ensuring that the Bidders’ queries have been received by them. Any requests for clarifications post the indicated date and time may not be entertained by the Purchaser.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              6.
            </Text>
            <Text style={[fontSize(12)]}>
              The concerned person will respond to any request for clarification of bidding documents which it receives no later than bid clarification date mentioned in the notice prior to deadline for submission of bids prescribed in the tender notice.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              7.
            </Text>
            <Text style={[fontSize(12)]}>
              No clarification from any bidder shall be entertained after the close of date and time for seeking clarification mentioned in tender call notice. It is further clarified that APTS shall not entertain any correspondence regarding delay or non-receipt of clarification from APTS.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              8.
            </Text>
            <Text style={[fontSize(12)]}>
              Bidders who purchased bid document only will be allowed to participate in the pre-bid meeting to seek clarifications on the bid, if any.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              9.
            </Text>
            <Text style={[fontSize(12)]}>
              The pre-bid meeting will be conducted either in physical presence mode or through online virtual meeting tools. Interested bidders should send email request to APTS contact person for receiving the online meeting link.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              10.
            </Text>
            <Text style={[fontSize(12)]}>
              All correspondence should be with APTS contact person only.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.5. Responses to Pre-Bid Queries and Issue of Corrigendum/Amendment</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              The Nodal Officer notified by the Purchaser will endeavour to provide timely response to all queries. However, Purchaser makes no representation or warranty as to the completeness or accuracy of any response made in good faith, nor does Purchaser undertake to answer all the queries that have been posed by the Bidders.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              At any time prior to the last date for receipt of bids, Purchaser may, for any reason, whether at its own initiative or in response to a clarification requested by a prospective Bidder, modify the RFP Document by a corrigendum/amendment.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              The Corrigendum (if any) & clarifications to the queries from all Bidders will be posted on the websites mentioned in bid data sheet.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              Any such corrigendum shall be deemed to be incorporated into this RFP.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              5.
            </Text>
            <Text style={[fontSize(12)]}>
              In order to provide prospective Bidders reasonable time for taking the corrigendum/amendment into account, &#60; Purchaser&#62; may, at its discretion, extend the last date for the receipt of Proposals.
            </Text>
          </View>
          <Text style={[fontSize(12), { color: 'red' }]}>
            [The Manager should ensure clear scope and specific responses to Bidder queries. Clarifications on Scope of work which say “as per RFP” should not be encouraged (only if there is a request for change in terms / condition, then “as per RFP” should be allowed). If Bidders raise doubts about the scope, these should be addressed.]
          </Text>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.6. Right to Terminate the Process</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              Purchaser may terminate the RFP process at any time and without assigning any reason. Purchaser makes no commitments, express or implied, that this process will result in a business transaction with anyone.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              This RFP does not constitute an offer by Purchaser. The Bidder's participation in this process may result Purchaser selecting the Bidder to engage towards execution of the contract.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.7. RFP Document Fees</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              RFP documents have been made available to be download without any fee from the websites mentioned in Bid Data Sheet.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              RFP document fees  (if any, as mentioned in the Bid Data Sheet) should be submitted along with the bidder’s proposal.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              RFP document fee paid is non refundable.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              RFP document fee can be paid by Demand Draft / Cashier’s Cheque/Certified Cheque drawn in favor of “The Managing Director, Andhra Pradesh Technology Services Ltd.” and payable at Vijayawada (India) or through online payment (Purchaser Bank Details are provided in Bid Data Sheet).
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              5.
            </Text>
            <Text style={[fontSize(12)]}>
              RFP document fee is to be paid not later than 1hour before bid closing date & time.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              6.
            </Text>
            <Text style={[fontSize(12)]}>
              Proposals received without or with inadequate RFP Document fees shall be rejected.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.8.  Earnest Money Deposit (EMD)/Bid Security</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              The bidder shall furnish, as part of its bid, a bid security for the amount and validity period as specified in the Bid Data Sheet.
            </Text>
          </View>

          <View style={[pointsCss]}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <View style={[fontSize(12)]}>
              <Text>The bid security is required by Purchaser to:</Text>
              <View style={margin([0, 20, 0, 30])}>

                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      a.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Assure bidder’s continued interest till award of contract and
                    </Text>
                  </View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      b.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Conduct in accordance with bid conditions during the bid evaluation process.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              The bid security shall be paid through Challan/Bank Gurantee(BG)/Online Payment (through AP Eprocurement Portal) in Indian rupees. Bank Guarantee shall be issued by a reputable bank scheduled in India and having at least one branch office in Vijayawada.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              The format for EMD Bank Guarantee is enclosed at Annexure I.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              5.
            </Text>
            <Text style={[fontSize(12)]}>
              The EMD amount is interest free and will be refundable to the unsuccessful Bidders without any accrued interest on it.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              6.
            </Text>
            <Text style={[fontSize(12)]}>
              The bid / proposal submitted without EMD as mentioned above, will be summarily rejected.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              7.
            </Text>
            <Text style={[fontSize(12)]}>
              Unsuccessful bidder’s bid security will be discharged or returned as promptly as possible but not later than thirty (30) days after the expiration of the period of bid validity prescribed by Purchaser.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              8.
            </Text>
            <Text style={[fontSize(12)]}>
              The successful bidder’s bid security will be discharged upon the bidder signing the contract, and furnishing the performance security,
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              9.
            </Text>
            <Text style={[fontSize(12)]}>
              word
            </Text>
          </View>

          <View style={[pointsCss]}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              9.
            </Text>
            <View style={[fontSize(12)]}>
              <Text>The bid security may be forfeited:</Text>
              <View style={margin([0, 20, 0, 30])}>

                <View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      a.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      if a bidder withdraws its bid during the period of bid validity or
                    </Text>
                  </View>
                  <View style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      b.
                    </Text>
                    <Text style={[fontSize(12)]}>
                      Conduct in accordance with bid conditions during the bid evaluation process.
                    </Text>
                  </View>
                  <View style={margin([0, 20, 0, 30])}>
                    <View style={pointsCss}>
                      <Text style={[fontSize(12), { marginRight: '10px' }]}>
                        i.
                      </Text>
                      <Text style={[fontSize(12)]}>
                        to sign the contract in time; or
                      </Text>
                    </View>
                    <View style={pointsCss}>
                      <Text style={[fontSize(12), { marginRight: '10px' }]}>
                        ii.
                      </Text>
                      <Text style={[fontSize(12)]}>
                        to furnish performance security.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.9. Bidding Procedure: </Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              This tender call is issued on e-procurement market place at
              {' '}
              <Link href="www.apeprocurement.gov.in.">www.apeprocurement.gov.in.</Link>
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              All the terms and conditions are to be read jointly as mentioned in the e-procurement market website and in this document.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              Bid offers are to be made in three parts namely, “Prequalification bid”, “Technical bid” and “Financial bid” and in the formats provided in the bid document. All the documents are to be uploaded as per the documents in the corresponding section in eProcurement Website.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.10. General Eligibility</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              This invitation for bids is open to all firms both from within and outside India, who are eligible to do business in India under relevant Indian laws as is in force at the time of bidding subject to meeting the pre-qualification criterion.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              Bidders marked/considered by Purchaser to be ineligible to participate for non-satisfactory past performance, corrupt, fraudulent or any other unethical business practices shall not be eligible.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              Bidder/Consortium Member debarred/ blacklisted by any Central or State Govt. / Quasi –Govt. Departments or organizations as on bid calling date for non-satisfactory past performance, corrupt, fraudulent or any other unethical business practices shall not be eligible.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              Breach of general or specific instructions for bidding, general and special conditions of contract with Purchaser or any of its user organizations may make a firm ineligible to participate in bidding process.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              5.
            </Text>
            <Text style={[fontSize(12)]}>
              Bidders who are having bad past track record with the User Department/Purchaser in respect of fulfilling contractual obligations are ineligible to participate in bidding process.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.11. Preferential Market Access Policy:</Text>
        </View>
        <Text style={[fontSize(12)]}>
          G.O. Ms. No. 22, dt. 28-11-2015 issued by ITE&C Department & G.O. Ms. No. 9, Dt. 25-02-2021 issued by Industries & Commerce Department (copies can be obtained from URL:
          {' '}
          <Link href="http://goir.ap.gov.in/Reports.aspx">http://goir.ap.gov.in/Reports.aspx</Link>
          {' '}
          ) are applicable for this tender. Bidders eligible for the benefits under preferential market access policy can apply by submitting all the relevant document proofs.
        </Text>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.12. Authentication of Bids</Text>
        </View>
        <Text style={[fontSize(12)]}>
          Bid  Proposal should be accompanied by a power-of-attorney in the name of the signatory of the Proposal. In case of e-Procurement, a copy of the same should be uploaded under the relevant section/folder on the eProcurement portal. Furthermore, the bid must also be submitted online after being digitally signed by an authorized representative of the bidding entity.
        </Text>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.13. Bid forms</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              Wherever a specific form is prescribed in the bid document, the bidder shall use the form to provide relevant information. If the form does not provide space for any required information, space at the end of the form or additional sheets shall be used to convey the said information.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              For all other cases the bidder shall design a form to hold the required information.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.14. Cost of bidding</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              The Bidder shall be responsible for all costs incurred in connection with participation in the RFP process, including, but not limited to, costs incurred in conduct of informative and other diligence activities, participation in meetings/discussions/presentations, preparation of proposal, in providing any additional information required by Purchaser to facilitate the evaluation process, and in negotiating a definitive contract or all such activities related to the bid process.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              Purchaser will in no case be responsible or liable for those costs, regardless of the conduct or outcome of the bidding process.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.15. Language</Text>
        </View>
        <Text style={[fontSize(12)]}>
          Bid  Proposal should be accompanied by a power-of-attorney in the name of the signatory of the Proposal. In case of e-Procurement, a copy of the same should be uploaded under the relevant section/folder on the eProcurement portal. Furthermore, the bid must also be submitted online after being digitally signed by an authorized representative of the bidding entity.
        </Text>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.16. Venue & Deadline for Submission of bids</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              Bids submitted after the due date & time will not be accepted by the eProcurement Portal and hence will automatically be rejected.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              AP Eprocurement Portal Server Time will only be considered for bid submission due date and time.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              Bidders are advised to submit the bids well before the due date and time to avoid last minute technical issues if any.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              Bids should be mandatorily submitted through AP Eprocurement Portal only. Other modes of bid submission is not acceptable in case bidder fails to submit the bid successfully on e-Procurement Portal.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              The Purchaser shall not be responsible for any delay in the online submission of the proposal.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              Any bid not submitted through online, before bid closing time will be rejected.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.18. Period of validity of bids</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              Bids shall remain valid for the days or duration specified in the bid document, after the date of bid opening prescribed by Purchaser. A bid valid for a shorter period shall be rejected as non-responsive.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              In exceptional circumstances, the Purchaser may solicit the bidders’ consent to an extension of the period of validity. The request and the responses thereto shall be made in writing. The bid security shall also be suitably extended. A bidder granting the request will not be permitted to modify its bid.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.18. Period of validity of bids</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              Bids shall remain valid for the days or duration specified in the bid document, after the date of bid opening prescribed by Purchaser. A bid valid for a shorter period shall be rejected as non-responsive.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              In exceptional circumstances, the Purchaser may solicit the bidders’ consent to an extension of the period of validity. The request and the responses thereto shall be made in writing. The bid security shall also be suitably extended. A bidder granting the request will not be permitted to modify its bid.
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.19. Modification and withdrawal of bids</Text>
        </View>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              No bid can be modified subsequent to the deadline for submission of bids.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              No bid can be withdrawn in the interval between the deadline for submission of bids and the expiration of the period of bid validity. Withdrawal of a bid during this interval will result in the forfeiture of its bid security (EMD).
            </Text>
          </View>
        </View>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.20.  General Business information:</Text>
        </View>
        <Text style={[fontSize(12)]}>
          The bidder shall furnish general business information to facilitate assessment of its professional, technical and commercial capacity and reputation.
        </Text>
      </View>
      <View style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>E.21. Preparation of Pre-qualification bid:</Text>
        </View>
        <Text style={[fontSize(12)]}>
          It shall include the following information about the firm and its proposal.
        </Text>
        <View style={[margin([0, 20, 0, 30])]}>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              1.
            </Text>
            <Text style={[fontSize(12)]}>
              1.	Details of EMD submitted.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.
            </Text>
            <Text style={[fontSize(12)]}>
              2.	Details of RFP document fee paid
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              3.
            </Text>
            <Text style={[fontSize(12)]}>
              3.	General information on the bidder’s company in Form P-1
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              4.	Details of Consortium if applicable
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              5.	Original Consortium MoU/Agreement if applicable
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              6.	Details of Turnover in Form P-2 along with supporting documents
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              word
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              7.	List of major customers in support of sales turnover in Form P-3 with supporting documents
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              8.	Details of service centers in AP in Form P-4
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              9.	Declaration regarding clean track record in Form-P5
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              10.	Undertaking in compliance with GFR Rule 144(xi) in Form P6
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              11.	Valid Certificates like BIS, ISO, Microsoft etc.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              4.
            </Text>
            <Text style={[fontSize(12)]}>
              12.	Manufacturer’s authorization to participate in bidding process apart from such other documents like authorization certificate for dealing in the products for which bid is submitted. (However this will not apply to Manufacturers)  as per Annexure III.
            </Text>
          </View>
        </View>
      </View>
      <SectionEMapped />
    </View>
  );
}

export default SectionE;
