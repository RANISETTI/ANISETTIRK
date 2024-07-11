import React from 'react';
import {
  Text, View, Image, StyleSheet, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';
import { TableStyles } from '../sectionD/ProductsTable';

function FormPTwo() {
  const {
    margin, padding, fontSize, weight, fontFamily, pointsCss,
  } = CommonStyles;
  return (
    <View>
      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(12), { color: 'blue' }]}>Form P-1 - Bidder Information</Text>
      </View>
      <Text style={[fontSize(10), margin([20, 0])]}>
        Turnover details as per pre-qualification criteria mentioned in Section B of this document (taking in to consideration all the amendments issued to this document if any) are to be provided along with supporting documents.
      </Text>

      <View style={margin([5])}>
        <View style={TableStyles.tableContainer}>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, {
              width: '10%', textAlign: 'center', height: '100%', backgroundColor: 'gray',
            }]}
            >
              <Text>SI No.</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>Financial Year</Text>
              <Text>(1)</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>Turnover of the bidder in Rs. </Text>
              <Text>(2)</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>Profit after Tax (Rs.)</Text>
              <Text>(3)</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>Networth in Rs.</Text>
              <Text>(4)</Text>
            </View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>1</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>2</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>3</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
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

      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(12), { color: 'blue' }]}>Form P-3 - List of Major Customers</Text>
      </View>
      <View style={margin([5])}>
        <View style={TableStyles.tableContainer}>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, {
              width: '10%', textAlign: 'center', height: '100%', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>SI No.</Text>
              <Text>A</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>Customer Full Address</Text>
              <Text>B</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>Year of supply</Text>
              <Text>C</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>Items supplied to the customer</Text>
              <Text>D</Text>
            </View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>1</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>2</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>3</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>3</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
        </View>
      </View>

      <View style={[padding([5, 0, 20, 0])]}>
        <Text style={[fontSize(12), { color: 'blue' }]}>Form P-4 - Details of service centers in AP</Text>
      </View>
      <View style={margin([5])}>
        <View style={TableStyles.tableContainer}>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, {
              width: '10%', textAlign: 'center', height: '100%', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>SI No.</Text>
              <Text>A</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>Full Address of service center</Text>
              <Text>B</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>Contact person with phone No.</Text>
              <Text>C</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '25px' }}>No. of support engineers</Text>
              <Text>D</Text>
            </View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>1</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>2</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>3</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>3</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text>3</Text></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
        </View>
      </View>

      <View break>
        <View style={[padding([5, 0, 20, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>Form P-5  - Declaration Regarding Clean Track Record</Text>
        </View>
        <View style={[fontSize(10), margin([15, 0])]}>
          <Text>To,</Text>
          <Text>The Managing Director</Text>
          <Text>Andhra Pradesh Technology Services Limited</Text>
          <Text>3rd Floor, R&B Building, MG Road, Labbipet,</Text>
          <Text style={{ marginBottom: '15px' }}>Vijayawada-520010, Andhra Pradesh, India</Text>
          <Text style={{ marginBottom: '15px' }}>Sir,</Text>
          <Text style={{ marginBottom: '25px' }}>I have carefully gone through the Terms & Conditions contained in the RFP Document [No._________________]. I hereby declare that my Company/Consortium Partners has not been debarred/ black listed as on Bid calling date by any State Government, Central Government, Central & State Govt. Undertakings/enterprises/Organizations and by any other Quasi Government bodies/Organizations, in India for non-satisfactory past performance, corrupt, fraudulent or any other unethical business practices. I further certify that I am competent officer in my company to make this declaration.</Text>
          <Text style={{ marginBottom: '25px' }}>Yours faithfully,</Text>
          <Text>(Signature of the Bidder)</Text>
          <Text>Printed Name</Text>
          <Text>Designation</Text>
          <Text>Seal</Text>
          <Text>Date:</Text>
          <Text>Business Address:</Text>
        </View>

      </View>
      <View break>
        <View style={[padding([5, 0, 20, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>Form P6 – Undertaking in compliance with GFR Rule 144(xi)</Text>
        </View>
        <View style={[fontSize(10), margin([15, 0])]}>
          <Text>To,</Text>
          <Text>The Managing Director</Text>
          <Text>AP Technology Services Ltd, 3rd Floor, R&B Building</Text>
          <Text style={{ marginBottom: '15px' }}>M.G. Road, Vijayawada – 520010</Text>
          <Text style={{ marginBottom: '15px' }}>Dear Sir,</Text>
          <Text style={{ marginBottom: '15px' }}>Sub: Tender for Supply and Commissioning of ___________________________ – Regarding.</Text>
          <Text style={{ marginBottom: '15px' }}>Ref:	Tender Reference  ________________________, Dt. _________</Text>
          <Text style={{ marginBottom: '25px' }}>I have read the GoI order issued by Ministry of Finance vides F. No. 6/18/2019-PPD, dated 23-07-2020 and subsequent clarifications/ amendments & G.O. Ms. No. 9, Dt. 25-02-2021 issued by Industries & Commerce Department of Government of Andhra Pradesh regarding restrictions on procurement from a Bidder of a Country which shares a land border with India.</Text>
          <Text style={{ marginBottom: '25px' }}>I certify that this bidder is not from any such country or, if from such a Country, has been registered with the Competent Authority.  I hereby certify that this bidder fulfills all requirements in this regard and eligible to be considered. [wherever applicable , evidence of valid registration by the competent authority shall be attached ].</Text>
          <Text style={{ marginBottom: '25px' }}>For &#60;Bidder&#62; (* the definition of bidder as per above mentioned GoI orders)</Text>
          <Text>Authorized signatory:</Text>
          <Text>Name of the authorized person:</Text>
          <Text>Designation</Text>
          <Text>Designation:</Text>
          <Text>Name of Bidder:	</Text>
          <Text>Stamp of Bidder:</Text>
        </View>

      </View>
      <Text style={[fontSize(10), margin([25, 0])]}>NOTE: The letter should be submitted on the Letter head of the Bidder and should be signed by the Authorized signatory.</Text>
      <View break>
        <View style={[padding([5, 0, 20, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>Form T 1 – Technical Compliance Statement</Text>
        </View>
        <Text style={[fontSize(10), margin([25, 0])]}>Item wise technical compliance statement as per technical specifications mentioned in Section-D of this document (taking in to consideration all the amendments issued to this document, if any) is to be submitted in the following format:</Text>
        <Text style={[fontSize(10)]}>Item Code:</Text>
        <Text style={[fontSize(10), margin([0, 0, 20, 0])]}>Item Name:</Text>
      </View>
      <View style={margin([5])}>
        <View style={TableStyles.tableContainer}>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, {
              width: '10%', textAlign: 'center', height: '100%', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '90px' }}>SI No.</Text>
              <Text>A</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '90px' }}>Parameter/ Feature</Text>
              <Text>B</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '90px' }}>Specification Required.</Text>
              <Text>C</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '90px' }}>Specification of proposed item along with Part Code, Qty. & Description if any (Part code details must be provided if available)</Text>
              <Text>D</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '90px' }}>Compliance (Complied/Higher/Lower)</Text>
              <Text>E</Text>
            </View>
            <View style={[fontSize(10), padding([5, 0]), TableStyles.borderRight, TableStyles.xyz, {
              width: '45%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
            }]}
            >
              <Text style={{ borderBottom: '1px solid black', height: '90px' }}>
                Reference for proof of compliance
                (Required docs to be uploaded along with technical bid)
              </Text>
              <Text>F</Text>
            </View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}>
              <Text>
                (Detailed reference such as doc name, para no. page no. etc. should be provided)
              </Text>
            </View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '10%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, { width: '45%', height: '100%' }]}><Text /></View>
          </View>
        </View>
      </View>
      <View break>
        <View style={[padding([5, 0, 20, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>Form T 1 – Technical Compliance Statement</Text>
        </View>
        <Text style={[fontSize(10)]}>Compliance/Agreed/Enclosed/ Deviation Statement</Text>
        <Text style={[fontSize(10), margin([20, 0])]}>The following are the particulars of compliance/deviations from the requirements of the tender specifications.</Text>

        <View style={margin([15])}>
          <View style={TableStyles.tableContainer}>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, {
                width: '50%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
              }]}
              >
                <Text>	Bid document reference</Text>
              </View>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
                width: '55%', height: '100%', textAlign: 'center', backgroundColor: 'gray',
              }]}
              >
                <Text>Remarks</Text>
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>	1.Delivery period</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>2. Form P-1</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>3. Form P-2</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>4. Form P-3</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>5. Form P-4</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>6. Form P-5</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>7. Manufacturer’s Authorization Form</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>8. Form T-1</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>9. Form T-2</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>10. Form F-1 (unpriced)</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>11. Pre-qualification criteria</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>12. Technical specifications</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>13. General instruction to bidders</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>14. Standard procedure for bid evaluation</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>15. General condition of proposed Contract(GCC)</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
            <View style={TableStyles.row}>
              <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '50%', height: '100%' }]}>
                <Text>16. Special Condition of proposed Contract(SCC)</Text>
              </View>
              <View style={[TableStyles.borderRight, TableStyles.xyz, { width: '55%', height: '100%' }]}>
                <Text />
              </View>
            </View>
          </View>
        </View>
        <Text style={[fontSize(10)]}>The specifications and conditions furnished in the bidding document shall prevail over those of any other document forming a part of our bid, except only to the extent of deviations furnished in this statement.</Text>

        <View style={[margin([20]), { display: 'flex', flexDirection: 'row' }]}>
          <View style={{ width: '60%' }}>
            <Text style={[fontSize(12)]}>Place:</Text>
            <Text style={[fontSize(12)]}>Date:</Text>
          </View>
          <View>
            <Text style={[fontSize(12)]}>Bidder’s signature and seal.</Text>
          </View>
        </View>
        <Text style={[fontSize(10)]}>NOTE:</Text>
        <Text style={[fontSize(10)]}>For every item appropriate remarks should be indicated like ‘no deviation’, ‘agreed’, ‘enclosed’ etc. as the case may be.</Text>
      </View>
      <View break>

        <View style={[padding([5, 0, 20, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>Form T3 – Model declaration form for undertaking of authenticity for IT Hardware Supplies</Text>
        </View>
        <Text style={[fontSize(10), { textAlign: 'center' }]}>Undertaking of authenticity for IT Hardware Supplies</Text>
        <View style={fontSize(10)}>
          <View style={pointsCss}>
            <Text style={[{ marginRight: '10px' }]}>
              1.
            </Text>
            <Text>
              This has reference to IT Hardware to be supplied/quoted in case we selected for the RFP Ref. No.  ________________ dated ______________
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[{ marginRight: '10px' }]}>
              2.
            </Text>
            <Text>
              We hereby undertake that all the components/parts/assembly/software used in the IT Hardware Supplies  like Hard disk, Monitors, Memory etc shall be original new components/parts/ assembly/software from respective OEMs of the products and that no refurbished/duplicate/second hand components/parts assembly/software are being used or shall be used.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[{ marginRight: '10px' }]}>
              3.
            </Text>
            <Text>
              We undertake that the supplied equipment will be 100% in accordance with the specifications and features mentioned in the RFP/Tender.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[{ marginRight: '10px' }]}>
              4.
            </Text>
            <Text>
              We also undertake that in respect of licensed operating system if asked by you in the purchase order shall be supplied along with the authorized license certificate (eg Product Keys on Certification of Authenticity in case of Microsoft Windows Operating System) and also that it shall be sourced from the authorized source (eg Authorized Microsoft Channel in case of Microsoft Operating System)
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[{ marginRight: '10px' }]}>
              5.
            </Text>
            <Text>
              Should you require, we shall produce certificate from our OEM Supplier in support of above undertaking at the time of delivery. It will be our responsibility to produce such letters from our OEM supplier’s within a reasonable time.
            </Text>
          </View>
          <View style={pointsCss}>
            <Text style={[{ marginRight: '10px' }]}>
              6.
            </Text>
            <Text>
              In case we are found not complying with above at the time of delivery or during installation, for the IT Hardware already billed, we agree to take back such items if already supplied and return the money if any paid to us by you in this regard.
            </Text>
          </View>
        </View>
        <Text style={[fontSize(10), margin([10, 0])]}>Authorized Signatory</Text>
        <Text style={[fontSize(10), margin([10, 0])]}>Name</Text>
        <Text style={[fontSize(10), margin([10, 0])]}>Designation</Text>
      </View>
      <View>
        <View style={[padding([5, 0, 20, 0])]}>
          <Text style={[fontSize(14), { color: 'blue' }]}>Cost Sheets - Form F1</Text>
        </View>
        <Text style={[fontSize(10), { textAlign: 'center' }]}>Schedule I</Text>
        <View style={TableStyles.tableContainer}>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>S.No.</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>Item details with make and model</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>Unit Price without taxes (Rs.)</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>AMC 4th year </Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>AMC 5th year</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>Total cost </Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>Taxes/ Duties etc on unit price(Rs.)</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>Unit price with taxes (8=6+7)</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>QTY (Nos.)</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, TableStyles.xyz, {
              width: '100px', height: '100%', textAlign: 'center',
            }]}
            >
              <Text>Total price with taxes and duties etc.(Rs.)</Text>
            </View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>1</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>2</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>3</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>4</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>5</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>6</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>7</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>8</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>9</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>10</Text>
            </View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>Item 1</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>Item 2</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
          </View>
          <View style={TableStyles.row}>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text>Item 3</Text>
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
            <View style={[fontSize(10), padding([5]), TableStyles.borderRight, { width: '300px', height: '100%' }]}>
              <Text />
            </View>
          </View>
        </View>
        <Text style={[fontSize(10), margin([15, 0]), { textAlign: 'right' }]}>(Signature of Bidder)</Text>
        <Text style={[fontSize(10), margin([6, 0])]}>Note:-</Text>
        <Text style={[fontSize(10), margin([10, 0])]}>1.	Evaluation of Financial Bids will be including taxes.</Text>
      </View>
    </View>
  );
}

export default FormPTwo;
