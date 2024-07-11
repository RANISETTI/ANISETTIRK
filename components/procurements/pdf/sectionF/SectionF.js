import React from 'react';
import {
  Text, View, StyleSheet, Link, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function SectionF() {
  const {
    margin, padding, fontSize, weight, fontFamily, flexRow, pointsCss,
  } = CommonStyles;

  const data = [
    {
      id: 'F1',
      heading: 'F.1.  Application',
      description: 'These general conditions shall apply to the extent that they are not superseded by provisions of other parts of the contract.',
    },
    {
      id: 'F2',
      heading: 'F.2. Standards',
      description: 'The goods supplied under this contract shall conform to the standards mentioned in the specifications, and, when no applicable standard is mentioned, the authoritative standards appropriate to the goods’ country of origin shall apply. Such standard shall be the latest issued by the concerned institution.',
    },
    {
      id: 'F3',
      heading: 'F.3. Use of documents and information',
      children: [
        {
          description: 'The vendor shall not, without prior written consent from Purchaser, disclose/share/use the bid document, contract, or any provision thereof, or any specification, plan, drawing, pattern, sample or information furnished by or on behalf of the Purchaser in connection therewith, to any person other than a person employed by the vendor in the performance of the contract. Disclosure to any such employed person shall be made in confidence and shall extend only so far as may be necessary for purposes of such performance.',
        },
        {
          description: 'The Vendor shall not, without prior written consent of Purchaser, make use of any document or information made available for the project, except for purposes of performing the Contract.',
        },
        {
          description: 'All project related document (including this bid document) issued by Purchaser, other than  the contract itself, shall remain the property of the Purchaser and shall be returned (in all copies) to the Purchaser on completion of the Vendor’s performance under the contract if so required by the Purchaser.',
        },
      ],
    },
    {
      id: 'F4',
      heading: 'F.4. User license and patent rights',
      children: [
        {
          description: 'The Vendor shall provide licenses for all software products, whether developed by it or acquired from others. In the event of any claim asserted by a third party for software piracy, the vendor shall act expeditiously to extinguish such claim. If the vendor fails to comply and the Purchaser is required to pay compensation to a third party resulting from such software piracy, the vendor shall be responsible for compensation including all expenses, court costs and lawyer fees.  The Purchaser will give notice to the vendor of such claim, if it is made, without delay.',
        },
        {
          description: 'The Vendor shall indemnify the purchases against all third party claims of infringement of patent, trademark or industrial design rights arising from use of the goods, software package or any part thereof.',
        },
      ],
    },
    {
      id: 'F5',
      heading: 'F.5. Performance security',
      children: [
        {
          description: 'On receipt of notification of award, the Vendor shall furnish performance security to Purchaser in accordance with bid document requirement.',
        },
        {
          description: 'The proceed of the performance security shall be payable to the Purchaser as compensation for any loss resulting from the supplier’s failure to complete its obligations under the contract.',
        },
        {
          description: 'The performance security shall be denominated in Indian rupees or in a freely convertible currency acceptable to Purchaser and shall be in one of the following forms:',
          level2Children: [
            {
              id: 'a.',
              description: 'A bank guarantee or an irrevocable letter of credit, issued by a reputed bank located in India with at least one branch office in Vijayawada, in the form provided in the bidding document or another form acceptable to the Purchaser; or',
            },
            {
              id: 'b.',
              description: 'A cashier’s cheque or banker’s certified cheque or crossed demand draft or pay order drawn in favor of the Purchaser.',
            },
          ],
        },
        {
          description: 'The performance security will be discharged by the Purchaser and returned to the Vendor not later than thirty (30) days following the date of completion of all formalities under the contract  and if activities, post warranty, by the Vendor is envisaged, following receipt of a performance guarantee for annual maintenance as per bid document.',
        },
        {
          description: 'In the event of any contract amendment, the vendor shall, within 15 days of receipt of such amendment, furnish the amendment to the performance security, rendering the same valid for the duration of the Contract.',
        },
      ],
    },
    {
      id: 'F6',
      heading: 'F.6. Manuals and drawings',
      children: [
        {
          description: 'Before the goods and services are taken over by the user, the Vendor shall supply operation and maintenance manuals, (together with drawings of the goods and services where applicable). ',
        },
        {
          description: 'The Vendor shall provide complete technical documentation of hardware, firmware, all subsystems, operating systems, compiler, system software and the other software.',
        },
        {
          description: 'The manuals and drawings wherever applicable shall be in English or Telugu.',
        },
        {
          description: 'At least one set of the manuals should be supplied for each installation sites.',
        },
        {
          description: 'Unless and otherwise agreed, the goods and services shall not be considered to be completed for the purpose of taking over until such manuals and drawings have been supplied to the user.',
        },
      ],
    },
    {
      id: 'F7',
      heading: 'F.7. Inspection and acceptance tests',
      children: [
        {
          description: 'Inspection and tests prior to shipment of Goods and at final acceptance are as follows:',
          level2Children: [
            {
              id: 'a.',
              description: 'Inspection of the goods shall be carried out to check whether the goods are in conformity with the specifications mentioned in the bid document.  Following broad test procedure will generally be followed for inspection and testing of hardware and firm wares. The vendor will dispatch the goods to the ultimate consignee after internal inspection testing along with the supplier’s inspection report, manufacturer’s warranty certificate. The Purchaser will test the equipment after completion of the installation and commissioning at the site of the installation. (If site preparation is not included in the tender call or specification, the vendor should furnish all details of the site requirement to the Purchaser sufficiently in advance so as to get the works completed before receipt of the equipment.)',
            },
            {
              id: 'b.',
              description: 'The Inspections and tests, at the discretion of Purchaser, may be conducted on the premises of the Vendor or its subcontractor(s), at point of delivery, and / or at the good’s final destination. If conducted on the premises of the Vendor or its subcontractor(s), all reasonable facilities and assistance, including access to drawings and production data, shall be furnished to the inspectors at no charge to the Purchaser. ',
            },
            {
              id: 'c.',
              description: 'Should any inspected or tested goods fail to conform to the specifications the Purchaser may reject the goods, and the vendor shall either replace the rejected goods or make alterations necessary to meet specification requirements free of cost to the Purchaser/user.',
            },
            {
              id: 'd.',
              description: 'Purchaser’ right to inspect, test and, where necessary reject the goods after the goods’ arrival at user’s site shall in no way be limited or waived by reason of the goods having previously been inspected, tested and passed by the Purchaser or  its representative prior to the goods shipment from the country of origin.',
            },
            {
              id: 'e.',
              description: 'Nothing in this clause shall in any way release the vendor from any warranty or other obligations under this contract.',
            },
            {
              id: 'f.',
              description: 'The acceptance test will be conducted by the Purchaser, their consultant or any other person nominated by the Purchaser, at its option.  There shall not be any additional charges for carrying out acceptance tests. Any reduction in functional requirements, and performance specifications shall be ground for failure. Any malfunction, partial or complete failure of any part of hardware, firmware or bugs in the software shall be grounds for failure of acceptance test. All the software should be complete, and no missing modules / sections will be allowed. The vendor shall maintain necessary log in respect of the results of the tests to establish to the entire satisfaction of the Purchaser, the successful completion of the test specified. An average uptake efficiency of 97% for the duration of test period (7 days) shall be considered as satisfactory.',
            },
            {
              id: 'g.',
              description: 'In the event of the hardware and software failing to pass the acceptance test, A period not exceeding two weeks will be given to rectify the defects and clear the acceptance test, failing which the Purchaser reserves the rights to get the Equipment replaced by the vendor at no extra cost to the Purchaser/user.',
            },
          ],
        },
      ],
    },
    {
      id: 'F8',
      heading: 'F.8. Acceptance certificates',
      description: 'On successful completion of acceptability test, receipt of deliverables etc, and after Purchaser is satisfied with the working of the system, the acceptance certificate signed by the vendor and the representative of the Purchaser will be issued. The date on which such certificate is signed shall be deemed to be the date of successful commissioning of the systems.',
    },
    {
      id: 'F9',
      heading: 'F.9. Packing',
      children: [
        {
          description: 'The vendor shall provide such packing of the goods as is required to prevent their damage or deterioration during transit to their final destination. The packing shall be sufficient to withstand, without limitation, rough handling during transit and exposure to extreme temperature, salt and precipitation during transit and open storage. Packing case size and weights shall take into consideration, where appropriate, the remoteness of the goods’ final destination and the absence of heavy handling facilities at all points in transit. ',
        },
        {
          description: 'The packing, marking and documentation within and outside the packages shall comply strictly with such special requirements as shall be expressly provided for in the contract, including additional requirements, if any, specified in SCC, and in any subsequent instructions ordered by the Purchaser.',
        },
      ],
    },
    {
      id: 'F10',
      heading: 'F. 10. Delivery and Installation period:',
      description: 'Successful Bidder shall deliver the goods/services, install and commission the same within the time period as mentioned in the Bid Data Sheet at the designated locations as communicated by the Purchaser/User Department. ',
    },
    {
      id: 'F11',
      heading: 'F.11. Delivery and documents',
      description: 'Delivery of the goods/services shall be made by the vendor in accordance with the terms specified in the tender document. The details of shipping and / or other documents to be furnished and submitted by the vendor are specified below.',
      children: [
        {
          id: 'A)',
          description: 'For Goods supplied from abroad:',
          level2Children: [
            {
              id: '1',
              description: 'Within 24 hours of shipment, the Vendor shall notify the Purchaser and the Insurance Company by cable/fax/email full details of the shipment including contract number, description of goods, quantity, the vessel, the bill of lading number and date, port of loading, date of shipment, port of discharge, etc. The Vendor shall mail the following documents to the Purchaser, with a copy to the Insurance Company.',
            },
            {
              id: '2',
              description: 'Four copies of supplier’s invoice showing goods description, quantity, unit price and total amount;',
            },
            {
              id: '3',
              description: '4 copies of packing list identifying contents of each package;',
            },
            {
              id: '4',
              description: 'Insurance certificate; Manufacturer’s/Supplier’s warranty certificate;',
            },
            {
              id: '5',
              description: 'Inspection certificate, issued by the nominated inspection agency and  ',
            },
            {
              id: '6',
              description: 'The Supplier’s   factory inspection report; and Certificate of origin.',
            },
            {
              id: '7',
              description: 'The above documents shall be received by the Purchaser at least one week before arrival of Goods at the port or place of arrival and, if not received, the Vendor will be responsible for any consequent expenses.',
            },
          ],
        },
        {
          id: 'B)',
          description: (
            <View>
              <Text style={[fontSize(12)]}>
                For Goods from within India:
              </Text>
              <Text style={[fontSize(12)]}>
                Upon delivery of the goods to the user, the vendor shall notify the Purchaser and mail the following documents to the Purchaser:
              </Text>
            </View>
          ),
          level2Children: [
            {
              id: '1',
              description: 'Four copies of the Vendor invoice showing goods description, quantity, unit price total amount;',
            },
            {
              id: '2',
              description: 'Delivery note, or acknowledgement of receipt of goods from the user;',
            },
            {
              id: '3',
              description: 'Manufacturer’s or Supplier’s warranty certificate;',
            },
            {
              id: '4',
              description: 'Inspection Certificate issued by the nominated inspection agency, and the 	 Supplier’s factory inspection report.  ',
            },
            {
              id: '5',
              description: 'Certificate of Origin;',
            },
            {
              id: '6',
              description: 'Insurance policy; ',
            },
            {
              id: '7',
              description: 'Excise gate pass Octroi receipts wherever applicable duly sealed indicating payments   made; and ',
            },
            {
              id: '8',
              description: 'Any of the documents evidencing payment of statutory taxes.',
            },
            {
              id: '9',
              description: 'The above documents shall be received by the Purchaser before arrival of the Goods (except deliver note and where it is handed over to the user with all documents) and if not received, the vendor will be responsible for any consequent expenses.',
            },
          ],
        },
      ],
    },
    {
      id: 'F12',
      heading: 'F.12.Insurance',
      children: [
        {
          description: 'It is suggested that the goods supplied under the contract shall be fully insured in a freely convertible currency against loss or damage incidental to manufacture or acquisition, transportation, storage, and delivery up to user site. ',
        },
        {
          description: 'The insurance should be for replacement value from “Warehouse to warehouse (final destination)” on “All Risks” valid upto 3 months till completion of delivery, installation and commissioning.',
        },
      ],
    },
    {
      id: 'F13',
      heading: 'F.13. Transportation',
      description: 'Transport of the goods to the project site(s) shall be arranged by the vendor at his cost.',
    },
    {
      id: 'F14',
      heading: 'F.14. Hardware Installation',
      description: 'The vendor is responsible for all unpacking, assemblies, installations and connecting  to power supplies. The vendor will test all hardware operations and accomplish all adjustments necessary for successful and continuous operation of the items/equipment supplied at all installation sites. ',
    },
    {
      id: 'F15',
      heading: 'F.15. Incidental services',
      description: 'The Vendor may be required to provide any or all the following services, including additional services:',
      children: [
        {
          description: 'Performance or supervision or maintenance and/or repair of the supplied goods and services, for a period of time agreed by the parties, provided that this service shall not relieve the Vendor of any warranty obligations under this Contract, and',
        },
        {
          description: 'Training of Purchaser and/or its user organization personnel, at the Vendor’s site and / or on-site, in assembly, start-up, operation, maintenance and/or repair of the supplied goods and services.',
        },
        {
          description: 'Prices charged by the Vendor for the preceding incidental services, if any, should be indicated separately (if required), and same will  be mutually negotiated separately.   ',
        },
      ],
    },
    {
      id: 'F16',
      heading: 'F.16. Spare parts',
      children: [
        {
          description: 'The Vendor may be required to provide any or all of the following materials, notifications and information pertaining to spare parts manufactured or distributed by the Vendor.',
        },
        {
          description: 'Such spare parts as the Purchaser may elect to purchase from the Vendor, provided that this election shall not relieve the Vendor of any warranty obligations under the contract and ',
        },
        {
          description: 'In the event of termination of production of the spare parts, an advance notification to the Purchaser of  the pending  termination, in sufficient  time  to permit  the Purchaser to procure needed requirements and',
        },
        {
          description: 'The Vendor shall ensure availability of spares in stock at his nearest service centre for immediate delivery such spare parts as: (a) are necessary for a minimum of 5 years of operation after installation at the Purchaser’s sites (b) are necessary to comply with specifications.',
        },
      ],
    },
    {
      id: 'F17',
      heading: 'F.19. Warranty',
      children: [
        {
          description: 'The Vendor warrants that the goods and services supplied under the contract are new, unused, of the most recent or current models, and that they incorporate all recent improvements in design and materials unless provided otherwise in the contract. The Vendor further warrants that all goods and services supplied under this contract shall have no defect arising from design, materials or workmanship or from any act or omission of the Vendor, that may develop under normal use of the supplied goods  in the conditions prevailing in  the country of final destination.',
        },
        {
          description: 'The warranty period shall be as stated in bid document. The Vendor shall, in addition, comply with the performance guarantees specified under the contract. If, for reasons attributable to the Vendor, these guarantees are not attained in whole or in part, the Vendor shall, make such changes, modifications, and/or additions to the goods or any part thereof as may be necessary in order to attain the contractual guarantees specified in the contract at its own cost and expenses and to carry out further performance tests.',
        },
        {
          description: 'The equipment supplied should achieve required up time.',
        },
        {
          description: 'Purchaser/user shall promptly notify the Vendor in writing of any claims arising under this warranty.',
        },
        {
          description: 'Upon receipt of such notice, the Vendor shall, within the period specified in SCC and with all reasonable speed, repair or replace the defective goods and services or  parts thereof, without costs to the user.',
        },
        {
          description: 'If the Vendor, having been notified, fails to remedy the defect(s) within a reasonable period, the Purchaser/user may proceed to take such remedial action as may be necessary, at the vendor’s risk and expense and without prejudice to any other rights which the Purchaser /user may have against the Vendor under the contract. ',
        },
      ],
    },
    {
      id: 'F18',
      heading: 'F.20. Maintenance service',
      children: [
        {
          description: 'Free maintenance services including spares shall be provided by the vendor during the period of warranty. User, at its discretion may ask the vendor to provide maintenance services after warranty period, i.e.  Annual maintenance and repairs of the system at the rates indicated by bidder in its proposal and on being asked so, the vendor shall provide the same.',
        },
        {
          description: 'The cost of annual maintenance and repairs cost (after warranty period), which will include cost of spares replaced, shall be paid in equal quarterly installments at the end of each quarter.',
        },
        {
          description: 'The maximum response time for maintenance complaint from any of the destination (i.e. time required for supplier’s maintenance engineers to report to the installations after a request call/email is made or letter is written) shall not exceed the time period specified in SCC.',
        },
        {
          description: 'The vendor will accomplish preventive and breakdown maintenance activities to ensure that all hardware, and firmware execute without defect or interruption for at least required up time.',
        },
        {
          description: 'In case up time is less than the stipulated up time, penalty as indicated in the bid document shall be imposed on the vendor.',
        },
        {
          description: 'The amount of penalty if any, will be recovered at source from the performance guarantee during the warranty or from annual maintenance charges payable as the case may be.',
        },
      ],
    },
    {
      id: 'F19',
      heading: 'F.19. Payment',
      children: [
        {
          description: 'The vendor’s request(s) for payment shall be made to the Purchaser / Department in writing, accompanied by an invoice describing, as appropriate, the goods/service delivered/ performed.',
        },
        {
          description: 'Payments shall be made promptly by the Purchaser/User Department, but in no case later than   (30) days after submission of a valid invoice or claim by the vendor.',
        },
        {
          description: 'The currency of payment will be Indian rupees. ',
        },
        {
          description: 'Payment shall be made as indicated in Bid document.',
        },
        {
          description: 'The annual maintenance and repair cost as per separate agreement if any, shall be paid in equal quarterly installments at the end of each quarter as per the rates quoted and agreed. ',
        },
        {
          description: 'Payment will be made through Cheque/online.',
        },
      ],
    },
    {
      id: 'F20',
      heading: 'F.20. Prices',
      description: 'woPrices charged by the Vendor for goods delivered and services performed under the contract shall not vary from the prices quoted by the Vendor in its bid, with the exception if any price adjustments authorized in special conditions of contract or in the request for bid validity extension, as the case may be.rd',
    },
    {
      id: 'F21',
      heading: 'F.21. Change orders',
      description: 'Purchaser may, at any time, by written order given to the Vendor, make changes within the general scope of the Contract in any one  or more of the following:',
      children: [
        {
          description: 'Drawing, designs, or specifications, where Goods  to be   supplied  under  the  Contract are  to   be specifically manufactured for the Purchaser;',
        },
        {
          description: 'The method of shipment or packing;',
        },
        {
          description: 'The place of delivery and/or the services to be provided by the Vendor. ',
        },
        {
          description: 'If any such change causes an increase or decrease in the cost of, or the time required for, the vendor’s performance of any provisions under the contract, an equitable adjustment shall be made in the contract price or delivery schedule, or both, and the contract shall accordingly be amended.',
        },
        {
          description: 'Any claims by the Vendor for adjustment under this clause must be asserted within thirty (30) days from the date of  the Vendor’s receipt of the change order.',
        },
        {
          description: 'Quantity of items to be supplied.',
        },
      ],
    },
    {
      id: 'F22',
      heading: 'F.22. Contract amendment',
      description: 'No variation in or modification of the terms of the Contract shall be made except by written amendment signed by the parties.',
    },
    {
      id: 'F23',
      heading: 'F.23. Assignment',
      description: ' The Vendor shall not assign, in whole or in part, its obligations to perform under this Contract, except with the prior written consent from Purchaser.',
    },
    {
      id: 'F24',
      heading: 'F.24. Subcontracts',
      description: 'The Vendor shall notify the Purchaser in writing of all subcontracts awarded under this contract if not already specified in the bidder’s proposal. Such notification, in the original bid or later, shall not relieve the Vendor from any liability or obligation under the contract. Subcontract shall be only for bought-out items and sub-assemblies.',
    },
    {
      id: 'F25',
      heading: 'F.25. Delays in the supplier’s performance',
      children: [
        {
          description: 'Delivery of the Goods and performance of the services shall be made by the Vendor in accordance with the time schedule specified by the Purchaser in the bid document.',
        },
        {
          description: 'If at any time during performance of the Contract, the Vendor or its subcontractor(s) should encounter conditions impending timely delivery of the goods and performance of services, the Vendor shall promptly notify the Purchaser in writing of the fact of the delay, its likely duration and its cause(s). As soon as practicable after receipt of the vendor’s notice, Purchaser shall evaluate the situation and may at its discretion extend the Vendor’s time for performance, with or without liquidated damages.',
        },
        {
          description: 'A delay by the Vendor in the performance of its delivery obligations shall render the vendor liable to the imposition of appropriate liquidated damages, unless an extension of time is agreed upon by Purchaser without liquidated damages.',
        },
      ],
    },
    {
      id: 'F26',
      heading: 'F.26. Liquidated damages',
      description: 'If the Vendor fails to deliver any or all of the goods or perform the services within the time period(s) specified in the Contract, the Purchaser shall, without prejudice to its other remedies under the Contract, deduct from the Contract Price, as liquidated damages, a sum equivalent to, as per the terms indicated in the bid document, until actual delivery or performance, subject to maximum limit. Once the maximum limit of Liquidated Damages is reached, the Purchaser may consider termination of the contract.  ',
    },
    {
      id: 'F87',
      heading: 'F.27. Taxes and duties',
      children: [
        {
          description: 'The vendor shall be entirely responsible for all taxes, duties, license fee Octroi, road permits etc. incurred until delivery of the contracted Goods/services at the site of the user or as per the terms of tender document if specifically mentioned.',
        },
        {
          description: 'However any new taxes introduced by GoI / GoAP during validity of the contract it will be applicable to both parties (i.e. Supplier  /  Purchaser)',
        },
      ],
    },
    {
      id: 'F28',
      heading: 'F.28. Licensing considerations',
      description: 'The software mentioned in the Schedules of Requirement will be used throughout Andhra Pradesh or user’s sites even outside Andhra Pradesh.',
    },
    {
      id: 'F29',
      heading: 'F.29. Protection against damages- site conditions:',
      children: [
        {
          description: 'The items/equipments supplied shall not be prone to damage during power failures and trip outs. The normal voltage and frequency conditions available at site are as under:',
          level2Children: [
            {
              id: 'a.',
              description: 'Voltage 230 Volts',
            },
            {
              id: 'b.',
              description: 'Frequency 50Hz.',
            },
          ],
        },
        {
          description: 'However, locations may suffer from low voltage conditions with voltage dropping to as low as 160 volts and high voltage conditions with voltage going as high as 220 + 20% volts. Frequency could drop to 50Hz + 2%. The ambient temperature may vary from 10oC to 48oC. The relative humidity may range in between 5% to 95%.',
        },
        {
          description: 'The goods supplied under the contract should provide protection against damage under above conditions.',
        },
      ],
    },
    {
      id: 'F30',
      heading: 'F.30. Fail-safe procedure',
      children: [
        {
          description: ' The vendor should indicate in detail fail-safe procedure(s) for the following:',
          level2Children: [
            {
              description: 'Power failure',
            },
            {
              description: 'Voltage variation',
            },
            {
              description: 'Frequency variation',
            },
            {
              description: 'Temperature and humidity variations.',
            },
          ],
        },
      ],
    },
    {
      id: 'F31',
      heading: 'F.31. Training:',
      description: 'For each hardware and software component installed, for the devices, the Vendor may be required to train the designated Purchaser and User Department personnel to enable them to effectively operate the total system. The training, if required, shall be given, as specified in the SCC at the locations specified. The training schedule will be agreed to by both parties during the performance of the Contract.',
    },
    {
      id: 'F32',
      heading: 'F.32. Site Preparation and Installation:',
      description: 'The Purchaser is solely responsible for the construction of the installation sites except where it is specifically required under bid document. The bidder will designate to perform a site inspection to verify the appropriateness of the sites before the installation of every hardware related item.',
    },
    {
      id: 'F33',
      heading: 'F.33. Governing language',
      description: 'The contract shall be written in English or Telugu. All correspondence and other documents pertaining to the contract which are exchanged by the parties shall be written in same languages.',
    },
    {
      id: 'F34',
      heading: 'F.34. Applicable law',
      description: ' The contract shall be interpreted in accordance with appropriate Indian laws.',
    },
    {
      id: 'F35',
      heading: 'F.35. Notices',
      children: [
        {
          description: 'Any notice given by one party to the other pursuant to this contract shall be sent to the other party in writing or by telex, email, cable or facsimile and confirmed in writing to the other party’s address.',
        },
        {
          description: 'A notice shall be effective when delivered or tendered to other party whichever is earlier.',
        },
      ],
    },
    {
      id: 'F36',
      heading: 'F.36. Termination for default',
      children: [
        {
          description: 'The Purchaser, without prejudice to any other remedy for breach of Contract, by written notice of default sent to the Vendor, may terminate the Contract in whole or in part: ',
          level2Children: [
            {
              id: 'a.',
              description: 'if the Vendor fails to deliver any or all of the Goods/services within the time period(s) specified in the contract, or within any extension thereof granted by the Purchaser pursuant to Clause 25 of GCC or ',
            },
            {
              id: 'b.',
              description: 'if  the  Vendor  fails  to  perform  any   other obligation(s) under the Contract or ',
            },
            {
              id: 'c.',
              description: 'if the Vendor, in the judgment of the Purchaser has engaged in corrupt or fraudulent practices in competing for or in executing the Contract. ',
            },
          ],
        },
        {
          description: 'In the event the Purchaser terminated the contract in whole or in part, Purchaser may procure, upon such terms and in such manner as it deems appropriate, goods or services similar to those undelivered,  and  the Vendor shall be liable to the Purchaser   for   any excess costs   for   such similar goods or services. However, the Vendor shall continue performance of the contract to the extent not terminated.',
        },
      ],
    },
    {
      id: 'F37',
      heading: 'F.37. Force majeure',
      children: [
        {
          description: 'The Vendor shall not be liable for forfeiture of its performance security, liquidated damages, or termination for default if and to the extent that its delay in performance or other failure to perform its obligations under the Contract is the result of an event of Force Majeure. ',
        },
        {
          description: 'For purposes of this clause, “Force Majeure” means an event beyond the control of the Vendor and not involving the Supplier’s fault or negligence and not foreseeable. Such events may include, but are not restricted to, acts of the Purchaser in its sovereign capacity, wars or revolutions, fires, floods, epidemics, quarantine restrictions and freight embargoes. ',
        },
        {
          description: 'If a Force Majeure situation arises, the Vendor shall promptly notify the Purchaser in writing of such condition and the cause thereof. Unless otherwise directed by the Purchaser in writing, the Vendor shall continue to perform its obligations under the Contract as far as is reasonably practical, and shall seek all reasonable alternative means for performance not prevented by the Force Majeure event.',
        },
      ],
    },
    {
      id: 'F38',
      heading: 'F.38. Termination for insolvency',
      description: 'Purchaser, may at any time terminate the contract by giving 30 days written notice to the Vendor if the Vendor becomes bankrupt or otherwise insolvent. In this event, termination will be without compensation to the Vendor, provided that such termination will not prejudice or affect any right of action or remedy which has accrued or will accrue thereafter to the Purchaser.',
    },
    {
      id: 'F39',
      heading: 'F.39. Termination for convenience',
      children: [
        {
          description: '1.	Purchaser, may at any time by giving 30 days written notice to the Vendor, terminate the Contract, in whole or in part, for its convenience. The notice of termination shall specify that termination is for the Purchaser/Purchaser’s convenience, the extent to which performance of the Vendor under the Contract is terminated, and the date upon which such termination becomes effective.',
        },
        {
          description: '2.	The goods that are complete and ready for shipment within thirty (30) days after the vendor’s receipt of notice of termination shall be accepted by the Purchaser at the contract terms and prices.  For the remaining Goods, the Purchaser may elect to have any portion completed and delivered at the contract terms and prices at its discretion.',
        },
      ],
    },
    {
      id: 'F40',
      heading: 'F.40. Resolution of disputes',
      children: [
        {
          description: 'Purchaser and Vendor  shall  make  every effort  to resolve amicably by direct informal negotiation any disagreement or dispute arising between them under or in connection with  the contract. ',
        },
        {
          description: 'If, after thirty (30) days from the commencement of such informal negotiations, the Purchaser and the Vendor have been unable to resolve amicably a contract dispute, either party may require that the dispute be referred for resolution to the formal mechanisms specified here in. These mechanisms may include, but are not restricted to, conciliation mediated by a third party. ',
        },
        {
          description: 'The dispute resolution mechanism shall be  as follows:',
        },
        {
          description: 'In case of a dispute or difference arising between the Purchaser and the Vendor relating to any matter arising out of or connected with this agreement, such disputes or difference shall be settled in accordance with the Arbitration and Conciliation Act, of India, 1996.',
        },
      ],
    },
  ];
  const dataMapped = data.map((mapItem) => (
    <View id={mapItem.id} style={[margin([15, 0, 0, 0])]}>
      <View style={[margin([5, 0, 10, 0])]}>
        <Text style={[fontSize(14), { color: 'blue', marginTop: '4px' }]}>{mapItem.heading}</Text>
      </View>
      {
        mapItem.description && typeof mapItem.description === 'string' ? (
          <Text style={[fontSize(12)]}>
            {mapItem.description}
          </Text>
        ) : (
          mapItem.description
        )
      }

      <View style={[margin([0, 20, 0, 30])]}>
        {
        mapItem.children && mapItem.children.map((childItem, childIndex) => (
          <View key={`${mapItem.id}-${childIndex}`} style={pointsCss}>
            {
            childItem.description && (
              <Text style={[fontSize(12), { marginRight: '10px' }]}>
                {childItem.id ? childItem.id : childIndex + 1}
              </Text>
            )
          }
            <View>
              {
                childItem.description && typeof childItem.description === 'string' ? (
                  <Text style={[fontSize(12)]}>
                    {childItem.description}
                  </Text>

                ) : (
                  childItem.description
                )
              }
              <View style={margin([0, 15, 0, 15])}>
                {
                childItem && childItem.level2Children && childItem.level2Children.map((level2ChildItem, level2Index) => (
                  <View key={`${mapItem.id}-${childIndex}-${level2ChildItem.id}`} style={pointsCss}>
                    <Text style={[fontSize(12), { marginRight: '10px' }]}>
                      {level2ChildItem.id ? level2ChildItem.id : level2Index + 1}
                    </Text>
                    <View>
                      <Text style={[fontSize(12)]}>
                        {level2ChildItem.description}
                      </Text>
                      <View style={margin([0, 15, 0, 10])}>
                        {
                        level2ChildItem && level2ChildItem.level3Children && level2ChildItem.level3Children.map((level3ChildItem, level3Index) => (
                          <View key={`${mapItem.id}-${childIndex}-${level2ChildItem.id}-${level3ChildItem.id}`} style={pointsCss}>
                            <Text style={[fontSize(12), { marginRight: '10px' }]}>
                              {level3ChildItem.id}
                            </Text>
                            <Text style={[fontSize(12)]}>
                              {level3ChildItem.description}
                            </Text>
                          </View>

                        ))
                      }
                      </View>

                    </View>

                  </View>

                ))
              }
              </View>
            </View>
          </View>
        ))
      }
      </View>
    </View>

  ));
  return (
    <View>
      <View style={[padding([5, 0, 20, 0]), CommonStyles.itemsCenter]}>
        <Text style={[fontSize(16), { color: 'blue' }]}>Section E – Instructions to Bidders </Text>
      </View>
      {dataMapped}
    </View>

  );
}

export default SectionF;
