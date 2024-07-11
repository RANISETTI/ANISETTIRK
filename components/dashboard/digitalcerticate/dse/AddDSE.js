import {
  faCheck,
  faChevronLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import getServices from "../../../../services/dashboard/conference";
import {
  addDesService,
  approveDSEservice,
  getDSEbyId,
} from "../../../../services/dashboard/digitalcertificates/dse";
import Page404 from "../../../common/customerrorpages/Page404";
import {
  PaymentModal,
  onScriptPaytmLoad,
} from "../../../common/modals/paymentModal";
import moment from "moment";
import {
  paytmInitiatePayment,
  paytmVerifyPayment,
} from "../../../../pages/api/paytm";
import MyModal from "../../../common/modals/Modal";

const tenureOptions = [
  {
    id: 1,
    value: "1",
    name: "1 Year",
  },
  {
    id: 2,
    value: "2",
    name: "2 Year",
  },
];

const applicationTypes = [
  {
    id: 1,
    value: "NEW",
    name: "New",
  },
  {
    id: 2,
    value: "RENEWAL",
    name: "Renewal",
  },
];

const paymentTypes = [
  {
    id: 1,
    value: "DD",
    name: "DD",
  },
  {
    id: 2,
    value: "ONLINE",
    name: "Online",
  },
];

export default function AddDSE() {
  const {
    accessToken,
    userDetails: { type },
  } = useSelector((state) => state.user);

  const [departmentData, setDepartmentData] = useState([]);
  const [headOfDepartmentData, setHeadOfDepartmentData] = useState([]);
  const [autonomousOrganizationsData, setAutonomousOrganizationsData] =
    useState([]);
  const [isApplicationAdded, setIsApplicationIsAdded] = useState(false);
  const [errors, setErrors] = useState();
  const [isSameAsApplicant, setIsSameAsApplicant] = useState(false);

  const [defaultDepartment, setDefaultDepartment] = useState("");
  const [defaultHodDepartment, setDefaultHodDepartment] = useState("");
  const [defaultAutonomousDepartment, setDefaultAutonomousDepartment] =
    useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [dscTypes, setDsctypes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [applicant, setApplicant] = useState({
    applicant_name: "",
    applicant_pan: "",
    applicant_mobile_number: "",
    applicant_email: "",
    applicant_dob: "",
    applicant_office_address: "",
    applicant_postcode: "",
    hod_name: "",
    hod_designation: "",
    hod_pan: "",
    hod_mobile_number: "",
    hod_email: "",
    hod_office_address: "",
    hod_postcode: "",
    hod_department: "",
    hod_pan_photo: undefined,
    hod_photo: undefined,
    hod_id_card: undefined,
    autonomous_organization: "",
    department: "",
    request_letter: undefined,
    authorization_letter: undefined,
    applicant_id_card: undefined,
    applicant_pan_photo: undefined,
    applicant_photo: undefined,
    authorized_employee_card: undefined,
    authorized_pan_proof: undefined,
    application_type: undefined,
    type: undefined,
    frequency: "",
    dd_date: "",
    dd_no: "",
    price: 0,
    branch: "",
    bank: "",
    payment_type: "dd",
    payment_type: undefined,
    payment_type: "dd",
  });

  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [applicantErrors, setApplicantErrors] = useState({});

  const [modalShow, setModalShow] = useState(false);
  const [verifiedPaymentDetails, setVerifiedPaymentDetails] = useState({});

  const { handleSubmit } = useForm();

  const router = useRouter();

  const {
    query: { id: applicationId },
  } = router;

  console.log("application iedddd", applicationId);
  const getDSEDetails = (dseId) => {
    setIsLoading(true);
    getDSEbyId(accessToken, dseId)
      .then(({ data }) => {
        console.log("data from dse by id", data, dseId);
        if (data) {
          setApplicant(data);
          setIsApproved(data.is_approved);
          const {
            department,
            department: { type },
          } = data;
          if (type === "SD") {
            setDefaultDepartment(deparment);
          } else if (type === "HOD") {
            setDefaultHodDepartment(department);
            const { parent } = department;
            setDefaultDepartment(parent);
          } else if (type === "AO") {
            setDefaultAutonomousDepartment(department);
            const {
              parent,
              parent: { type },
            } = department;
            if (type === "SD") {
              setDefaultDepartment(parent);
            } else if (type === "HOD") {
              setDefaultHodDepartment(parent);
              const { parent: departmentParent } = parent;
              setDefaultDepartment(departmentParent);
            }
          }
        }
      })
      .finally(() => setIsLoading(false));
  };

  const getDepartments = (search) => {
    getServices(
      accessToken,
      `/departments/?search=${search || ""}&type=SD`
    ).then(({ data, errors }) => {
      if (data) {
        const { results } = data;
        setDepartmentData(results);
      }
    });
  };

  const getHeadOfDepartments = (id, search) => {
    getServices(
      accessToken,
      `/departments/?search=${search || ""}&type=HOD&parent=${id}`
    ).then(({ data, errors }) => {
      if (data) {
        const { results } = data;
        setHeadOfDepartmentData(results);
      }
    });
  };

  const getAutonomousOrganizations = (departmentId, search) => {
    getServices(
      accessToken,
      `/departments/?search=${search || ""}&type=AO&parent=${departmentId}`
    ).then(({ data, errors }) => {
      if (data) {
        const { results } = data;
        setAutonomousOrganizationsData(results);
      }
    });
  };

  const getDscTypes = () => {
    setIsLoading(true);
    getServices(accessToken, "/dsc-types/").then(({ data, errors }) => {
      if (data) {
        setDsctypes(data);
        setIsLoading(false);
      }
    });
  };

  const getPrices = (type, dsctype, tenure) => {
    getServices(
      "",
      `/dsc-type/prices/?type=${type || ""}&dsc_type=${
        dsctype || ""
      }&frequency=${tenure || ""}`
    ).then(({ data, errors }) => {
      if (data) {
        setApplicant({ ...applicant, price: data[0].price });
      }
    });
  };

  useEffect(() => {
    if (applicant.application_type && applicant.type && applicant.frequency) {
      getPrices(
        applicant.application_type,
        applicant.type,
        applicant.frequency
      );
    } else {
      setApplicant({ ...applicant, price: "" });
    }
  }, [applicant.type, applicant.application_type, applicant.frequency]);

  useEffect(() => {
    getDscTypes();
    getDepartments();
    if (applicationId) {
      getDSEDetails(applicationId);
      setIsSameAsApplicant(false);
    }
  }, []);
  useEffect(() => {
    (async () => {
      let { ORDER_ID: orderid } = router.query;

      if (orderid) {
        // console.log(" url check orderId found ", urlCheck.substr(-17));
        // let orderid = urlCheck.substr(-17);
        const responseVerifyPayment = await paytmVerifyPayment(
          orderid,
          "DSE",
          applicationId
        ).then((res) => res.json());
        console.log("verifyPayment", responseVerifyPayment);
        if (
          responseVerifyPayment.body.resultInfo.resultStatus === "TXN_SUCCESS"
        ) {
          console.log("trasaction is success popup");
          setVerifiedPaymentDetails(responseVerifyPayment);
          setModalShow(true);
        } else {
          setVerifiedPaymentDetails(responseVerifyPayment);
          setModalShow(true);
        }
      }

      const detailsStoredinLocalStorage = JSON.parse(
        localStorage.getItem("details")
      );

      console.log("orderId", orderid, detailsStoredinLocalStorage);
      if (detailsStoredinLocalStorage) {
        setApplicant({
          applicant_name: detailsStoredinLocalStorage.applicant_name,
          applicant_pan: detailsStoredinLocalStorage.applicant_pan,
          applicant_mobile_number:
            detailsStoredinLocalStorage.applicant_mobile_number,
          applicant_email: detailsStoredinLocalStorage.applicant_email,
          applicant_dob: detailsStoredinLocalStorage.applicant_dob,
          applicant_office_address:
            detailsStoredinLocalStorage.applicant_office_address,
          applicant_postcode: detailsStoredinLocalStorage.applicant_postcode,
          hod_name: detailsStoredinLocalStorage.hod_name,
          hod_designation: detailsStoredinLocalStorage.hod_designation,
          hod_pan: detailsStoredinLocalStorage.hod_pan,
          hod_mobile_number: detailsStoredinLocalStorage.hod_mobile_number,
          hod_email: detailsStoredinLocalStorage.hod_email,
          hod_office_address: detailsStoredinLocalStorage.hod_office_address,
          hod_postcode: detailsStoredinLocalStorage.hod_postcode,
          hod_department: detailsStoredinLocalStorage.hod_department,
          department: detailsStoredinLocalStorage.deparment,
          type: detailsStoredinLocalStorage.type,
          payment_type: detailsStoredinLocalStorage.payment_type,
          frequency: detailsStoredinLocalStorage.frequency,
          application_type: detailsStoredinLocalStorage.application_type,
        });
        localStorage.removeItem("details");
      }

      // let urlCheck = `${window.location.href}`;
      // console.log("url check", urlCheck);
    })();
  }, []); // this is for the paytm redirection to check for the payment is successful or not

  if (errors) {
    return <Page404 errors={errors.nonFieldErrors} />;
  }
  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const onSubmit = async () => {
    setFormLoading(true);
    console.log("application id ", applicationId);
    // if (applicationId) {
    //   console.log("applicaiton ID", applicationId);
    //   approveDSEservice(accessToken, applicationId, { is_approved: isApproved })
    //     .then(({ data, errors }) => {
    //       if (data) {
    //         router.push("/dashboard/digital-certificate/dse");
    //         console.log(data, "success");
    //       } else {
    //         console.log("erpprs", errors);
    //         // setApplicantErrors(errors);
    //       }
    //     })
    //     .finally(() => setFormLoading(false));
    // } else {
    const formData = new FormData();
    formData.append("applicant_name", applicant.applicant_name);
    formData.append("applicant_pan", applicant.applicant_pan.toUpperCase());
    formData.append(
      "applicant_mobile_number",
      applicant.applicant_mobile_number
    );
    formData.append("applicant_email", applicant.applicant_email);
    formData.append(
      "applicant_dob",
      moment(applicant.applicant_dob).format("YYYY-MM-DD")
    );
    formData.append(
      "applicant_office_address",
      applicant.applicant_office_address
    );
    formData.append("applicant_postcode", applicant.applicant_postcode);
    formData.append("request_letter", applicant.request_letter);
    formData.append("authorization_letter", applicant.authorization_letter);
    formData.append("applicant_photo", applicant.applicant_photo);
    formData.append("applicant_pan_photo", applicant.applicant_pan_photo);
    formData.append("applicant_id_card", applicant.applicant_id_card);

    formData.append(
      "hod_name",
      isSameAsApplicant ? applicant.applicant_name : applicant.hod_name
    );
    formData.append("hod_designation", applicant.hod_designation);
    formData.append(
      "hod_pan",
      isSameAsApplicant
        ? applicant.applicant_pan
        : applicant.hod_pan.toUpperCase()
    );
    formData.append(
      "hod_mobile_number",
      isSameAsApplicant
        ? applicant.applicant_mobile_number
        : applicant.hod_mobile_number
    );
    formData.append(
      "hod_email",
      isSameAsApplicant ? applicant.applicant_email : applicant.hod_email
    );
    formData.append(
      "hod_office_address",
      isSameAsApplicant
        ? applicant.applicant_office_address
        : applicant.hod_office_address
    );
    formData.append(
      "hod_postcode",
      isSameAsApplicant ? applicant.applicant_postcode : applicant.hod_postcode
    );
    if (applicant.autonomous_organization) {
      formData.append("department", applicant.autonomous_organization.id);
    } else if (applicant.hod_department && !applicant.autonomous_organization) {
      formData.append("department", applicant.hod_department.id);
    } else if (
      applicant.department &&
      !applicant.hod_department &&
      !applicant.autonomous_organization
    ) {
      formData.append("department", applicant.department.id);
    }
    formData.append(
      "hod_photo",
      isSameAsApplicant ? applicant.applicant_photo : applicant.hod_photo
    );
    formData.append(
      "hod_pan_photo",
      isSameAsApplicant
        ? applicant.applicant_pan_photo
        : applicant.hod_pan_photo
    );
    formData.append(
      "hod_id_card",
      isSameAsApplicant ? applicant.applicant_id_card : applicant.hod_id_card
    );
    formData.append("payment_type", applicant.payment_type);
    if (applicant.payment_type === "DD") {
      formData.append("dd", applicant.dd);
      formData.append("dd_no", applicant.dd_no);
      formData.append(
        "dd_date",
        moment(applicant.dd_date).format("YYYY-MM-DD")
      );
      formData.append("bank", applicant.bank);
      formData.append("branch", applicant.branch);
      formData.append("price", applicant.price);
    }
    formData.append("frequency", applicant.frequency);
    formData.append("application_type", applicant.application_type);
    formData.append("type", applicant.type);
    formData.append(
      "authorized_employee_card",
      applicant.authorized_employee_card
    );
    // for (var [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    let objofDetailstostoreinLocalStorage = {};
    for (var key of formData.keys()) {
      objofDetailstostoreinLocalStorage[key] = formData.get(key);
    }
    console.log("obje to store", objofDetailstostoreinLocalStorage);
    localStorage.setItem(
      "details",
      JSON.stringify(objofDetailstostoreinLocalStorage)
    );
    // const responseFromInitiatePayment = await paytmInitiatePayment(
    //   applicant.price,
    //   window.location.href,
    //   applicationId //to send inserted DSCid dynamically
    // );
    // const responseFromInitiatePayment = await paytmInitiatePayment(
    //   applicant.price,
    //   window.location.href
    //   // applicationId //to send inserted DSCid dynamically
    // );
    formData.append("orderno", "0");
    addDesService(formData)
      .then(async ({ data, errors }) => {
        if (data) {
          console.log("datafrom adddesservice", data);
          // if (!applicationId) {
          setIsApplicationIsAdded(true);
          if (applicant.payment_type != "ONLINE") {
            router.push("/services/digital-signature");
          } else {
            const responseFromInitiatePayment = await paytmInitiatePayment(
              applicant.price,
              window.location.href.substring(
                0,
                window.location.href.indexOf("?")
              ),
              data.id //to send inserted DSCid dynamically
            );
            onScriptPaytmLoad(
              responseFromInitiatePayment.orderid,
              responseFromInitiatePayment.body.txnToken,
              applicant.price
            );
          }
          // } else {
          //   router.push("/dashboard/digital-certificate/dse");
          // }
        } else {
          console.log("api error");
          setApplicantErrors(errors);
        }
      })
      .finally(() => setFormLoading(false));
    // }
    // if (isApplicationAdded && applicant.payment_type === "ONLINE") {
    //   const responseFromInitiatePayment = await paytmInitiatePayment(
    //     applicant.price,
    //     window.location.href,
    //     applicationId //to send inserted DSCid dynamically
    //   );
    //   onScriptPaytmLoad(
    //     responseFromInitiatePayment.orderid,
    //     responseFromInitiatePayment.body.txnToken,
    //     applicant.price
    //   );
    // }

    // const responseFromInitiatePayment = await paytmInitiatePayment(
    //   applicant.price,
    //   window.location.href,
    //   applicationId //to send inserted DSCid dynamically
    // );
    // onScriptPaytmLoad(
    //   responseFromInitiatePayment.orderid,
    //   responseFromInitiatePayment.body.txnToken,
    //   applicant.price
    // );
  };

  console.log("applicantErrors: ", applicantErrors);

  function renderFileTypes(fileType) {
    console.log(fileType);
    switch (fileType) {
      case "pdf": {
        return true;
      }
      case "png": {
        return true;
      }
      case "jpg": {
        return true;
      }
      case "jpeg": {
        return true;
      }
      default:
        return false;
    }
  }

  const onChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
    setApplicantErrors({
      ...applicantErrors,
      [e.target.name]: "",
      non_field_errors: "",
    });
  };

  return (
    <div>
      <PaymentModal />
      <h2 className="text-center p-4 apts-services-title">
        DIGITAL SIGNATURE CERTIFICATE FORM
      </h2>
      <Card className="pb-3">
        <Card.Header className="pt-3 bg-transparent">
          <div>
            {applicationId ? (
              <Button
                className=" float-end"
                onClick={() =>
                  router.push("/dashboard/digital-certificate/dse")
                }
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Back
              </Button>
            ) : (
              <Button
                className=" float-end"
                onClick={() => router.push("/services/digital-signature")}
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Back
              </Button>
            )}
            <h3 className="your-cart">
              {applicationId && "Update"} Digital Signature Certificate
            </h3>
          </div>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <Card className="m-3">
                <Card.Header className="vender-text bg-transparent">
                  Applicant Details:
                </Card.Header>
                <Card.Body className="px-4 pb-4">
                  <Row>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          Name
                        </Form.Label>
                        <span>(As per PAN Card)</span>
                        <Form.Control
                          // disabled={applicationId}
                          name="applicant_name"
                          id="applicant_name"
                          value={applicant.applicant_name}
                          placeholder="Enter Name"
                          onChange={onChange}
                          required
                          isInvalid={!!applicantErrors.applicant_name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.applicant_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          PAN Card Number
                        </Form.Label>
                        <Form.Control
                          name="applicant_pan"
                          id="applicant_pan"
                          // disabled={applicationId}
                          placeholder="Enter PAN"
                          value={applicant.applicant_pan}
                          onChange={(e) => {
                            setApplicant({
                              ...applicant,
                              applicant_pan: e.target.value,
                            });
                            if (
                              /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/.test(
                                e.target.value
                              )
                            ) {
                              if (
                                e.target.value &&
                                e.target.value.length === 10
                              ) {
                                setApplicantErrors({
                                  ...applicantErrors,
                                  applicant_pan: "",
                                  non_field_errors: "",
                                });
                              } else {
                                setApplicantErrors({
                                  ...applicantErrors,
                                  applicant_pan:
                                    "Please enter a valid PAN Number",
                                });
                              }
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                applicant_pan:
                                  "Please enter a valid PAN Number",
                              });
                            }
                          }}
                          required
                          isInvalid={!!applicantErrors.applicant_pan}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.applicant_pan}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          Date of Birth
                        </Form.Label>
                        <DatePicker
                          dateFormat="dd-MM-yyyy"
                          showMonthDropdown
                          showYearDropdown
                          peekNextMonth
                          maxDate={new Date()}
                          dropdownMode="select"
                          // disabled={applicationId}
                          placeholderText="Date of birth"
                          selected={
                            applicant.applicant_dob
                              ? new Date(applicant.applicant_dob)
                              : null
                          }
                          value={applicant.applicant_dob}
                          className="date-picker-input"
                          onChange={(e) => {
                            setApplicant({ ...applicant, applicant_dob: e });
                            setApplicantErrors({
                              ...applicantErrors,
                              applicant_dob: "",
                              non_field_errors: "",
                            });
                          }}
                          isInvalid={!!applicantErrors.applicant_dob}
                        />
                        {applicantErrors.applicant_dob && (
                          <p style={{ color: "#dc3545" }}>
                            {applicantErrors.applicant_dob}
                          </p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          Mobile
                        </Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon2">
                            +91
                          </InputGroup.Text>
                          <Form.Control
                            name="applicant_mobile_number"
                            id="applicant_mobile_number"
                            // disabled={applicationId}
                            placeholder="Enter Mobile"
                            onChange={(e) => {
                              setApplicant({
                                ...applicant,
                                applicant_mobile_number: e.target.value,
                              });
                              if (/[0-9]{10}/.test(e.target.value)) {
                                if (
                                  e.target.value &&
                                  e.target.value.length === 10
                                ) {
                                  setApplicantErrors({
                                    ...applicantErrors,
                                    applicant_mobile_number: "",
                                  });
                                } else {
                                  setApplicantErrors({
                                    ...applicantErrors,
                                    applicant_mobile_number:
                                      "Please enter a valid mobile number",
                                  });
                                }
                              } else {
                                setApplicantErrors({
                                  ...applicantErrors,
                                  applicant_mobile_number:
                                    "Please enter a valid mobile number",
                                });
                              }
                            }}
                            required
                            value={applicant.applicant_mobile_number}
                            isInvalid={
                              !!applicantErrors.applicant_mobile_number
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {applicantErrors.applicant_mobile_number}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          Email
                        </Form.Label>
                        <Form.Control
                          name={"applicant_email" || "email"}
                          id="applicant_email"
                          // disabled={applicationId}
                          placeholder="Enter Email"
                          onChange={(e) => {
                            setApplicant({
                              ...applicant,
                              applicant_email: e.target.value,
                            });
                            if (
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                                e.target.value
                              )
                            ) {
                              setApplicantErrors({
                                ...applicantErrors,
                                applicant_email: "",
                              });
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                applicant_email: "Please enter a valid email",
                              });
                            }
                          }}
                          required
                          type="email"
                          value={applicant.applicant_email}
                          isInvalid={
                            !!(
                              applicantErrors.applicant_email ||
                              applicantErrors.email
                            )
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.applicant_email ||
                            applicantErrors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          Pincode
                        </Form.Label>
                        <Form.Control
                          name="applicant_postcode"
                          id="applicant_postcode"
                          // disabled={applicationId}
                          placeholder="Enter Pincode"
                          onChange={onChange}
                          required
                          value={applicant.applicant_postcode}
                          isInvalid={!!applicantErrors.applicant_postcode}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.applicant_postcode}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Form.Group as={Col} xs={12}>
                      <Form.Label className="form-required my-2">
                        Address{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        as="textarea"
                        name="applicant_office_address"
                        id="applicant_office_address"
                        // disabled={applicationId}
                        value={applicant.applicant_office_address}
                        onChange={onChange}
                        required
                        isInvalid={!!applicantErrors.applicant_office_address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicantErrors.applicant_office_address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Card.Body>
              </Card>
              <Form.Control.Feedback type="invalid">
                {applicantErrors.nonfield_errors}
              </Form.Control.Feedback>
            </Stack>
          </Form>
        </Card.Body>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <Card className="m-3">
                <Card.Header className="vender-text bg-transparent">
                  Upload Documents
                  <span className="text-dark" style={{ fontSize: "15px" }}>
                    {" "}
                    (pdf/png/jpg/jpeg)
                  </span>
                </Card.Header>
                <Row className="m-2">
                  <Col className="mb-2" xs={12} md={6}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="form-required">
                        Request Letter
                      </Form.Label>
                      {/* {applicationId && applicant.request_letter && (
                        <span>
                          {" "}
                          ({applicant.request_letter.split("/").pop()})(
                          {console.log(
                            "appplc",
                            applicationId,
                            applicant.request_letter
                          )}
                          {applicant.request_letter.split("/").pop()})
                        </span>
                      )} */}
                      <Form.Control
                        type="file"
                        name="file"
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                        //accept="*"
                        // disabled={applicationId}
                        onChange={(e) => {
                          setApplicant({
                            ...applicant,
                            request_letter: e.target.files[0],
                          });
                          const fileType = e.target.files[0].name
                            .split(".")
                            .pop();
                          if (renderFileTypes(fileType)) {
                            setApplicantErrors({
                              ...applicantErrors,
                              request_letter: "",
                            });
                          } else {
                            setApplicantErrors({
                              ...applicantErrors,
                              request_letter:
                                "Please select a Valid File type (pdf/png/jpg/jpeg)",
                            });
                          }
                        }}
                        isInvalid={!!applicantErrors.request_letter}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicantErrors.request_letter}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col className="mb-2" xs={12} md={6}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="form-required">
                        Authorization Letter
                      </Form.Label>
                      {/* {applicationId && applicant.authorization_letter && (
                        <span>
                          {" "}
                          ({applicant.authorization_letter.split("/").pop()})
                        </span>
                      )} */}
                      <Form.Control
                        type="file"
                        // disabled={applicationId}
                        name="file"
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                        onChange={(e) => {
                          setApplicant({
                            ...applicant,
                            authorization_letter: e.target.files[0],
                          });
                          const fileType = e.target.files[0].name
                            .split(".")
                            .pop();
                          if (renderFileTypes(fileType)) {
                            setApplicantErrors({
                              ...applicantErrors,
                              authorization_letter: "",
                            });
                          } else {
                            setApplicantErrors({
                              ...applicantErrors,
                              authorization_letter:
                                "Please select a Valid File type (pdf/png/jpg/jpeg)",
                            });
                          }
                        }}
                        isInvalid={!!applicantErrors.authorization_letter}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicantErrors.authorization_letter}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col className="mb-2" xs={12} md={6}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="form-required">
                        Applicant Passport Photo/Selfie
                      </Form.Label>
                      {/* {applicationId && applicant.applicant_photo && (
                        <span>
                          {" "}
                          ({applicant.applicant_photo.split("/").pop()})
                        </span>
                      )} */}
                      <Form.Control
                        type="file"
                        name="file"
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                        // disabled={applicationId}
                        onChange={(e) => {
                          setApplicant({
                            ...applicant,
                            applicant_photo: e.target.files[0],
                          });
                          const fileType = e.target.files[0].name
                            .split(".")
                            .pop();
                          if (renderFileTypes(fileType)) {
                            if (isSameAsApplicant) {
                              setApplicantErrors({
                                ...applicantErrors,
                                applicant_photo: "",
                                hod_photo: "",
                              });
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                applicant_photo: "",
                              });
                            }
                          } else {
                            setApplicantErrors({
                              ...applicantErrors,
                              applicant_photo:
                                "Please select a Valid File type (pdf/png/jpg/jpeg)",
                            });
                          }
                        }}
                        isInvalid={!!applicantErrors.applicant_photo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicantErrors.applicant_photo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col className="mb-2" xs={12} md={6}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="form-required">
                        Applicant Employee ID Card
                      </Form.Label>
                      {/* {applicationId && applicant.applicant_id_card && (
                        <span>
                          {" "}
                          ({applicant.applicant_id_card.split("/").pop()})
                        </span>
                      )} */}
                      <Form.Control
                        type="file"
                        name="file"
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                        // disabled={applicationId}
                        onChange={(e) => {
                          setApplicant({
                            ...applicant,
                            applicant_id_card: e.target.files[0],
                          });
                          const fileType = e.target.files[0].name
                            .split(".")
                            .pop();
                          if (renderFileTypes(fileType)) {
                            if (isSameAsApplicant) {
                              setApplicantErrors({
                                ...applicantErrors,
                                applicant_id_card: "",
                                hod_id_card: "",
                              });
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                applicant_id_card: "",
                              });
                            }
                          } else {
                            setApplicantErrors({
                              ...applicantErrors,
                              applicant_id_card:
                                "Please select a Valid File type (pdf/png/jpg/jpeg)",
                            });
                          }
                        }}
                        isInvalid={!!applicantErrors.applicant_id_card}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicantErrors.applicant_id_card}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col className="mb-2" xs={12} md={6}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="form-required">
                        Applicant PAN Card
                      </Form.Label>
                      {/* {applicationId && applicant.applicant_pan_photo && (
                        <span>
                          {" "}
                          ({applicant.applicant_pan_photo.split("/").pop()})
                        </span>
                      )} */}
                      <Form.Control
                        type="file"
                        name="file"
                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                        // disabled={applicationId}
                        onChange={(e) => {
                          setApplicant({
                            ...applicant,
                            applicant_pan_photo: e.target.files[0],
                          });
                          const fileType = e.target.files[0].name
                            .split(".")
                            .pop();
                          if (renderFileTypes(fileType)) {
                            if (isSameAsApplicant) {
                              setApplicantErrors({
                                ...applicantErrors,
                                applicant_pan_photo: "",
                                hod_pan_photo: "",
                              });
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                applicant_pan_photo: "",
                              });
                            }
                          } else {
                            setApplicantErrors({
                              ...applicantErrors,
                              applicant_pan_photo:
                                "Please select a Valid File type (pdf/png/jpg/jpeg)",
                            });
                          }
                        }}
                        isInvalid={!!applicantErrors.applicant_pan_photo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicantErrors.applicant_pan_photo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card>
            </Stack>
          </Form>
        </Card.Body>
        {/* {!applicationId && ( */}
        {
          <Form.Group className="m-2 mx-5">
            <Form.Check
              label="Same for Authorized Official Details"
              name=""
              id="is_Approved"
              checked={isSameAsApplicant}
              onChange={() => {
                setIsSameAsApplicant(!isSameAsApplicant);
                setApplicantErrors({
                  ...applicantErrors,
                  hod_name: "",
                  hod_pan: "",
                  hod_mobile_number: "",
                  hod_email: "",
                  hod_office_address: "",
                  hod_photo: "",
                  hod_id_card: "",
                  hod_pan_photo: "",
                  hod_postcode: "",
                });
              }}
              type="checkbox"
            />
          </Form.Group>
        }
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <Card className="m-3">
                <Card.Header className="vender-text bg-transparent">
                  Authorized Official Details:
                </Card.Header>
                <Card.Body className="px-4 pb-4">
                  <Row>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          Name
                        </Form.Label>
                        <span>(As per PAN Card)</span>
                        <Form.Control
                          name="hod_name"
                          id="hod_name"
                          // disabled={applicationId || isSameAsApplicant}
                          disabled={isSameAsApplicant}
                          placeholder="Enter Name"
                          onChange={onChange}
                          required
                          value={
                            isSameAsApplicant
                              ? applicant.applicant_name
                              : applicant.hod_name
                          }
                          isInvalid={!!applicantErrors.hod_name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.hod_name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          PAN Card Number
                        </Form.Label>
                        <Form.Control
                          name="hod_pan"
                          id="hod_pan"
                          // disabled={applicationId || isSameAsApplicant}
                          disabled={isSameAsApplicant}
                          placeholder="Enter PAN"
                          onChange={(e) => {
                            setApplicant({
                              ...applicant,
                              hod_pan: e.target.value,
                            });
                            if (
                              /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/.test(
                                e.target.value
                              )
                            ) {
                              if (
                                e.target.value &&
                                e.target.value.length === 10
                              ) {
                                setApplicantErrors({
                                  ...applicantErrors,
                                  hod_pan: "",
                                });
                              } else {
                                setApplicantErrors({
                                  ...applicantErrors,
                                  hod_pan: "Please enter a valid PAN Number",
                                });
                              }
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                hod_pan: "Please enter a valid PAN Number",
                              });
                            }
                          }}
                          required
                          value={
                            isSameAsApplicant
                              ? applicant.applicant_pan
                              : applicant.hod_pan
                          }
                          isInvalid={applicantErrors.hod_pan}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.hod_pan}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          Position/ Designation
                        </Form.Label>
                        <Form.Control
                          name="hod_designation"
                          id="hod_designation"
                          // disabled={applicationId}
                          placeholder="Enter Designation"
                          onChange={onChange}
                          required
                          value={applicant.hod_designation}
                          isInvalid={!!applicantErrors.hod_designation}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.hod_designation}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Label className="form-required">
                        Secretariat Departments
                      </Form.Label>
                      <Select
                        name="dependant_on"
                        isClearable
                        // isDisabled={applicationId}
                        value={
                          // applicationId
                          // ? defaultDepartment
                          // :
                          applicant.department
                        }
                        options={departmentData}
                        getOptionLabel={(options) => options.name}
                        getOptionValue={(options) => options.id}
                        isSearchable
                        closeMenuOnSelect
                        onInputChange={(
                          inputValue,
                          { action, prevInputValue }
                        ) => {
                          switch (action) {
                            case "set-value":
                              return prevInputValue;
                            case "input-change":
                              if (inputValue) {
                                getDepartments(inputValue);
                              } else {
                                getDepartments("");
                              }
                              return inputValue;
                            default:
                              return inputValue;
                          }
                        }}
                        onChange={(newValue, actionMeta) => {
                          const { action } = actionMeta;
                          if (
                            action === "select-option" ||
                            action === "remove-value"
                          ) {
                            setApplicant({
                              ...applicant,
                              department: newValue,
                              hod_department: "",
                              autonomous_organization: "",
                            });
                            setApplicantErrors({
                              ...applicantErrors,
                              department: "",
                            });
                            getHeadOfDepartments(newValue.id, "");
                            getAutonomousOrganizations(newValue.id, "");
                          } else if (action === "clear") {
                            setApplicant({
                              ...applicant,
                              department: "",
                              hod_department: "",
                              autonomous_organization: "",
                            });
                            setApplicantErrors({
                              ...applicantErrors,
                              department: "",
                            });
                            getDepartments("");
                            setHeadOfDepartmentData([]);
                            setAutonomousOrganizationsData([]);
                          }
                        }}
                      />
                      {applicantErrors.department && (
                        <p style={{ color: "#dc3545" }}>
                          {applicantErrors.department}
                        </p>
                      )}
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Label>Head of Departments</Form.Label>
                      <Select
                        styles={{ zIndex: 100 }}
                        name="dependant_on"
                        isClearable
                        // isDisabled={applicationId}
                        value={
                          // applicationId
                          //   ? defaultHodDepartment
                          // :
                          applicant.hod_department
                        }
                        options={headOfDepartmentData}
                        getOptionLabel={(options) => options.name}
                        getOptionValue={(options) => options.id}
                        isSearchable
                        closeMenuOnSelect
                        onInputChange={(
                          inputValue,
                          { action, prevInputValue }
                        ) => {
                          switch (action) {
                            case "set-value":
                              return prevInputValue;
                            case "input-change":
                              if (inputValue) {
                                getHeadOfDepartments(
                                  applicant.department.id,
                                  inputValue
                                );
                              } else {
                                getHeadOfDepartments(
                                  applicant.department.id,
                                  ""
                                );
                              }
                              return inputValue;
                            default:
                              return inputValue;
                          }
                        }}
                        onChange={(newValue, actionMeta) => {
                          const { action } = actionMeta;
                          if (
                            action === "select-option" ||
                            action === "remove-value"
                          ) {
                            setApplicant({
                              ...applicant,
                              hod_department: newValue,
                              autonomous_organization: "",
                            });
                            setApplicantErrors({
                              ...applicantErrors,
                              department: "",
                            });
                            getAutonomousOrganizations(newValue.id, "");
                          } else if (action === "clear") {
                            setApplicant({
                              ...applicant,
                              hod_department: "",
                              autonomous_organization: "",
                            });
                            getHeadOfDepartments(applicant.department.id, "");
                            getAutonomousOrganizations(
                              applicant.department.id,
                              ""
                            );
                          }
                        }}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Label>Autonomous Organizations</Form.Label>
                      <Select
                        name="dependant_on"
                        isClearable
                        // isDisabled={applicationId}
                        value={
                          // applicationId
                          //   ? defaultAutonomousDepartment
                          // :
                          applicant.autonomous_organization
                        }
                        options={autonomousOrganizationsData}
                        getOptionLabel={(options) => options.name}
                        getOptionValue={(options) => options.id}
                        isSearchable
                        closeMenuOnSelect
                        onInputChange={(
                          inputValue,
                          { action, prevInputValue }
                        ) => {
                          switch (action) {
                            case "set-value":
                              return prevInputValue;
                            case "input-change":
                              if (inputValue) {
                                getAutonomousOrganizations(
                                  applicant.hod_department.id
                                    ? applicant.hod_department.id
                                    : applicant.department.id,
                                  inputValue
                                );
                              } else {
                                getAutonomousOrganizations(
                                  applicant.hod_department.id
                                    ? applicant.hod_department.id
                                    : applicant.department.id,
                                  ""
                                );
                              }
                              return inputValue;
                            default:
                              return inputValue;
                          }
                        }}
                        onChange={(newValue, actionMeta) => {
                          const { action } = actionMeta;
                          if (
                            action === "select-option" ||
                            action === "remove-value"
                          ) {
                            setApplicant({
                              ...applicant,
                              autonomous_organization: newValue,
                            });
                            setApplicantErrors({
                              ...applicantErrors,
                              department: "",
                            });
                          } else if (action === "clear") {
                            setApplicant({
                              ...applicant,
                              autonomous_organization: "",
                            });
                            setApplicantErrors({
                              ...applicantErrors,
                              department: "",
                            });
                            getDepartments("");
                          }
                        }}
                      />
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          Mobile
                        </Form.Label>
                        <InputGroup className="mb-3">
                          <InputGroup.Text id="basic-addon3">
                            +91
                          </InputGroup.Text>
                          <Form.Control
                            name="hod_mobile_number"
                            id="hod_mobile_number"
                            // disabled={applicationId || isSameAsApplicant}
                            disabled={isSameAsApplicant}
                            placeholder="Enter Mobile"
                            onChange={(e) => {
                              setApplicant({
                                ...applicant,
                                hod_mobile_number: e.target.value,
                              });
                              if (/[0-9]{10}/.test(e.target.value)) {
                                if (
                                  e.target.value &&
                                  e.target.value.length === 10
                                ) {
                                  setApplicantErrors({
                                    ...applicantErrors,
                                    hod_mobile_number: "",
                                  });
                                } else {
                                  setApplicantErrors({
                                    ...applicantErrors,
                                    hod_mobile_number:
                                      "Please enter a valid mobile number",
                                  });
                                }
                              } else {
                                setApplicantErrors({
                                  ...applicantErrors,
                                  hod_mobile_number:
                                    "Please enter a valid mobile number",
                                });
                              }
                            }}
                            required
                            value={
                              isSameAsApplicant
                                ? applicant.applicant_mobile_number
                                : applicant.hod_mobile_number
                            }
                            isInvalid={applicantErrors.hod_mobile_number}
                          />
                          <Form.Control.Feedback type="invalid">
                            {applicantErrors.hod_mobile_number}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label className="form-required my-2">
                          Email
                        </Form.Label>
                        <Form.Control
                          name="hod_email"
                          id="hod_email"
                          // disabled={applicationId || isSameAsApplicant}
                          disabled={isSameAsApplicant}
                          placeholder="Enter Email"
                          onChange={(e) => {
                            setApplicant({
                              ...applicant,
                              hod_email: e.target.value,
                            });
                            if (
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                                e.target.value
                              )
                            ) {
                              setApplicantErrors({
                                ...applicantErrors,
                                hod_email: "",
                              });
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                hod_email: "Please enter a valid email",
                              });
                            }
                          }}
                          required
                          type="email"
                          value={
                            isSameAsApplicant
                              ? applicant.applicant_email
                              : applicant.hod_email
                          }
                          isInvalid={applicantErrors.hod_email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.hod_email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group>
                        <Form.Label className="form-required my-2">
                          Pincode
                        </Form.Label>
                        <Form.Control
                          name="hod_postcode"
                          id="hod_postcode"
                          // disabled={applicationId || isSameAsApplicant}
                          disabled={isSameAsApplicant}
                          placeholder="Enter Pincode"
                          onChange={onChange}
                          required
                          value={
                            isSameAsApplicant
                              ? applicant.applicant_postcode
                              : applicant.hod_postcode
                          }
                          isInvalid={!!applicantErrors.hod_postcode}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.hod_postcode}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Form.Group as={Col} xs={12} className="mb-2">
                      <Form.Label className="form-required my-2">
                        Address{" "}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        as="textarea"
                        // disabled={applicationId || isSameAsApplicant}
                        disabled={isSameAsApplicant}
                        name="hod_office_address"
                        id="hod_office_address"
                        value={
                          isSameAsApplicant
                            ? applicant.applicant_office_address
                            : applicant.hod_office_address
                        }
                        onChange={onChange}
                        required
                        isInvalid={!!applicantErrors.hod_office_address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {applicantErrors.hod_office_address}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="m-3">
                <Card.Header className="vender-text bg-transparent">
                  Upload Documents
                  <span className="text-dark" style={{ fontSize: "15px" }}>
                    {" "}
                    (pdf/png/jpg/jpeg)
                  </span>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required">
                          Authorized Passport Photo/Selfie
                        </Form.Label>
                        {/* {applicationId && applicant.hod_photo ? (
                          <span> ({applicant.hod_photo.split("/").pop()})</span>
                        ) : (
                          isSameAsApplicant && (
                            <span>
                              {" "}
                              (
                              {applicant.applicant_photo &&
                                applicant.applicant_photo.name}
                              )
                            </span>
                          )
                        )} */}

                        <Form.Control
                          type="file"
                          name="file"
                          accept="image/jpeg,image/png,image/jpg,application/pdf"
                          // disabled={applicationId || isSameAsApplicant}
                          disabled={isSameAsApplicant}
                          onChange={(e) => {
                            setApplicant({
                              ...applicant,
                              hod_photo: e.target.files[0],
                            });
                            const fileType = e.target.files[0].name
                              .split(".")
                              .pop();
                            if (renderFileTypes(fileType)) {
                              setApplicantErrors({
                                ...applicantErrors,
                                hod_photo: "",
                              });
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                hod_photo:
                                  "Please select a Valid File type (pdf/png/jpg/jpeg)",
                              });
                            }
                          }}
                          isInvalid={!!applicantErrors.hod_photo}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.hod_photo}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required">
                          Authorized Employee ID Card
                        </Form.Label>
                        {/* {applicationId && applicant.hod_id_card ? ( */}
                        {
                          // applicant.hod_id_card ? (
                          //   <span>
                          //     {" "}
                          //     ({applicant.hod_id_card.split("/").pop()})
                          //   </span>
                          // ) :
                          isSameAsApplicant && (
                            <span>
                              (
                              {applicant.applicant_id_card &&
                                applicant.applicant_id_card.name}
                              )
                            </span>
                          )
                        }
                        <Form.Control
                          type="file"
                          name="file"
                          accept="image/jpeg,image/png,image/jpg,application/pdf"
                          // disabled={applicationId || isSameAsApplicant}
                          disabled={isSameAsApplicant}
                          onChange={(e) => {
                            setApplicant({
                              ...applicant,
                              hod_id_card: e.target.files[0],
                            });
                            const fileType = e.target.files[0].name
                              .split(".")
                              .pop();
                            if (renderFileTypes(fileType)) {
                              setApplicantErrors({
                                ...applicantErrors,
                                hod_id_card: "",
                              });
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                hod_id_card:
                                  "Please select a Valid File type (pdf/png/jpg/jpeg)",
                              });
                            }
                          }}
                          isInvalid={!!applicantErrors.hod_id_card}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.hod_id_card}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className="mb-2" xs={12} md={6}>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className="form-required">
                          Authorized PAN Card
                        </Form.Label>
                        {/* {applicationId && applicant.hod_pan_photo ? ( */}
                        {
                          // applicant.hod_pan_photo ? (
                          //   <span>
                          //     ({applicant.hod_pan_photo.split("/").pop()})
                          //   </span>
                          // ) :
                          isSameAsApplicant && (
                            <span>
                              (
                              {applicant.applicant_pan_photo &&
                                applicant.applicant_pan_photo.name}
                              )
                            </span>
                          )
                        }
                        <Form.Control
                          type="file"
                          name="file"
                          accept="image/jpeg,image/png,image/jpg,application/pdf"
                          // disabled={applicationId || isSameAsApplicant}
                          disabled={isSameAsApplicant}
                          onChange={(e) => {
                            setApplicant({
                              ...applicant,
                              hod_pan_photo: e.target.files[0],
                            });
                            const fileType = e.target.files[0].name
                              .split(".")
                              .pop();
                            if (renderFileTypes(fileType)) {
                              setApplicantErrors({
                                ...applicantErrors,
                                hod_pan_photo: "",
                              });
                            } else {
                              setApplicantErrors({
                                ...applicantErrors,
                                hod_pan_photo:
                                  "Please select a Valid File type (pdf/png/jpg/jpeg)",
                              });
                            }
                          }}
                          isInvalid={!!applicantErrors.hod_pan_photo}
                        />
                        <Form.Control.Feedback type="invalid">
                          {applicantErrors.hod_pan_photo}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* {applicationId && (
                    <Form.Group className="mt-2">
                      <Form.Check
                        label="Approved"
                        name=""
                        id="is_Approved"
                        checked={isApproved}
                        onChange={(e) => setIsApproved(!isApproved)}
                        type="checkbox"
                      />
                    </Form.Group>
                  )} */}
                </Card.Body>
              </Card>

              <Form.Control.Feedback type="invalid">
                {applicantErrors.non_field_errors}
              </Form.Control.Feedback>
            </Stack>
          </Form>
          <Card className="m-3">
            <Card.Header className="vender-text bg-transparent">
              Payment Details:
            </Card.Header>
            <Row className="m-3">
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label className="form-required my-2">DSC Type</Form.Label>
                <Form.Select
                  name="type"
                  id="type"
                  value={applicant.type}
                  onChange={onChange}
                  isInvalid={!!applicantErrors.type}
                  required
                >
                  <option value="">Select a type</option>
                  {dscTypes.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {applicantErrors.type}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label className="form-required my-2">
                  Application Type
                </Form.Label>
                <Form.Select
                  name="application_type"
                  id="application_type"
                  value={applicant.application_type}
                  onChange={onChange}
                  isInvalid={!!applicantErrors.application_type}
                  required
                >
                  <option value="">Select a application type</option>
                  {applicationTypes.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {applicantErrors.application_type}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label className="form-required my-2">Tenure</Form.Label>
                <Form.Select
                  name="frequency"
                  id="frequency"
                  value={applicant.frequency}
                  onChange={onChange}
                  isInvalid={!!applicantErrors.frequency}
                  required
                >
                  <option value="">Select a tenure</option>
                  {tenureOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {applicantErrors.frequency}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6}>
                <Form.Label className="form-required my-2">
                  Payment Type
                </Form.Label>
                <Form.Select
                  name="payment_type"
                  id="payment_type"
                  value={applicant.payment_type}
                  onChange={onChange}
                  isInvalid={!!applicantErrors.payment_type}
                  required
                >
                  <option value="">Select a payment type</option>
                  {paymentTypes.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {applicantErrors.payment_type}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            {applicant.payment_type === "DD" && (
              <Row className="m-3">
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="form-required my-2">DD No</Form.Label>
                  <Form.Control
                    name="dd_no"
                    id="dd_no"
                    placeholder="Enter DD No"
                    onChange={onChange}
                    required
                    value={applicant.dd_no}
                    isInvalid={!!applicantErrors.dd_no}
                  />
                  <Form.Control.Feedback type="invalid">
                    {applicantErrors.dd_no}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="form-required my-2">
                    DD Date
                  </Form.Label>
                  <DatePicker
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    peekNextMonth
                    maxDate={new Date()}
                    dropdownMode="select"
                    placeholderText="Select DD Date"
                    selected={
                      applicant.dd_date ? new Date(applicant.dd_date) : null
                    }
                    value={applicant.dd_date}
                    onChange={(date) => {
                      setApplicant({ ...applicant, dd_date: date });
                      setApplicantErrors({ ...applicantErrors, dd_date: "" });
                    }}
                    className="date-picker-input"
                  />
                  {applicantErrors.dd_date && (
                    <p style={{ color: "#dc3545" }}>
                      {applicantErrors.dd_date}
                    </p>
                  )}
                </Form.Group>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="form-required my-2">Bank</Form.Label>
                  <Form.Control
                    name="bank"
                    id="bank"
                    placeholder="Enter Bank Name"
                    onChange={onChange}
                    required
                    value={applicant.bank}
                    isInvalid={!!applicantErrors.bank}
                  />
                  <Form.Control.Feedback type="invalid">
                    {applicantErrors.bank}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="form my-2">Branch</Form.Label>
                  <Form.Control
                    name="branch"
                    id="branch"
                    placeholder="Enter Branch"
                    onChange={onChange}
                    required
                    value={applicant.branch}
                    isInvalid={!!applicantErrors.branch}
                  />
                  <Form.Control.Feedback type="invalid">
                    {applicantErrors.branch}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={6}>
                  <Form.Label className="form-required my-2">Amount</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
                    <Form.Control
                      type="number"
                      min="0"
                      name="price"
                      id="price"
                      placeholder="Enter Amount"
                      onChange={onChange}
                      required
                      value={applicant.price}
                      isInvalid={!!applicantErrors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {applicantErrors.price}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} xs={12} md={6} controlId="formFile">
                  <Form.Label className="form-required my-2">DD</Form.Label>
                  {/* {applicationId && applicant.dd && ( */}
                  {/* {applicant.dd && (
                    <span>({applicant.dd.split("/").pop()})</span>
                  )} */}
                  <Form.Control
                    type="file"
                    accept="image/jpg,image/png,image/jpeg,application/pdf"
                    name="dd"
                    onChange={(e) => {
                      setApplicant({
                        ...applicant,
                        dd: e.target.files[0],
                      });
                      const fileType = e.target.files[0].name.split(".").pop();
                      if (renderFileTypes(fileType)) {
                        console.log("truee ");
                        setApplicantErrors({ ...applicantErrors, dd: "" });
                      } else {
                        console.log("fasleeed");
                        setApplicantErrors({
                          ...applicantErrors,
                          dd: "Please select a Valid File type (pdf/png/jpg/jpeg)",
                        });
                      }
                    }}
                    isInvalid={!!applicantErrors.dd}
                  />
                  <Form.Control.Feedback type="invalid">
                    {applicantErrors.dd}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            )}
          </Card>
          <div className="alert alert-primary mx-3 my-5">
            Note: Above information should be same as used in KYC Account
          </div>
          {isApplicationAdded && (
            <Alert
              variant="success"
              className="text-end mx-3 my-5"
              onClose={() => {
                router.push("/services/digital-signature");
                setIsApplicationIsAdded(false);
              }}
              dismissible
            >
              <p className="mt-2">DSC Added Successfully </p>
            </Alert>
          )}
          <div className="pagenation-style mx-3">
            <Button
              className="me-2  px-3"
              variant="danger"
              onClick={() =>
                // applicationId
                //   ? router.push("/dashboard/digital-certificate/dse")
                // :
                router.push("/services/digital-signature")
              }
            >
              <FontAwesomeIcon icon={faTimes} className="me-1" />
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => onSubmit()}
              className="btn btn-success px-3"
              disabled={
                !(
                  Object.values(applicantErrors).filter((item) => item === "")
                    .length === Object.keys(applicantErrors).length
                )
              }
            >
              {formLoading ? (
                <Spinner animation="border" size="sm" className="me-1" />
              ) : (
                <FontAwesomeIcon icon={faCheck} className="me-1" />
              )}
              Submit
            </Button>
          </div>
        </Card.Body>
      </Card>
      {modalShow && (
        <MyModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          verifiedpaymentdetails={verifiedPaymentDetails}
        >
          <div className="alert alert-primary mx-3 my-3">
            Payment Transaction ID: orderid
          </div>
        </MyModal>
      )}
    </div>
  );
}
