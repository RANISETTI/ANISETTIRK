import {
  faCheck,
  faChevronLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import getHeaders from "../../../../libs/utils/getHeaders";
import AddApplicationService, {
  EditSoftwareService,
} from "../../../../services/dashboard/assets/software";
import getSecretariatDepartments, {
  getHODDepartments,
} from "../../../../services/dashboard/departments";
import { genericGetService } from "../../../../services/GenericService";
import Page404 from "../../../common/customerrorpages/Page404";
import { postCheckListAssests } from "../../../../services/auth/checkListAssests";

const sslStatusTypeOptions = [
  {
    id: 1,
    name: "Yes",
    value: "true",
  },
  {
    id: 2,
    name: "No",
    value: "false",
  },
];

export default function CreateApplication(props) {
  const {
    accessToken,
    userDetails: { type },
    userDetails,
  } = useSelector((state) => state.user);

  const [hodDepartment, setHodDepartment] = useState(
    type === "DEPARTMENT" ? userDetails.department : ""
  );
  const [departmentType, setDepartmentType] = useState(
    type === "DEPARTMENT" ? userDetails.department.parent : ""
  );

  const [departmentITHeadDetails, setDepartmentITHeadDetails] = useState({
    departmentITHeadName: "",
    departmentITHeadDesignation: "",
    departmentITHeadOfficialGovtEmailID: "",
    departmentITHeadMobNumber: "",
  });

  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    projectSPOCDesignation: "",
    projectSPOCofficialGovtEmailID: "",
    projectSPOCMobileNo: "",
  });

  const [applicationDetails, setApplicationDetails] = useState({
    // typeOfApplication:"",
    nameOfDomain: "",
    WebApplicationOperatingsystem: "",
    applicationTiering: "",
    applicationtype: "",
    ApplicationPlatform: "",
    LocationofMobileAPP: "",
    typeofMobileApplication: "",
    MobileApplicationOperatingSystem: "",
    ContainerizationKubernets: "",
    WhethercopyofSourcecode: "",
    TypeofWebServer: "",
    TypeofApplicationServer: "",
    NameoftheDB: "",
    dedicatedserverorainstance: "",
    backupPolicyisActive: "",
    usesAadhaarServices: "",
    anyfinancialtransactions: "",
    NameofthePaymentGateway: "",
    NameoftheBank: "",
    trasactionlogscapture: "",
    SSLTLScertificate: "",
    CERTInempanelledagencyAPTS: "",
    OnboardingAPCSOC: "",
    HostedAtApdataCenter: "",
    ApplicationHostedLocation: "",
  });

  const [systemAdminDetails, setSystemAdminDetails] = useState({
    systemAdminName: "",
    systemAdministratorSPOCName: "",
    systemAdministratorSPOCDesignation: "",
    systemAdministratorSPOCofficialEmailID: "",
    systemAdministratorSPOCMobileNo: "",
  });

  const [developerDetails, setDeveloperDetails] = useState({
    developerName: "",
    developerSPOCName: "",
    developerSPOCDesignation: "",
    developerSPOCofficialEmailID: "",
    developerSPOCMobileNo: "",
  });

  const [dataCenterDetails, setDataCenterDetails] = useState({
    NameoftheDataCenter: "",
    LocationofDataCenter: "",
    Dedicatedserver: "",
    Contractperiod: "",
    statusofInfrastructureHardening: "",
    SoftwareHardwareLoadBalancer: "",
    DevelopmentCharges: "",
  });

  const [charges, setCharges] = useState({
    maintenancecharges: "",
    GoLiveDate: "",
    maintenancechargespaidfromthedate: "",
    hostingcharges: "",
    hostingDate: "",
    hostingchargespaid: "",
  });

  const [serverDetails, setServerDetails] = useState({
    NoofServersused: "",
    NoofVCPUs: "",
    TotalRAM: "",
    TotalSANStorage: "",
    TotalNASStorage: "",
    DomainNameservices: "",
  });

  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [departmentTypeOptions, setDepartmentTypeOptions] = useState([]);
  const [applicationUrl, setApplicationUrl] = useState("");
  const [ipAddressUrl, setIpAddressUrl] = useState("");
  const [sslStatusType, setSSLStatusType] = useState("");
  const [dataCenterType, setDataCenterType] = useState();
  const [dataCenterTypeOptions, setDataCenterTypeOptions] = useState([]);
  const [postalAddress, setPostalAddress] = useState("");
  const [operatorLocation, setOperatorLocation] = useState();
  const [operatorLocationOptions, setOperatorLocationOptions] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMobile, setContactMobile] = useState("");
  const [singlePointOfContactName, setSinglePointOfContactName] = useState("");
  const [singlePointOfContactEmail, setSinglePointOfContactEmail] =
    useState("");
  const [singlePointOfContactMobile, setSinglePointOfContactMobile] =
    useState("");
  const [inChargeName, setInChargeName] = useState("");
  const [inChargeEmail, setInChargeEmail] = useState("");
  const [inChargeMobile, setInChargeMobile] = useState("");
  const [errors, setErrros] = useState("");

  const [typeOfApplication, setTypeOfApplication] = useState({
    type: "Web",
    isWebApp: true,
  });

  const [applicationId, setApplicationId] = useState("");

  const { handleSubmit } = useForm();
  const [applicationErrors, setApplicationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = getHeaders(accessToken);

  const { action } = props;

  const router = useRouter();

  // useEffect(()=>{
  //   if(!typeOfApplication.isWebApp){
  //     set
  //   }
  // },[typeOfApplication.isWebApp])

  const getDepartments = (searchText) => {
    getSecretariatDepartments(searchText, headers).then(({ data, errors }) => {
      if (errors) {
        console.log("errors", errors);
      }
      if (data) {
        setDepartmentOptions(data.results);
      } else {
        setDepartmentOptions([]);
      }
    });
  };

  const getHodDepartments = (parentId, searchText) => {
    getHODDepartments(searchText, parentId, headers).then(
      ({ data, errors }) => {
        if (errors) {
          console.log("errors", errors);
        }
        if (data) {
          setDepartmentTypeOptions(data.results);
        } else {
          setDepartmentTypeOptions([]);
        }
      }
    );
  };

  useEffect(() => {
    getDepartments("");
    getHodDepartments("");
    //   setIsLoading(true);
    //   if (action) {
    //     const id = router.asPath.split("/")[5];
    //     genericGetService(`/admin/software-assets/${id}/`, headers).then(
    //       ({ data, errors }) => {
    //         if (errors) {
    //           setErrros(errors);
    //         }
    //         if (data) {
    //           const {
    //             id,
    //             applicationUrl,
    //             ipAddress,
    //             isSecurityEnabled,
    //             department,
    //             dataCenter: { id: dataCenterId },
    //             dataCenterAddress,
    //             developedBy,
    //             developmentLocation,
    //             pocName,
    //             pocEmail,
    //             pocMobile,
    //             spocName,
    //             spocEmail,
    //             spocMobile,
    //             inchargeName,
    //             inchargeEmail,
    //             inchargeMobile,
    //             department: { parent },
    //           } = data;
    //           setApplicationId(id);
    //           setDepartmentType(parent);
    //           setHodDepartment(department);
    //           setApplicationUrl(applicationUrl);
    //           setIpAddressUrl(ipAddress);
    //           setSSLStatusType(isSecurityEnabled);
    //           setDataCenterType(dataCenterId);
    //           setPostalAddress(dataCenterAddress);
    //           setCompanyName(developedBy);
    //           setOperatorLocation(developmentLocation);
    //           setContactName(pocName);
    //           setContactEmail(pocEmail);
    //           setContactMobile(pocMobile);
    //           setSinglePointOfContactName(spocName);
    //           setSinglePointOfContactEmail(spocEmail);
    //           setSinglePointOfContactMobile(spocMobile);
    //           setInChargeName(inchargeName);
    //           setInChargeEmail(inchargeEmail);
    //           setInChargeMobile(inchargeMobile);
    //         }
    //       }
    //     );
    //   }
    //   genericGetService("/admin/data-centers/", headers).then(
    //     ({ data, errors }) => {
    //       if (errors) {
    //         console.log("errors", errors);
    //       }
    //       if (data) {
    //         setDataCenterTypeOptions(data.results);
    //       } else {
    //         setDataCenterTypeOptions([]);
    //       }
    //     }
    //   );
    //   genericGetService("/admin/development-types/", headers)
    //     .then(({ data, errors }) => {
    //       if (errors) {
    //         console.log("errors", errors);
    //       }
    //       if (data) {
    //         setOperatorLocationOptions(data);
    //       } else {
    //         setOperatorLocationOptions([]);
    //       }
    //     })
    //     .finally(() => setIsLoading(false));
  }, []);

  const onSubmit = () => {
    // setIsLoading(true);
    console.log(serverDetails, charges, developerDetails, systemAdminDetails);
    const formData = new FormData();
    formData.append("department", departmentType.id);
    formData.append("hod", hodDepartment.id);
    formData.append("division", "1");
    formData.append(
      "dept_it_head_name",
      departmentITHeadDetails.departmentITHeadName
    );
    formData.append(
      "dept_it_head_desig",
      departmentITHeadDetails.departmentITHeadDesignation
    );
    formData.append(
      "dept_it_head_email",
      departmentITHeadDetails.departmentITHeadOfficialGovtEmailID
    );
    formData.append(
      "dept_it_head_mobileno",
      departmentITHeadDetails.departmentITHeadMobNumber
    );
    formData.append("project_name", projectDetails.projectName);
    formData.append(
      "project_spoc_desig",
      projectDetails.projectSPOCDesignation
    );
    formData.append(
      "project_spoc_email",
      projectDetails.projectSPOCofficialGovtEmailID
    );
    formData.append(
      "project_spoc_mobileno",
      projectDetails.projectSPOCMobileNo
    );
    formData.append(
      "system_admin_vendor_name",
      systemAdminDetails.systemAdminName
    );
    formData.append(
      "system_admin_spoc_name",
      systemAdminDetails.systemAdministratorSPOCName
    );
    formData.append(
      "system_admin_spoc_desig",
      systemAdminDetails.systemAdministratorSPOCDesignation
    );
    formData.append(
      "system_admin_spoc_email",
      systemAdminDetails.systemAdministratorSPOCofficialEmailID
    );
    formData.append(
      "system_admin_spoc_mobileno",
      systemAdminDetails.systemAdministratorSPOCMobileNo
    );
    formData.append("developer_vendor_name", developerDetails.developerName);
    formData.append("developer_spoc_name", developerDetails.developerSPOCName);
    formData.append(
      "developer_spoc_desig",
      developerDetails.developerSPOCDesignation
    );
    formData.append(
      "developer_spoc_email",
      developerDetails.developerSPOCofficialEmailID
    );
    formData.append(
      "developer_spoc_mobileno",
      developerDetails.developerSPOCMobileNo
    );
    formData.append("appli_category", applicationDetails.applicationtype);
    formData.append("appli_domain_name", applicationDetails.nameOfDomain);
    formData.append(
      "appli_os",
      applicationDetails.WebApplicationOperatingsystem
    );
    formData.append("appli_tiering", applicationDetails.applicationTiering);
    formData.append("appli_type", applicationDetails.applicationtype);
    formData.append("appli_platform", applicationDetails.ApplicationPlatform);
    formData.append(
      "appli_mobileapp_loc",
      applicationDetails.LocationofMobileAPP
    );
    formData.append(
      "appli_mobileapp_type",
      applicationDetails.typeofMobileApplication
    );
    formData.append(
      "appli_mobileapp_os",
      applicationDetails.MobileApplicationOperatingSystem
    );
    formData.append(
      "appli_containerization_kubernets",
      applicationDetails.ContainerizationKubernets
    );
    formData.append(
      "appli_source_code_with_dept",
      applicationDetails.WhethercopyofSourcecode
    );
    formData.append("appli_webserver_type", applicationDetails.TypeofWebServer);
    formData.append(
      "appli_server_type",
      applicationDetails.TypeofApplicationServer
    );
    formData.append("appli_db_name", applicationDetails.NameoftheDB);
    formData.append(
      "appli_db_dedicated_server",
      applicationDetails.dedicatedserverorainstance
    );
    formData.append(
      "appli_backup_active",
      applicationDetails.backupPolicyisActive
    );
    formData.append(
      "appli_has_Aadhaar_services",
      applicationDetails.usesAadhaarServices
    );
    formData.append(
      "appli_has_fin_services",
      applicationDetails.anyfinancialtransactions
    );
    formData.append(
      "appli_payment_gateway",
      applicationDetails.NameofthePaymentGateway
    );
    formData.append("appli_payment_type", applicationDetails.NameoftheBank);
    formData.append(
      "appli_has_fin_trans_logs",
      applicationDetails.trasactionlogscapture
    );
    formData.append(
      "appli_has_config_ssl",
      applicationDetails.SSLTLScertificate
    );
    formData.append(
      "appli_has_apts_security_audit",
      applicationDetails.CERTInempanelledagencyAPTS
    );
    formData.append(
      "appli_has_apcsoc_onboarding",
      applicationDetails.OnboardingAPCSOC
    );
    formData.append(
      "applihost_datacenter_name",
      dataCenterDetails.NameoftheDataCenter
    );
    formData.append(
      "applihost_datacenter_location",
      dataCenterDetails.LocationofDataCenter
    );
    formData.append("applihost_vm_cloud", dataCenterDetails.Dedicatedserver);
    formData.append(
      "applihost_contract_period",
      dataCenterDetails.Contractperiod
    );
    formData.append(
      "applihost_infra_status",
      dataCenterDetails.statusofInfrastructureHardening
    );
    formData.append(
      "applihost_has_loadbalancer",
      dataCenterDetails.SoftwareHardwareLoadBalancer
    );
    formData.append("appli_dev_charges", charges.hostingcharges);
    formData.append("appli_maint_charges", charges.maintenancecharges);
    formData.append("appli_maint_golive_date", charges.GoLiveDate);
    formData.append(
      "appli_maint_charges_paid",
      charges.maintenancechargespaidfromthedate
    );
    formData.append("applihost_date", charges.hostingDate);
    formData.append("applihost_charges_paid", charges.hostingchargespaid);
    formData.append("applihost_noof_servers", serverDetails.NoofServersused);
    formData.append("applihost_noof_vcpus", serverDetails.NoofVCPUs);
    formData.append("applihost_total_ram", serverDetails.TotalRAM);
    formData.append("applihost_total_san", serverDetails.TotalSANStorage);
    formData.append("applihost_total_nas", serverDetails.TotalNASStorage);
    formData.append("applihost_dns_service", serverDetails.DomainNameservices);
    formData.append("isactive", true);

    postCheckListAssests(formData, accessToken).then(
      async ({ data, errors }) => {
        console.log("poseted somethings", data, errors);
        if (data) {
          console.log("succesfully Posted", data);
        } else {
          console.log("error posting data ,", errors);
          // setErrros(errors);
        }
      }
    );

    // // formData.append('code', 'A');
    // formData.append("type", "a");
    // formData.append("is_security_enabled", sslStatusType);
    // formData.append("developed_by", companyName);
    // formData.append("application_url", applicationUrl);
    // formData.append("ip_address", ipAddressUrl);
    // formData.append("development_location", operatorLocation);
    // formData.append("poc_name", contactName);
    // formData.append("poc_email", contactEmail);
    // formData.append("poc_mobile", contactMobile);
    // formData.append("spoc_name", singlePointOfContactName);
    // formData.append("spoc_email", singlePointOfContactEmail);
    // formData.append("spoc_mobile", singlePointOfContactMobile);
    // formData.append("incharge_name", inChargeName);
    // formData.append("incharge_email", inChargeEmail);
    // formData.append("incharge_mobile", inChargeMobile);
    // formData.append("department", hodDepartment.id);
    // formData.append("data_center", dataCenterType);
    // formData.append("data_center_address", postalAddress);
    // formData.append("os", "");

    // if (action) {
    //   EditSoftwareService(headers, applicationId, formData)
    //     .then(({ data, errors: applyErrors }) => {
    //       if (applyErrors && Object.keys(applyErrors).length) {
    //         setApplicationErrors(applyErrors);
    //       } else if (data) {
    //         router.push("/dashboard/assets/software");
    //       }
    //     })
    //     .finally(() => setIsLoading(false));
    // } else {
    //   AddApplicationService(formData, headers)
    //     .then(({ data, errors: applyErrors }) => {
    //       if (applyErrors && Object.keys(applyErrors).length) {
    //         setApplicationErrors(applyErrors);
    //       } else if (data) {
    //         router.push("/dashboard/assets/applications");
    //       }
    //     })
    //     .finally(() => setIsLoading(false));
    // }
  };
  if (errors) {
    return <Page404 errors={errors.nonFieldErrors} />;
  }

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          {" "}
          <span className="visually-hidden">Loading...</span>{" "}
        </Spinner>
      </div>
    );
  }

  return (
    <Card className="pb-3">
      <Card.Header className="pt-3 bg-transparent">
        <div>
          <Button
            className=" float-end"
            onClick={() => router.push("/dashboard/assets/applications")}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Back{" "}
          </Button>
          <h3 className="your-cart">
            {" "}
            {action ? "Edit" : "Add"} Applications{" "}
          </h3>
        </div>
      </Card.Header>
      <Card.Body className="p-0 assetApplication">
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                {" "}
                Department Details{" "}
              </Card.Header>
              <Card.Body className="">
                <Row className="py-1">
                  <Col sm={6}>
                    <Form.Group className="mb-1">
                      <Form.Label>Name of the Department </Form.Label>
                      <Select
                        name="department"
                        isDisabled={type === "DEPARTMENT"}
                        value={departmentType}
                        options={departmentOptions}
                        getOptionLabel={(options) => options.name}
                        getOptionValue={(options) => options.id}
                        onInputChange={(
                          inputValue,
                          { action, prevInputValue }
                        ) => {
                          console.log(inputValue, "input value");
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
                        isSearchable
                        isClearable
                        closeMenuOnSelect
                        onChange={(newValue, actionMeta) => {
                          const { action } = actionMeta;
                          if (
                            action === "select-option" ||
                            action === "remove-value"
                          ) {
                            setDepartmentType(newValue);
                            setHodDepartment("");
                            getHodDepartments(newValue && newValue.id);
                          } else if (action === "clear") {
                            getDepartments("");
                            setHodDepartment("");
                            setDepartmentType("");
                          }
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-1">
                      <Form.Label className="form-required">
                        Name of the HOD/AO/SU
                      </Form.Label>
                      <Select
                        name="hodDepartment"
                        isClearable
                        value={hodDepartment}
                        options={departmentTypeOptions}
                        getOptionLabel={(options) => options.name}
                        getOptionValue={(options) => options.id}
                        isDisabled={type === "DEPARTMENT" || !departmentType}
                        onInputChange={(
                          inputValue,
                          { action, prevInputValue }
                        ) => {
                          switch (action) {
                            case "set-value":
                              return prevInputValue;
                            case "input-change":
                              if (inputValue) {
                                getHodDepartments(
                                  departmentType && departmentType.id,
                                  inputValue
                                );
                              } else {
                                getHodDepartments(
                                  departmentType && departmentType.id,
                                  ""
                                );
                              }
                              return inputValue;
                            default:
                              return inputValue;
                          }
                        }}
                        isSearchable
                        closeMenuOnSelect
                        onChange={(newValue, actionMeta) => {
                          const { action } = actionMeta;
                          if (
                            action === "select-option" ||
                            action === "remove-value"
                          ) {
                            console.log("hod ", newValue);
                            setHodDepartment(newValue);
                          } else if (action === "clear") {
                            setHodDepartment("");
                            getHodDepartments(
                              departmentType && departmentType.id,
                              ""
                            );
                          }
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* <Row className="py-1">
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name of Division/Sub-department </Form.Label>
                      <Select />
                    </Form.Group>
                  </Col>
                </Row> */}
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                {" "}
                Department IT Head details{" "}
              </Card.Header>
              <Card.Body className="">
                <Row className="py-1">
                  <Col sm={6}>
                    <Form.Group className="mb-1">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          setDepartmentITHeadDetails({
                            ...departmentITHeadDetails,
                            departmentITHeadName: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-1">
                      <Form.Label className="form-required">
                        Designation
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          setDepartmentITHeadDetails({
                            ...departmentITHeadDetails,
                            departmentITHeadDesignation: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="py-1">
                  <Col sm={6}>
                    <Form.Group className="mb-1">
                      <Form.Label className="form-required">
                        Official Govt Email ID
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          setDepartmentITHeadDetails({
                            ...departmentITHeadDetails,
                            departmentITHeadOfficialGovtEmailID: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-required">
                        Mobile No.
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          setDepartmentITHeadDetails({
                            ...departmentITHeadDetails,
                            departmentITHeadMobNumber: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                {" "}
                Project Details{" "}
              </Card.Header>
              <Card.Body className="">
                <Row className="py-1">
                  <Col sm={6}>
                    <Form.Group className="mb-1">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          setProjectDetails({
                            ...projectDetails,
                            projectName: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-1">
                      <Form.Label className="form-required">
                        Project SPOC Designation
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          setProjectDetails({
                            ...projectDetails,
                            projectSPOCDesignation: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="py-1">
                  <Col sm={6}>
                    <Form.Group className="mb-1">
                      <Form.Label className="form-required">
                        Project SPOC official Govt Email ID
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          setProjectDetails({
                            ...projectDetails,
                            projectSPOCofficialGovtEmailID: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-required">
                        Project SPOC Mobile No
                      </Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={(e) => {
                          setProjectDetails({
                            ...projectDetails,
                            projectSPOCMobileNo: e.target.value,
                          });
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                {" "}
                System Admin Details{" "}
              </Card.Header>
              <Card.Body className="px-4">
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4} className="mb-1">
                    <Form.Label className="form-required my-2">
                      System Admin - Agency / Service Provider / Vendor Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setSystemAdminDetails({
                          ...systemAdminDetails,
                          systemAdminName: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      System Administrator SPOC Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setSystemAdminDetails({
                          ...systemAdminDetails,
                          systemAdministratorSPOCName: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      System Administrator SPOC Designation
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setSystemAdminDetails({
                          ...systemAdminDetails,
                          systemAdministratorSPOCDesignation: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4} className="mb-3">
                    <Form.Label className="form-required my-2">
                      System Administrator SPOC official Email ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setSystemAdminDetails({
                          ...systemAdminDetails,
                          systemAdministratorSPOCofficialEmailID:
                            e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      System Administrator SPOC Mobile No
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setSystemAdminDetails({
                          ...systemAdminDetails,
                          systemAdministratorSPOCMobileNo: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                {" "}
                Developer Details{" "}
              </Card.Header>
              <Card.Body className="px-4">
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4} className="mb-1">
                    <Form.Label className="form-required my-2">
                      Developer - Agency / Service Provider / Vendor Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDeveloperDetails({
                          ...developerDetails,
                          developerName: "",
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Developer SPOC Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDeveloperDetails({
                          ...developerDetails,
                          developerSPOCName: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Developer SPOC Designation
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDeveloperDetails({
                          ...developerDetails,
                          developerSPOCDesignation: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4} className="mb-3">
                    <Form.Label className="form-required my-2">
                      Developer SPOC official Email ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDeveloperDetails({
                          ...developerDetails,
                          developerSPOCofficialEmailID: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Developer SPOC Mobile No
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDeveloperDetails({
                          ...developerDetails,
                          developerSPOCMobileNo: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                {" "}
                Application Details{" "}
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Type of Application
                    </Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setTypeOfApplication({
                          type: e.target.value,
                          isWebApp: e.target.value === "Web" ? true : false,
                        });
                      }}
                    >
                      {/* <Form. */}
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Web">Web</option>
                      <option value="Mobile">Mobile</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Name of the domain
                    </Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Web Application Operating system
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Microsoft Windows">
                        Microsoft Windows
                      </option>
                      <option value="Cent OS">Cent OS</option>
                      <option value="Ubuntu">Ubuntu</option>
                      <option value="Unix">Unix</option>
                      <option value="Linux">Linux</option>
                      <option value="Solaris">Solaris</option>
                      <option value="Symbian OS">Symbian OS</option>
                      <option value="Android OS">Android OS</option>
                      <option value="macOS">macOS</option>
                      <option value="Apple iOS">Apple iOS</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Application Tiering
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="2 Tier">2 Tier</option>
                      <option value="3 Tier">3 Tier</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Application type
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Static">Static</option>
                      <option value="Dynamic">Dynamic</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Application Platform
                    </Form.Label>
                    <Form.Select disabled={!typeOfApplication.isWebApp}>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      Java & J2EE with struts
                      <option value="PYTHON">PYTHON</option>
                      <option value="DJANGO">DJANGO</option>
                      <option value="NODEJS">NODEJS</option>
                      <option value="ORACLE FORMS">ORACLE FORMS</option>
                      <option value="JAVA">JAVA</option>
                      <option value=".NET">.NET</option>
                      <option value="RLANGUAGE">R LANGUAGE</option>
                      <option value="JAVA&J2EEWITHSTRUTS">
                        JAVA & J2EE WITH STRUTS
                      </option>
                      {/*<option value="ASP.NET">ASP.NET</option>
                      <option value=".NET CORE">.NET CORE</option>
                      <option value="PHP">PHP</option>
                      <option value="Angular">Angular</option>
                      <option value="React">React</option>
                    <option value="WordPress">WordPress</option> */}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Location of Mobile APP
                    </Form.Label>
                    <Form.Select disabled={typeOfApplication.isWebApp}>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Google Play Store">
                        Google Play Store
                      </option>
                      <option value="App Store">App Store</option>
                      <option value="Both">Both</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Type of Mobile Application
                    </Form.Label>
                    <Form.Select disabled={typeOfApplication.isWebApp}>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="APK">APK</option>
                      <option value="IOS">IOS</option>
                      <option value="Both">Both</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Mobile Application Operating System
                    </Form.Label>
                    <Form.Select disabled={typeOfApplication.isWebApp}>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Andriod">Andriod</option>
                      <option value="IOS">IOS</option>
                      <option value="Windows">Windows</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Whether Containerization / Kubernets is implemented
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Whether copy of Source code with Dept
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Type of Web Server
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Apache">Apache</option>
                      <option value="IIS">IIS</option>
                      <option value="Nginx ">Nginx</option>
                      <option value="LiteSpeed">LiteSpeed</option>
                      <option value="Tomcat">Tomcat</option>
                      <option value="Node.js">Node.js</option>
                      <option value="Caddy">Caddy</option>
                      <option value="OpenLiteSpeed">OpenLiteSpeed</option>
                      <option value="Jigsaw">Jigsaw</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Type of Application Server
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="GlassFish">GlassFish</option>
                      <option value="WildFly">WildFly</option>
                      <option value="WebSphere">WebSphere</option>
                      <option value="Liberty ">Liberty</option>
                      <option value="PayaraServer">Payara Server</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Name of the DB
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="IIS">MS SQL</option>
                      <option value="Oracle">Oracle</option>
                      <option value="MySQL">MySQL</option>
                      <option value="PostgreSQL">PostgreSQL</option>
                      <option value="IBM Db2">IBM Db2</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="MariaDB">MariaDB</option>
                      <option value="Amazon RDS">Amazon RDS</option>
                      <option value="Cassandra">Cassandra</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Whether the DB is dedicated server or a instance?
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Whether Application backup Policy is Active?
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Does Application uses Aadhaar Services?
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Does Application Carryout any financial transactions
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="cust-label-height mb-1">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Name of the Payment Gateway
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Bill desk">Bill desk</option>
                      <option value="CCAvenue">CCAvenue</option>
                      <option value="Paytm">Paytm</option>
                      <option value="Razor pay">Razor pay</option>
                      <option value="MobiKwik">MobiKwik</option>
                      <option value="PayU">PayU</option>
                      <option value="PayPal">PayPal</option>
                      <option value="CashFree">CashFree</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Name of the Bank
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="SBI">State Bank of India</option>
                      <option value="UNION">Union Bank of India</option>
                      <option value="HDFC">HDFC Bank</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="AXIS">Axis Bank</option>
                      <option value="ICICI">Bank of Baroda</option>
                      <option value="AXIS">Bank Of India</option>
                      <option value="CANARA">Canara Bank</option>
                      <option value="INDIAN">Indian Bank</option>
                      <option value="UCO">UCO Bank</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Whether Financial trasaction logs are being captured in
                      the server or not?
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="cust-label-height">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Does Application configured with SSL/TLS certificate?
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Is Security audit completed by CERT-In empanelled agency/
                      APTS?
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Whether Onboarding done with AP Cyber Security Operating
                      (APCSOC)?
                    </Form.Label>
                    <Form.Select>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                {" "}
                Application Hosting Details{" "}
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Whether Application Hosted at AP State Data Centre?
                    </Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setApplicationDetails({
                          ...applicationDetails,
                          HostedAtApdataCenter: e,
                        });
                      }}
                    >
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Application hosted location?
                    </Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        setApplicationDetails({
                          ...applicationDetails,
                          ApplicationHostedLocation: e,
                        });
                      }}
                    >
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="APSDC">APSDC</option>
                      <option value="APSCAN">APSCAN</option>
                      <option value="NIC">NIC</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                If Application Hosted outside APSDC -Mention the data center
                details{" "}
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row className="py-1">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Name of the Data Center/ Service Provider
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDataCenterDetails({
                          ...dataCenterDetails,
                          NameoftheDataCenter: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Location
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDataCenterDetails({
                          ...dataCenterDetails,
                          LocationofDataCenter: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4} className="mb-1">
                    <Form.Label className="form-required my-2">
                      Dedicated server or Virtual Machine or Cloud
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDataCenterDetails({
                          ...dataCenterDetails,
                          Dedicatedserver: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Contract period up to
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDataCenterDetails({
                          ...dataCenterDetails,
                          Contractperiod: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Status of Infrastructure Hardening (Server/Network)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDataCenterDetails({
                          ...dataCenterDetails,
                          statusofInfrastructureHardening: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>{" "}
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              {/* <Card.Header className="vender-text bg-transparent"> Maintenance Charges for the Web/ Mobile application details </Card.Header> */}
              <Card.Body className="px-4 pb-4">
                <Row>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Whether Application is using Software/Hardware Load
                      Balancer
                    </Form.Label>
                    <Form.Select onChange={(e) => {}}>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Development Charges for the Web/ Mobile application (Rs.
                      Lakhs)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setDataCenterDetails({
                          ...dataCenterDetails,
                          DevelopmentCharges: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                {" "}
                Maintenance Charges for the Web/ Mobile application details{" "}
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row className="cust-label-height">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      What are all the maintenance charges for the Web/ Mobile
                      application (per Annum) (Rs. Lakhs)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setCharges({
                          ...charges,
                          maintenancecharges: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Web/ Mobile application Go Live (rollout) Date
                    </Form.Label>
                    <DatePicker
                      placeholderText=" Web/ Mobile application Go Live (rollout) Date"
                      dateFormat="dd-MM-yyyy"
                      // selected={product.start_date ? new Date(product.start_date) : null}
                      selected={charges.GoLiveDate}
                      onChange={(e) => {
                        console.log("the date", e);
                        setCharges({ ...charges, GoLiveDate: e });
                      }}
                      className="date-picker-input"
                    />
                    {/* <Form.Control type="text" /> */}
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Total maintenance charges paid from the date of Web/
                      Mobile application rollout till date (Rs. Lakhs)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setCharges({
                          ...charges,
                          maintenancechargespaidfromthedate: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                {" "}
                Hosting Charges for the Web/ Mobile application details{" "}
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row className="cust-label-height">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      What are all the hosting charges for the Web/Mobile
                      application developed (per Annum) (Rs. Lakhs)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setCharges({
                          ...charges,
                          hostingcharges: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Web/ Mobile application hosting Date
                    </Form.Label>
                    <DatePicker
                      placeholderText="Web/ Mobile application hosting Date"
                      dateFormat="dd-MM-yyyy"
                      // selected={product.start_date ? new Date(product.start_date) : null}
                      selected={charges.hostingDate}
                      onChange={(e) => {
                        setCharges({ ...charges, hostingDate: e });
                      }}
                      className="date-picker-input"
                    />
                    {/* <Form.Control type="text" /> */}
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Total hosting charges paid from the date of Web/ Mobile
                      application till date (Rs. Lakhs)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setCharges({
                          ...charges,
                          hostingchargespaid: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>{" "}
                </Row>
              </Card.Body>
            </Card>
            <Card className="m-3">
              <Card.Header className="vender-text bg-transparent">
                Server details{" "}
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                <Row className="cust-label-height">
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      No. of Servers used for hosting the Web/ Mobile
                      Application
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setServerDetails({
                          ...serverDetails,
                          NoofServersused: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      No. of VCPUs (in Cores) for hosting the Web/ Mobile
                      Application
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setServerDetails({
                          ...serverDetails,
                          NoofVCPUs: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Total RAM (in GB) for hosting the Web/ Mobile Application
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setServerDetails({
                          ...serverDetails,
                          TotalRAM: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Total SAN Storage (in TB) for hosting the Web/ Mobile
                      Application
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setServerDetails({
                          ...serverDetails,
                          TotalSANStorage: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Total NAS Storage (in TB) for hosting the Web/ Mobile
                      Application
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onBlur={(e) => {
                        setServerDetails({
                          ...serverDetails,
                          TotalNASStorage: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={12} md={4}>
                    <Form.Label className="form-required my-2">
                      Domain Name services (DNS) - Service Provider
                    </Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        console.log(e.target.value);
                      }}
                    >
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="" selected disabled>
                        Select..
                      </option>
                      <option value="ITE&C">ITE&C</option>
                      <option value="NIC">NIC</option>
                      <option value="Other">Others</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            <div className="pagenation-style px-3">
              <Button
                className="me-2  px-3"
                onClick={() => router.push("/dashboard/assets/applications")}
                variant="danger"
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel{" "}
              </Button>
              <Button
                variant="success"
                type="submit"
                className="btn btn-success  px-3"
              >
                <FontAwesomeIcon icon={faCheck} /> Submit{" "}
              </Button>
            </div>
            <Form.Control.Feedback type="invalid">
              {" "}
              {applicationErrors.nonfield_errors}{" "}
            </Form.Control.Feedback>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
}
