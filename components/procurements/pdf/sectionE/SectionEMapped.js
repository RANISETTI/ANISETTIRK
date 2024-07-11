import React from 'react';
import {
  Text, View, StyleSheet, Link, Font,
} from '@react-pdf/renderer';
import { CommonStyles } from '../FirstPage';

function SectionEMapped() {
  const {
    margin, padding, fontSize, weight, fontFamily, flexRow, pointsCss,
  } = CommonStyles;

  const data = [
    {
      id: 'E22',
      heading: 'E.22. Preparation of  Technical Bid:',
      description: 'It shall include the following information about the products offered and their technical features and specifications.',
      children: [
        {
          description: 'Technical Compliance Statement with Make, Model, Specifications mentioned in tender document and offered specifications in Form T-1.',
        },
        {
          description: 'Technical documents such as offered products’ Brochures and Data Sheets in support of confirmation to technical specifications etc.',
        },
        {
          description: 'Copies of OEM Certifications and Product Certifications if any. ',
        },
        {
          description: 'Detailed technical documentation, reference to various industry standards to which the products/services included in vendor’s offer conform, and literature concerning the proposed solution ',
        },
        {
          description: 'Check list in Form T-2',
        },
        {
          description: 'Signed Blank Form F1',
        },
        {
          description: 'Plan for in lab proof of concept, if required in tender call.',
        },
        {
          description: 'Plan for field demonstration if required in tender call',
        },
        {
          description: 'Detailed technical documentation, reference to various industry standards   to which the goods and services included in vendor’s offer conform, and other literature concerning the proposed solution. In particular, the vendors should identify areas in which their solution conforms to open standards and areas that are proprietary in nature. Justification about proprietary components in terms of functionality and performance should be given.',
        },
        {
          description: ' statement about appropriateness of the product design and solution plan for operating conditions in India, including physical, infrastructure and human factors.',
        },
        {
          description: '11.	In the case of a bidder offering to supply goods under the contract which the bidder did not manufacture or otherwise produce, the bidder has been duly authorized by the good’s manufacturer or producer to supply the goods in India.',
        },
        {
          description: 'A statement of the serviceable life of goods and services offered by the firm.  Available sources of maintenance and   technical support during the serviceable life.  Available sources of   spare parts, special tools, etc.  Necessary for the proper and continuing functioning of the goods and services, for the serviceable life.',
        },
        {
          description: 'Other information, if any required in the bid document.',
        },
      ],
    },
    {
      id: 'E23',
      heading: 'E.23. Preparation of Financial Bid:',
      description: 'The financial bid should provide cost calculations corresponding to each component of the project.',
      children: [
        {
          description: 'The financial bid is submitted through online Eprocurment Portal only.',
        },
        {
          description: 'The financial bid should provide cost calculations corresponding to unit price of each item of the respective schedules in Cost sheets. ',
        },
        {
          description: 'The bidder shall indicate the unit prices (where applicable) and the total bid price of the goods/services it proposes to supply under the contract.',
        },
        {
          description: 'The bidder shall indicate Basic Prices and taxes, duties etc. (if required) in the form prescribed.   ',
        },
        {
          description: 'Bidder’s separation of price components will be solely for the purpose of facilitating the comparison of bids by Purchaser and will not in any way limit the Purchaser’s right to contract on any of the terms offered.',
        },
        {
          description: 'Prices quoted by the bidder shall be fixed during the bidder’s performance of the contract and not subject to variation on any account unless otherwise specified in the tender call. A bid submitted with an adjustable price quotation will be treated as non-responsive and will be rejected. ',
        },
      ],
    },
    {
      id: 'E.24',
      heading: 'E.24. Procedure for Reverse Auction : ',
      description: 'Process of Electronic Reverse Auction on eProcurement portal of Government of Andhra Pradesh is as below:',
      children: [
        {
          description: 'Reverse auction will be conducted on the total price for the contract period. ',
        },
        {
          description: 'L1 bidder’s prices are the tender inviting authorities’ base prices for reverse auction. ',
        },
        {
          description: 'Only the qualified bidders in financial stage will be permitted to participate in the reverse auction.',
        },
        {
          description: 'The date and time will be intimated to the qualified bidders.',
        },
        {
          description: 'For the purpose of Reverse Auction, the minimum bid decrement will be as mentioned in Bid Data Sheet.',
        },
        {
          description: 'Bidders can modify the total schedule value based on the minimum bid decrement or the multiples thereof, to displace a standing lowest bid and become “L1”, and this will continue as an iterative process.',
        },
        {
          description: 'The reverse auction shall be conducted for 3 Hours for each schedule. ',
        },
        {
          description: 'After the completion of the online reverse auction, the Closing Price (Final L1 Price) and the successful bidder shall be finalized. The closing price will be compared with prevailing market prices before issuing the NoA.',
        },
        {
          description: 'Within 1 Hour after conclusion of reverse auction, the successful bidder should upload the breakup of item wise cost components on eProcurement Portal.',
        },
      ],
    },
    {
      id: 'E.25',
      heading: 'E.25. Bid evaluation procedure:',
      children: [
        {
          description: 'Bids would be evaluated schedule wise.',
        },
        {
          description: 'Lowest quoted value will be arrived on overall schedule value.',
        },
        {
          description: 'Technical bid documentation should be in the prescribed format. If a vendor has any comment to offer about the procedural aspects of this tender, it should be intimated to APTS during the pre-bid meeting.',
        },
        {
          description: 'In case, the schedule or procedure of tender processing is revised, the same shall be communicated by telephone, fax, courier or e-mail as the case may be to all the vendors who have paid the tender document fee.',
        },
        {
          description: 'Bids will be in three parts (pre-qualification, technical and financial) or two parts (Pre-qualification &Technical bid together and financial) or composite bid (technical and financial bid together) as indicated in the tender call. For three part bids there will be three bid opening events, in two part bid there will be two bid opening events and in case of composite bids there will be only one bid opening event. ',
        },
        {
          description: 'Following guidelines will generally be followed by Purchaser’s officers at each such event. However, Purchaser may deviate from these in specific circumstances if it feels that such deviation are unavoidable, or will improve speed of processing and consequent project execution.',
        },
        {
          description: 'The bid opening and evaluation process will be sequential in nature. Means that   bidder must qualify a particular stage to be eligible for next stage. Immediately after the closing time, the Purchaser’s contact person shall open the Pre-qualification bids and list them for further evaluation. ',
        },
        {
          description: 'If it is a manual tender- the Technical and financial bid covers shall be listed and put into a bag to be sealed according to Purchaser’s procedure. The sealed bag of technical and financial bids shall be in custody of a designated officer for opening after evaluation of Pre-qualification bids. Thereafter, Technical bids of qualified bidders will be opened, keeping financial bid in sealed bag. Finally, financial bids of those bidders will be opened who are short listed in technical evaluation.',
        },
        {
          description: 'In case of composite bid – technical and financial bids combined together, first technical evaluation will be done followed by financial evaluation of only those bids, which have qualified in technical evaluation. ',
        },
        {
          description: 'Any participating vendor may depute a representative to witness these processes. ',
        },
        {
          description: 'The standard procedure, described here will stand appropriately modified, in view of special procedures of bid evaluation as mentioned in tender call or  elsewhere in this bid document or Purchaser  may deviate from these in specific circumstances if it feels that such deviation are unavoidable, or will improve speed of processing and consequent project execution. ',
        },
      ],
    },
    {
      id: 'E.26',
      heading: 'E.26. Opening of bids:',
      children: [
        {
          description: 'Bids will be opened on the e-Procurement website at the scheduled time & date as specified. ',
        },
        {
          description: 'Purchaser’s contact person shall open the pre-qualification bid, after the bid closing time and list them for further evaluation. After evaluation of Pre-Qualification bids, the technical bids of only those bidders who qualify in Pre-qualification will be opened. Similarly, the financial bids of only those bidders who qualify in technical evaluation will be opened. ',
        },
        {
          description: 'The bidders names, bid modifications or withdrawals, discounts, and the presence or absence of requisite bid security and such other details as the APTS officer at his/her discretion, may consider appropriate, will be announced at the opening.',
        },
        {
          description: 'No bid shall be rejected at bid opening, except for late bids, which shall be returned unopened (in case of physical submission).',
        },
        {
          description: 'Bids that are not opened and read out at bid opening shall not be considered further for evaluation, irrespective of the circumstances. Withdrawn bids will be returned unopened to the bidders (in case of physical submission).',
        },
        {
          description: 'The bids submitted by telex/telegram/fax/e-mail etc. shall not be considered. No correspondence will be entertained on this matter.',
        },
        {
          description: 'The Purchaser shall not be responsible for any postal delay or non-receipt/ non- delivery of the documents. No further correspondence on the subject will be entertained.',
        },
      ],
    },
    {
      id: 'E.27',
      heading: 'E.27. Preliminary examination of Bids',
      children: [
        {
          description: 'Preliminary scrutiny will be made to determine whether they are complete, whether any computational errors have been made, whether required sureties have been furnished, whether the documents have been properly signed, and whether the bids are generally in order.',
        },
        {
          description: 'Prior to the detailed evaluation, APTS will determine the substantial responsiveness of each bid to the bidding documents. For purposes of these clauses, a substantially responsive bid is one which conforms to all the terms and conditions of the bidding documents without material deviations. ',
        },
        {
          description: 'If a bid is not substantially responsive, it will be rejected by the APTS and may not subsequently be made responsive by the bidder by correction of the nonconformity.',
        },
        {
          description: 'Initial Bid scrutiny will be held and incomplete details as given below will be treated as non- responsive. If Proposals;',
          level2Children: [
            {
              id: 'a.',
              description: 'Are not submitted in as specified in the RFP document ',
            },
            {
              id: 'b.',
              description: 'Received without the Letter of Authorization (Power of Attorney)',
            },
            {
              id: 'c.',
              description: 'Are found with suppression of details ',
            },
            {
              id: 'd.',
              description: 'With incomplete information, subjective, conditional offers and partial offers submitted',
            },
            {
              id: 'e.',
              description: 'Submitted without the documents requested in the checklist',
            },
            {
              id: 'f.',
              description: 'Have non-compliance of any of the clauses stipulated in the RFP',
            },
            {
              id: 'g.',
              description: 'With lesser validity period',
            },
          ],
        },
        {
          description: 'All responsive Bids will be considered for further processing as below.',
        },
        {
          description: '< Purchaser> will prepare a list of responsive Bidders, who comply with all the Terms and Conditions of the Tender. All eligible bids will be considered for further evaluation by a Committee according to the Evaluation process define in this RFP document. The decision of the Committee will be final in this regard.',
        },
        {
          description: 'Arithmetical errors will be rectified on the following basis. If there is a discrepancy between the unit price and the total price that is obtained by multiplying the unit price and quantity, the unit price shall prevail, and the total price shall be corrected. If the vendor does not accept the correction of the errors, its bid will be rejected, and its bid security may be forfeited. If there is a discrepancy between words and figures, the amount in words will prevail.',
        },
        {
          description: 'Purchaser may waive any minor informality, nonconformity or irregularity in a bid which does not constitute a material deviation, provided such waiver does not prejudice or affect the relative ranking of any bidder.',
        },
      ],
    },
    {
      id: 'E.28',
      heading: 'E.28.  EMD Validity:',
      children: [
        {
          description: 'The EMD will be scrutinized first for the amount and validity period. The bids submitted with required EMD amount and validity only be considered for the evaluation. The bids submitted with insufficient EMD amount/validity will be treated as disqualified bids and those bids will not be considered for further evaluation.  ',
        },
        {
          description: 'The EMD should be submitted in the form of BG or through online payment only.',
        },
        {
          description: 'Scanned copy of EMD document should be uploaded on e-Procurement website. The Original EMD should be submitted to APTS before 5 pm of next working day after bid closing day or as specified in Bid Data Sheet.',
        },
      ],
    },
    {
      id: 'E.29',
      heading: 'E.29. Bid validity:',
      description: 'The offer submitted by the Bidders should be valid for minimum period of days as mentioned in Bid data Sheet from the date of submission of bid.',
    },
    {
      id: 'E.30',
      heading: 'E.30. Seeking Clarifications on received bids',
      children: [
        {
          description: 'During evaluation of the bids at any stage, Purchaser may, at its discretion, ask the bidder for clarification of its bid.',
        },
        {
          description: 'Any Queries / representations should be submitted within 2 days from the date of publishing of the tender. APTS reserves the right to consider or not to consider the Queries received from the bidders.',
        },
      ],
    },
    {
      id: 'E.31',
      heading: 'E.31. Evaluation of Pre-qualification bids:',
      children: [
        {
          description: 'The Pre-qualification bid documentation shall be evaluated in two sub-steps.',
          level2Children: [
            {
              id: 'a)',
              description: 'Firstly, the documentation furnished by the vendor shall be examined prima facie to see if the technical skill base and financial capacity and other vendor attributes claimed therein are consistent with the needs of this project. ',
            },
            {
              id: 'a)',
              description: 'In the second step, APTS may ask vendor(s) for additional information, visit to vendors site and/or arrange discussions with their professional, technical faculties to verify claims made in Pre-qualification bid documentation. ',
            },
          ],
        },
      ],
    },
    {
      id: 'E.32',
      heading: 'E.32. Evaluation of Technical bids:',
      children: [
        {
          description: 'Technical bid documentation shall be evaluated in two sub-steps.',
          level2Children: [
            {
              id: 'a)',
              description: 'Firstly, the documentation furnished by the vendor shall be examined prima facie to see if the product /services offered, technical skill base and financial capacity and other vendor attributes claimed therein are consistent with the needs of this project.',
            },
            {
              id: 'b)',
              description: 'In the second step, APTS may ask vendor(s) for additional information, visit to vendors site and/or arrange discussions with their professional, technical faculties to verify   claims made in technical bid documentation.',
            },
            {
              id: 'c)',
              description: 'Bidders who meet the pre-qualifications/eligibility requirements would be considered as qualified to move to the next stage of Technical and Financial evaluations.',
            },
            {
              id: 'd)',
              description: 'The Product offered should meet all the technical and functional specifications given in the section D “Scope of Work”. Non-compliance to any of the technical and functional specification will attract rejection of the proposal.',
            },
            {
              id: 'e)',
              description: 'Response except ‘Y’ or ‘N’ is not acceptable. If any Bidder provides response other than Y’ or ‘N’ the same will be treated as Not Available i.e. N.',
            },
            {
              id: 'f)',
              description: 'The lab proof of concept on demand may be organized either in APTS or in the vendor’s lab by mutual discussion. In case it is organized in APTS lab, APTS would make available generic hardware for this purpose. Application specific hardware and software will have to be brought in by the vendor.',
            },
            {
              id: 'g)',
              description: 'APTS will identify a part or segment of the proposed project site. The concerned bidder, on demand, should be able to demonstrate functional requirements as described in the specifications.',
            },
          ],
        },
      ],
    },
    {
      id: 'E.31',
      heading: 'E.31. Evaluation of Pre-qualification bids:',
      children: [
        {
          description: 'Financial bids of those vendors who satisfy all phases of the pre-qualification and technical bid will only be opened. All other financial bids will be ignored.',
        },
        {
          description: 'Purchaser will assess the nature of financial offers and may pursue any or all of the options mentioned under financial bid.',
        },
        {
          description: 'Purchaser may at its discretion discuss with vendor(s) available at this stage to clarify contents of financial offer.  ',
        },
        {
          description: 'Bids will be evaluated item wise in each schedule.',
        },
        {
          description: 'Evaluation of Financial Bids will be including taxes.',
        },
        {
          description: 'Evaluation of financial bids will exclude and not take into account any offer not asked for or not relevant to the present requirements of user.',
        },
        {
          description: 'Evaluation of financial bid will take into account, in addition to the basic bid price, one or more of the following factors',
          level2Children: [
            {
              id: 'a)',
              description: 'The projected costs for the entire contract period;',
            },
            {
              id: 'b)',
              description: 'Past track record of bidder in supply/ services and',
            },
            {
              id: 'c)',
              description: 'Any other specific criteria indicated in the tender call and/or in the specifications.',
            },
          ],
        },
      ],
    },
    {
      id: 'E.34',
      heading: 'E.34. Performance and productivity of the equipment',
      description: 'Bidders shall state the guaranteed performance or efficiency in response to the specifications.  ',
    },
    {
      id: 'E.35',
      heading: 'E.35. Contacting Purchaser ',
      children: [
        {
          description: 'Bidder shall not approach Purchaser’s officers outside of office hours and / or outside Purchase office premises, from the time of the tender call notice to the time the contract is awarded.',
        },
        {
          description: 'Any effort by a bidder to influence Purchaser officers in the decisions on bid evaluation, bid comparison or contract award may result in rejection of the bidder’s offer and bidder may also be marked as ineligible for future bids. If the bidder wishes to bring additional information to the notice of the Purchaser, it should do so in writing.',
        },
      ],
    },
    {
      id: 'E.36',
      heading: 'E.36.  Purchaser’s  right to vary quantities at time of award',
      children: [
        {
          description: 'Purchaser reserves the right at the time of award to increase or decrease the quantity, as indicated in tender call, from the quantity of goods and services originally specified in the specification without any change in unit price or other terms and conditions.',
        },
        {
          description: 'Purchaser reserves the right to place the repeat orders at the quoted price, in addition to the Quantity for which bid has been called for. However, this condition will not create any right to the bidder to demand such repeat order. During the validity of the contract period thereof, the bidder should be ready to supply any no. of devices as requested.',
        },
      ],
    },
    {
      id: 'E.37',
      heading: 'E.37. Purchaser ’ right to accept any bid and to reject any or all bids.',
      description: 'Purchaser reserves the right to accept or reject any proposal, and to annul the tendering process / Public procurement process and reject all proposals at any time prior to award of contract, without thereby incurring any liability to the affected Bidder or Bidders or any obligation to inform the affected Bidder or Bidders of the grounds for such decision.',
    },
    {
      id: 'E.31',
      heading: 'E.38. Negotiation',
      description: 'APTS reserves its right to negotiate with the lowest quoted bidder including technical specifications.',
    },
    {
      id: 'E.39',
      heading: 'E.39. Award Criterion:',
      description: 'Final choice of firm to execute the project shall be made on the basis of conformity to technical specifications, appropriateness of the product offered, capability of bidder to execute and service the project and appropriateness of financial offer from the point of view of cost-effectiveness over the entire maintenance period for the product/services.',
    },
    {
      id: 'E.40',
      heading: 'E.40. Order Placing Authority',
      children: [
        {
          description: '1.	PURCHASER  reserves the right not to place any supply / purchase order whatsoever, irrespective of finalization of the L1 bidder.',
        },
        {
          description: '2.	PURCHASER  reserves the right to place purchase orders/ contracts as per RFP. The RFP / contract does not confer any right whatsoever on the bidder/ successful Bidder in reverse auction for demanding PURCHASER /any department to place order on them.',
        },
      ],
    },
    {
      id: 'E.41',
      heading: 'E.41. Notification of award',
      children: [
        {
          description: 'Prior to expiration of the period of bid validity, Purchaser will notify the successful bidder in writing, that its bid has been accepted.',
        },
        {
          description: 'In case the tendering process has not been completed within the stipulated period, Purchaser, may like to request the Bidders to extend the validity period of the bid.',
        },
        {
          description: 'Upon the successful bidder’s furnishing of performance security, Purchaser  will promptly notify each unsuccessful bidder and will discharge its bid security. ',
        },
        {
          description: 'For each electronic product proposed to be procured, among all technically qualified bids, the lowest quoted price will be termed as L1 and the rest of the bids shall be ranked in ascending order of price quoted, as L2, L3, L4 and so on.',
        },
        {
          description: 'If L1 bid is of an eligible domestic manufacturer, the said bidder will be awarded full value of the order.',
        },
        {
          description: 'If L1 bid is not from an eligible domestic manufacturer, the value of the order awarded to L1 bidder will be the balance of procurement value after reserving specified percentage of the total value of the order for the eligible domestic manufacturer.',
        },
        {
          description: 'Thereafter, the lowest bidder among the eligible domestic manufacturers, whether L2, L3, L4 or higher, will be invited to match the L1 bid in order to secure the procurement value of the order earmarked for the eligible domestic manufacturer.',
        },
        {
          description: 'In case first eligible bidder (i.e. domestic manufacturer) fails to match L1 bid, the bidder (i.e. domestic manufacturer) with next higher bid will be invited to match L1 bid and so on. However, the procuring agency may choose to divide the order amongst more than one successful bidder as long as all such bidders match L1 and the criteria for allocating the tender quantity amongst a number of successful bidders is clearly articulated in the tender document itself.',
        },
        {
          description: 'In case all eligible domestic manufacturers fail to match the L1 bid, the actual bidder holding L1 bid will secure the order for full procurement value.',
        },
        {
          description: 'Only those domestic manufacturers whose bids are within 20% of the L1bid would be allowed an opportunity to match L1 bid.',
        },
        {
          description: 'Upon the successful Bidder&#39;s furnishing of Performance Bank Guarantee, Purchaser will notify each unsuccessful Bidder and return their EMD.',
        },
      ],
    },
    {
      id: 'E.42',
      heading: 'E.42. Performance security',
      children: [
        {
          description: 'On receipt of notification of award from the Purchaser, the successful bidder shall furnish the performance security in accordance with the conditions of contract, in the performance security form provided in the bidding documents or in another form acceptable to the Purchaser. ',
        },
        {
          description: 'The Selected Bidder shall provide the Performance Bank Guarantee, within  the period mentioned Bid Data Sheet from the date of Notification of award, for a value equivalent to <as mentioned in Bid data Sheet> of the total contract cost . The Performance Guarantee should be valid for a period of <as mentioned in Bid Data Sheet>.',
        },
        {
          description: 'The Performance Guarantee shall be kept valid till completion of the project and Warranty period.',
        },
        {
          description: 'The Performance Guarantee shall contain a claim period of 60 days from the last date of validity.',
        },
        {
          description: 'The selected Bidder shall be responsible for extending the validity date and claim period of the Performance Guarantee as and when it is due on account of non-completion of the project and Warranty period.',
        },
        {
          description: 'In case the selected Bidder fails to submit performance guarantee within the time stipulated, the Purchaser at its discretion may cancel the order placed on the selected Bidder without giving any notice.',
        },
        {
          description: 'Purchaser shall invoke the performance guarantee in case the selected Vendor fails to discharge their contractual obligations during the period or Purchaser incurs any loss due to Vendor’s negligence in carrying out the project implementation as per the agreed terms & conditions.',
        },
      ],
    },
    {
      id: 'E.43',
      heading: 'E.43. Signing of contract',
      children: [
        {
          description: 'At the same time as the Purchaser  notifies the successful bidder that its bid has been accepted, the Purchaser  will send the bidder the Contract Form provided in the bidding documents, incorporating all agreements between the parties.',
        },
        {
          description: 'On receipt of the Contract Form, the successful bidder shall sign and date the contract and return it to the Purchaser.',
        },
        {
          description: 'Failure of the successful bidder to sign the contract, proposed in this document and as may be modified, elaborated or amended through the award letter, shall constitute sufficient grounds for the annulment of the award and forfeiture of the bid security, in which event the Purchaser may make the award to another bidder or call for new bids.',
        },
      ],
    },
    {
      id: 'E.44',
      heading: 'E.44. Corrupt, fraudulent and unethical practices',
      children: [
        {
          description: 'The Bidders and their respective officers, employees, agents and advisers shall observe the highest standard of ethics during the Selection Process. Notwithstanding anything to the contrary contained in this RFP, the Purchaser shall reject a Proposal without being liable in any manner whatsoever to the Bidder, if it determines that the Bidder has, directly or indirectly or through an agent, engaged in corrupt practice, fraudulent practice, coercive practice, undesirable practice or restrictive practice (collectively the “Prohibited Practices”) in the Selection Process. In such an event, the Purchaser shall, without prejudice to its any other rights or remedies, forfeit and appropriate the Bid Security or Performance Security, as the case may be, as mutually agreed genuine pre-estimated compensation and damages payable to the Authority for, inter alia, time, cost and effort of the Authority, in regard to the RFP, including consideration and evaluation of such Bidder’s Proposal.',
        },
        {
          description: 'Without prejudice to the rights of the Purchaser under Clause above and the rights and remedies which the Purchaser may have under the LOI or the Agreement, if an Bidder or Systems Implementation Agency, as the case may be, is found by the Authority to have directly or indirectly or through an agent, engaged or indulged in any corrupt practice, fraudulent practice, coercive practice, undesirable practice or restrictive practice during the Selection Process, or after the issue of the LOI or the execution of the Agreement, such Bidder or Hardware Supplier shall not be eligible to participate in any tender or RFP issued by the Purchaser during a period of 2 (two) years from the date such Bidder or Hardware Supplier, as the case may be, is found by the Purchaser to have directly or through an agent, engaged or indulged in any corrupt practice, fraudulent practice, coercive practice, undesirable practice or restrictive practice, as the case may be.',
        },
        {
          description: 'Purchaser will reject a proposal for award and also may debar the bidder for future tenders by the Purchaser , if it determines that the bidder has engaged in corrupt, fraudulent or unethical practices in competing for, or in executing a contract.',
        },
        {
          description: 'For the purposes of this Section, the following terms shall have the meaning hereinafter respectively assigned to them:',
          level2Children: [
            {
              id: 'a.',
              description: '“corrupt practice” means',
              level3Children: [
                {
                  id: 'i.',
                  description: 'the offering, giving, receiving, or soliciting, directly or indirectly, of anything of value to influence the action of any person connected with the Selection Process (for avoidance of doubt, offering of employment to or employing or engaging in any manner whatsoever, directly or indirectly, any official of the Purchaser who is or has been associated in any manner, directly or indirectly with the Selection Process or the LOI or has dealt with matters concerning the Agreement or arising there from, before or after the execution thereof, at any time prior to the expiry of one year from the date such official resigns or retires from or otherwise ceases to be in the service of the Purchaser, shall be deemed to constitute influencing the actions of a person connected with the Selection Process); or',
                },
                {
                  id: 'ii,',
                  description: 'save as provided herein, engaging in any manner whatsoever, whether during the Selection Process or after the issue of the LOA or after the execution of the Agreement, as the case may be, any person in respect of any matter relating to the Project or the LOA or the Agreement, who at any time has been or is a legal, financial or technical consultant/ adviser of the Purchaser in relation to any matter concerning the Project;',
                },
              ],
            },
            {
              id: 'b.',
              description: '“fraudulent practice” means a misrepresentation of facts in order to influence a procurement process or the execution of a contract to detriment of the purchaser, and includes collusive practice among Bidders (prior to or after bid submission) designed to establish bid prices at artificial non-competitive levels and to deprive the Purchaser of the benefits of free and open competition:;',
            },
            {
              id: 'c.',
              description: '“coercive practice” means impairing or harming or threatening to impair or harm, directly or indirectly, any persons or property to influence any person’s participation or action in the Selection Process;',
            },
            {
              id: 'd.',
              description: '“undesirable practice” means',
              level3Children: [
                {
                  id: 'i.',
                  description: 'establishing contact with any person connected with or employed or engaged by Purchaser with the objective of canvassing, lobbying or in any manner influencing or attempting to influence the Selection Process; or',
                },
                {
                  id: 'ii,',
                  description: 'having a Conflict of Interest; and',
                },
              ],
            },
            {
              id: 'e.',
              description: '“restrictive practice” means forming a cartel or arriving at any understanding or arrangement among Bidders with the objective of restricting or manipulating a full and fair competition in the Selection Process.',
            },
            {
              id: 'f.',
              description: '“Unethical practice” means any activity on the part of bidder, which try to circumvent tender process in any way. Unsolicited offering of discounts, reduction in financial bid amount, upward revision of quality of goods etc. after opening of first bid will be treated as unethical practice.',
            },
          ],
        },
      ],
    },
    {
      id: 'E.45',
      heading: 'E.45. Conflict of Interest',
      children: [
        {
          description: (
            <View>
              <Text style={fontSize(12)}>
                The Vendor shall disclose to Purchaser in writing, all actual and potential conflicts of interest that exist, arise or may arise (either for the Vendor the Bidder’s team) in the course of performing the Service(s) as soon as practical after it becomes aware of that conflict.
              </Text>
              <Text style={[fontSize(12), { color: 'red' }]}>
                [In normal course, the Hardware supplying agency should not be restrained to provide hardware for the same project and its related project, as long as they do not take up services which directly or perceptibly lead to a situation which would lead to a conflict of interest. For e.g. a hardware supplier should not take up work of Project Management Consultancy, as it is a perceptible conflict of interest]
              </Text>
            </View>
          ),
        },
      ],
    },
  ];
  return (
    data.map((mapItem) => (
      <View id={mapItem.id} style={[margin([15, 0, 0, 0])]}>
        <View style={[margin([5, 0, 10, 0])]}>
          <Text style={[fontSize(14), { color: 'blue', marginTop: '4px' }]}>{mapItem.heading}</Text>
        </View>
        {
          mapItem.description && (
          <Text style={[fontSize(12)]}>
            {mapItem.description}
          </Text>
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
                        {level2ChildItem.id}
                        .
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
                                .
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

    ))
  );
}

export default SectionEMapped;
