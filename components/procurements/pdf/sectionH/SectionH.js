import React from 'react';
import {
  Text, View, StyleSheet, Link, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';
import { TableStyles } from '../sectionD/ProductsTable';

function SectionH() {
  const {
    margin, padding, fontSize, weight, fontFamily, flexRow, pointsCss,
  } = CommonStyles;
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section H – Annexures</Text>
      </View>
      <View style={[padding([5, 0, 5, 0])]}>
        <Text style={[fontSize(14), { color: 'blue' }]}>Annexure I : Model Contract Form</Text>
      </View>
      <View style={[margin([10, 0])]}>
        <Text style={[fontSize(12)]}>Contract Ref No: ____________________</Text>
      </View>
      <View style={[margin([10, 0])]}>
        <Text style={[fontSize(12)]}>THIS AGREEMENT is made on ____ day of   _______ </Text>
      </View>
      <View style={[margin([10, 0])]}>
        <View>

          <View style={[margin([15, 0, 0, 0])]}>
            <View style={[margin([5, 0, 5, 0])]}>
              <Text style={[fontSize(14)]}>BETWEEN</Text>
            </View>
            <View style={[margin([0, 20, 0, 30])]}>
              <View style={pointsCss}>
                <Text style={[fontSize(12), { marginRight: '10px' }]}>
                  1.
                </Text>
                <Text style={[fontSize(12)]}>
                  The Managing Director , Andhra Pradesh Technology Services Limited,
                  APTS Ltd, 3rd Floor, R&B Building, MG Road, Labbipet,Vijayawada-500010, Andhra Pradesh, India or HoD of User Department (hereinafter called “the Purchaser”),on behalf of  ________________________________ Department, AP  and

                </Text>
              </View>
              <View style={pointsCss}>
                <Text style={[fontSize(12), { marginRight: '10px' }]}>
                  2.
                </Text>
                <Text style={[fontSize(12)]}>
                  _______________a company incorporated under the laws of India and having its registered office at  _________________. (Hereinafter called “the Supplier”).
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Text style={[fontSize(12), margin([20, 0])]}>
        WHEREAS the Purchaser invited bid for certain goods and ancillary services viz., Supply and Installation of __________________ for supply at _________________ and has accepted a bid by the Supplier for the supply of those goods and services in the sum of Rs. __________ (_________________.) including all taxes and duties (hereinafter called as “the Contract Price”) :
      </Text>

      <Text style={[fontSize(12), margin([10, 0])]}>
        NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:
      </Text>
      <Text style={[fontSize(12), margin([10, 0])]}>
        In this Agreement words and expression shall have the same meanings as are respectively assigned to them in the Conditions of bid document referred to
      </Text>

      <View style={pointsCss}>
        <Text style={[fontSize(12), { marginRight: '10px' }]}>
          1.
        </Text>
        <View>
          <Text style={[fontSize(12)]}>
            Scope of the Work
          </Text>
          <Text style={[fontSize(12)]}>
            Brief outline of the work: To Supply & Installation of devices/products/items as per the staggered orders issued time to time during the contract period ______________________at ______________________________. The detailed scope is as covered in RFP and subsequent clarifications.
          </Text>
        </View>
      </View>
      <View style={[pointsCss, { marginTop: '20px' }]}>
        <Text style={[fontSize(12), { marginRight: '10px' }]}>
          2.
        </Text>
        <View>
          <Text style={[fontSize(12)]}>
            Contract Documents
          </Text>
          <View style={[pointsCss, { marginTop: '20px' }]}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.1.
            </Text>
            <View>
              <Text style={[fontSize(12)]}>
                Contract Documents
              </Text>
              <Text style={[fontSize(12), margin([15, 20])]}>
                The following documents shall constitute the Contract between the User
                and the Supplier, and each shall be read and construed as on integral
                part of the Contract:
              </Text>
              <View style={margin([15, 0])}>

                <View style={[pointsCss]}>
                  <Text style={[fontSize(12), { marginRight: '10px' }]}>
                    I.
                  </Text>
                  <Text style={[fontSize(12)]}>
                    This Contract Agreement and the Annexures attached to the Contract Agreement
                  </Text>
                </View>
                <View style={pointsCss}>
                  <Text style={[fontSize(12), { marginRight: '10px' }]}>
                    II.
                  </Text>
                  <Text style={[fontSize(12)]}>
                    Notification of award
                  </Text>
                </View>
                <View style={pointsCss}>
                  <Text style={[fontSize(12), { marginRight: '10px' }]}>
                    III.
                  </Text>
                  <Text style={[fontSize(12)]}>
                    Minutes of TCPC meeting held on _________
                  </Text>
                </View>
                <View style={pointsCss}>
                  <Text style={[fontSize(12), { marginRight: '10px' }]}>
                    VI.
                  </Text>
                  <Text style={[fontSize(12)]}>
                    Pre – bid conference minutes
                  </Text>
                </View>
                <View style={pointsCss}>
                  <Text style={[fontSize(12), { marginRight: '10px' }]}>
                    V.
                  </Text>
                  <Text style={[fontSize(12)]}>
                    Bid document Ref No. ______________Dt. _________________
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[pointsCss, { marginTop: '20px' }]}>
            <Text style={[fontSize(12), { marginRight: '10px' }]}>
              2.2
            </Text>
            <Text style={[fontSize(12)]}>
              In the event of any ambiguity or conflict between the Contract Documents listed above, the order of precedence shall be the order in which the Contract Documents are listed in 2.1(Contract Documents) above, provided that Schedule of Amendments contained in Annexure IV shall prevail over all provisions of the Contract Agreement and the other Appendices attached to the Contract Agreement and all the other Contract Documents listed in 2.1 above.
            </Text>
          </View>
        </View>
      </View>
      <View style={pointsCss}>
        <Text style={[fontSize(12), { marginRight: '10px' }]}>
          3.
        </Text>
        <View>
          <Text style={[fontSize(12)]}>
            In consideration of the payments to be made by the Purchaser to the Supplier as hereinafter mentioned, the Supplier hereby covenants with the Purchaser   to provide the Goods and Services and to remedy defects therein in conformity in all respects with the provisions of the Contract.
          </Text>
        </View>
      </View>
      <View style={pointsCss}>
        <Text style={[fontSize(12), { marginRight: '10px' }]}>
          4.
        </Text>
        <View>
          <Text style={[fontSize(12)]}>
            The Purchaser hereby covenants to pay the Supplier in consideration of the provision of the Goods and Services and the remedying of defects therein, the Contract Price or such other sum as may become payable under the provisions of the Contract at the times and in the manner prescribed by the Contract.
          </Text>
        </View>
      </View>
      <View style={pointsCss}>
        <Text style={[fontSize(12), { marginRight: '10px' }]}>
          5.1
        </Text>
        <View>
          <Text style={[fontSize(12)]}>
            Brief particulars of the goods and services which shall be supplied /provided by the supplier are as under:
          </Text>
          <View style={margin([15])}>
            <View style={TableStyles.tableContainer}>
              <View style={TableStyles.row}>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '5%', height: '100%' }]}><Text>Sl. No</Text></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text>Solution, service, or material </Text></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text>Mx. Qty</Text></View>
                <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '25%', height: '100%' }]}><Text>Unit Price</Text></View>
              </View>
              <View style={TableStyles.row}>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '5%', height: '100%' }]}><Text>1.</Text></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
              </View>
              <View style={TableStyles.row}>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '5%', height: '100%' }]}><Text>2.</Text></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
              </View>
              <View style={TableStyles.row}>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '5%', height: '100%' }]}><Text>3.</Text></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
              </View>
              <View style={TableStyles.row}>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '5%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '15px' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
              </View>
              <View style={TableStyles.row}>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '5%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text>Grand Total</Text></View>
                <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
                <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={margin([15])}>
        <Text style={[fontSize(12), { marginTop: '10px' }]}>
          5.2 DELIVERY SCHEDULE:_________________
        </Text>
        <Text style={[fontSize(12), { marginTop: '10px' }]}>
          5.3 WARRANT:_________________
        </Text>
        <Text style={[fontSize(12), { marginTop: '10px' }]}>
          5.4 SUPPLIERS RESPONSIBILITY:_________________
        </Text>
        <Text style={[fontSize(12), { marginTop: '10px' }]}>
          5.5 UP TIME % :_________________
        </Text>
        <Text style={[fontSize(12), { marginTop: '10px' }]}>
          5.6 EXIT CLAUSE :_________________
        </Text>
        <Text style={[fontSize(12), { marginTop: '10px' }]}>
          5.7 PAYMENT TERMS:_________________
        </Text>
      </View>
      <Text style={[fontSize(10)]}>
        IN WITNESS WHEREOF the Purchaser and the Supplier have caused this Agreement to be duly executed by their duly authorized representatives the day and year first above written.
      </Text>
      <Text style={[fontSize(10), margin([25, 0, 0, 0])]}>
        For and on behalf of the Purchaser
      </Text>
      <Text style={[fontSize(10), margin([25, 0, 0, 0])]}>
        Signed:	_______
      </Text>
      <Text style={[fontSize(10), margin([25, 0, 0, 0]), { textAlign: 'center' }]}>
        In the capacity of Managing Director, APTS / HoD of User Department
      </Text>
      <Text style={[fontSize(10), margin([25, 0, 0, 0])]}>
        in the presence of 	______________________________________________
      </Text>
      <Text style={[fontSize(10), margin([25, 0, 0, 0])]}>
        For and on behalf of the Supplier
      </Text>
      <Text style={[fontSize(10), margin([25, 0, 0, 0])]}>
        Signed:	_____
      </Text>
      <Text style={[fontSize(10), margin([25, 0, 0, 0]), { textAlign: 'center' }]}>
        in the capacity of------------------------, M/s. _______________________
      </Text>
      <Text style={[fontSize(10), margin([25, 0, 0, 0])]}>
        in the presence of 	___________________________________________
      </Text>
      <View style={margin([15])}>
        <View style={TableStyles.tableContainer}>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '25%', height: '100%' }]}><Text>Items</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '50%', height: '100%' }]}><Text>Configuration Required</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '10%', height: '100%' }]}><Text>Qty</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '15%', height: '100%' }]}><Text>Unit Price</Text></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '25%', height: '100%' }]}><Text>1.</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '50%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '10%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '15%', height: '100%' }]}><Text /></View>
          </View>
        </View>
      </View>
      <Text style={[fontSize(12), margin([50, 0, 0, 0]), { textAlign: 'center' }]}>
        Annexure – IV
      </Text>
      <Text style={[fontSize(12), margin([25, 0, 0, 0]), { textAlign: 'center' }]}>
        Amendments & Other Documents
      </Text>
      <View style={margin([15])}>
        <View style={TableStyles.tableContainer}>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '25%', height: '100%' }]}><Text>S.No.</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text>Amendment No</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text>Date</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '25%', height: '100%' }]}><Text>Amendment Description</Text></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '25%', height: '100%' }]}><Text>1.</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.xyz, { width: '25%', height: '100%' }]}><Text /></View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SectionH;
