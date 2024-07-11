import {
  faFilter,
  faPlus,
  faSearch,
  faFileCsv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Spinner,
  Tab,
  Table,
  Tabs,
  Pagination,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import getHeaders from "../../../../libs/utils/getHeaders";
import { SoftwareList } from "../../../../services/dashboard/assets/software";
import getSecretariatDepartments, {
  getHODDepartments,
  getHODDepartmentsById,
} from "../../../../services/dashboard/departments";
import { genericGetService } from "../../../../services/GenericService";
import SecurityAuditModal from "../software/SecurityAuditModal";
import { DeleteSoftwareService } from "../../../../services/dashboard/assets/software";
// import  {getCheckListA}
import { getCheckListAssests } from "../../../../services/auth/checkListAssests";

import DeleteModal from "../software/DeleteModal";
// import ExportModal from "../../../common/ExportModal";
// import moment from "moment";

export default function ApplicationTable() {
  const router = useRouter();
  const {
    query: { search, department, dataCenter, page, os },
  } = router;
  const [key, setKey] = useState("application");
  const [applicationData, setApplicationData] = useState([]);
  const [mobileApplicationData, setMobileApplicationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState(search);
  const [count, setCount] = useState();
  const [previousPage, setPreviousPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [showFilters, setShowFilter] = useState(false);
  const [hodDepartmentOptions, setHodDepartmentOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [dataCenterOptions, setDataCenterOptions] = useState([]);
  const [OSOptions, setOSOptions] = useState([]);
  const [hodDepartmentType, setHodDepartmentType] = useState("");
  const [departmentType, setDepartmentType] = useState();
  const [defaultDepartmentId, setDefaultdepartmentId] = useState(department);
  const [dataCenterType, setDataCenterType] = useState(dataCenter);
  const [OSType, setOSType] = useState(os);
  const [securityModal, setSecurityModal] = useState();
  const [securityData, setSecurityData] = useState();
  const [editData, setEditData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setTodDate] = useState();

  const {
    accessToken,
    userDetails: { type },
  } = useSelector((state) => state.user);

  const headers = getHeaders(accessToken);

  const getApplicationDataCheckListAssets = () => {
    getCheckListAssests(headers).then(({ data, errors }) => {
      if (data) {
        console.log("data fetched from api ", data);
        setApplicationData(data.results);
      } else {
        // errors
        console.log("error While Feteching the data", errors);
      }
    });
  };

  const getDepartments = (searchValue) => {
    getSecretariatDepartments(searchValue, headers).then(({ data, errors }) => {
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

  useEffect(() => {
    if (defaultDepartmentId) {
      getHODDepartmentsById(defaultDepartmentId, headers).then(({ data }) => {
        setDepartmentType(data.parent);
        setHodDepartmentType(data);
      });
    }
  }, []);
  const getHodDepartments = (parentId, searchValue) => {
    getHODDepartments(searchValue, parentId, headers)
      .then(({ data: { results, previous, next, count }, errors }) => {
        if (errors) {
          console.log("errors", errors);
        } else {
          setHodDepartmentOptions(results);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDepartments("");
    getHodDepartments("");
    getApplicationDataCheckListAssets();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    genericGetService("/admin/data-centers/", headers).then(
      ({ data, errors }) => {
        if (errors) {
          console.log("errors", errors);
        }
        if (data) {
          setDataCenterOptions(data.results);
        } else {
          setDataCenterOptions([]);
        }
      }
    );

    genericGetService("/admin/operating-systems/", headers)
      .then(({ data, errors }) => {
        if (errors) {
          console.log("errors", errors);
        }
        if (data) {
          setOSOptions(data);
        } else {
          setOSOptions([]);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  // useEffect(() => {
  //   if (key === "application") {
  //     SoftwareList(accessToken, "/admin/software-assets/?type=a").then(
  //       ({ data, errors }) => {
  //         if (errors) {
  //           console.log("errors: ", errors);
  //         }
  //         if (data) {
  //           const { results, count, previous, next } = data;
  //           setApplicationData(results);
  //           setCount(count);
  //           setPreviousPage(previous);
  //           setNextPage(next);
  //         }
  //       }
  //     );
  //   } else {
  //     SoftwareList(accessToken, "/admin/software-assets/?type=m").then(
  //       ({ data, errors }) => {
  //         if (errors) {
  //           console.log("errors: ", errors);
  //         }
  //         if (data) {
  //           const { results, count, previous, next } = data;
  //           setMobileApplicationData(results);
  //           setCount(count);
  //           setPreviousPage(previous);
  //           setNextPage(next);
  //         }
  //       }
  //     );
  //   }
  // }, [key]);

  // useEffect(() => {
  //   const newQuery = {
  //     dataCenter: dataCenterType || "",
  //     page,
  //     os: OSType || "",
  //     department: (hodDepartmentType && hodDepartmentType.id) || "",
  //   };

  //   Object.keys(newQuery).forEach((mapItem) => {
  //     if (!newQuery[mapItem]) {
  //       delete newQuery[mapItem];
  //     }
  //   });

  //   if (Object.keys(newQuery).length) {
  //     setShowFilter(true);
  //   }
  //   router.push({
  //     pathname: "/dashboard/assets/applications",
  //     query: newQuery,
  //   });

  //   if (searchText) {
  //     const delayDebounceFn = setTimeout(() => {
  //       if (key === "application") {
  //         setIsLoading(true);
  //         router.push({
  //           pathname: "/dashboard/assets/applications",
  //           query: { search: searchText },
  //         });
  //         SoftwareList(
  //           accessToken,
  //           `/admin/software-assets/?type=a&search=${searchText}`
  //         )
  //           .then(({ data: { results, previous, next, count }, error }) => {
  //             setApplicationData(results);
  //             setCount(count);
  //             setPreviousPage(previous);
  //             setNextPage(next);
  //           })
  //           .finally(() => {
  //             setIsLoading(false);
  //           });
  //       } else {
  //         setIsLoading(true);
  //         router.push({
  //           pathname: "/dashboard/assets/applications",
  //           query: { search: searchText },
  //         });
  //         SoftwareList(
  //           accessToken,
  //           `/admin/software-assets/?type=m&search=${searchText}`
  //         )
  //           .then(({ data: { results, previous, next, count }, error }) => {
  //             setMobileApplicationData(results);
  //             setCount(count);
  //             setPreviousPage(previous);
  //             setNextPage(next);
  //           })
  //           .finally(() => {
  //             setIsLoading(false);
  //           });
  //       }
  //     }, 1000);
  //     return () => clearTimeout(delayDebounceFn);
  //   }

  //   setIsLoading(true);
  //   if (key === "application") {
  //     // SoftwareList(
  //     //   accessToken,
  //     //   `/admin/software-assets/?type=a&page=${page || 1}&data_center=${
  //     //     dataCenterType || ""
  //     //   }&os=${OSType || ""}&department=${
  //     //     (hodDepartmentType && hodDepartmentType.id) || ""
  //     //   }`
  //     // )
  //     //   .then(({ data, data: { results, previous, next, count }, errors }) => {
  //     //     console.log(data, errors);
  //     //     setApplicationData(results);
  //     //     setCount(count);
  //     //     setPreviousPage(previous);
  //     //     setNextPage(next);
  //     //   })
  //     //   .finally(() => {
  //     //     setIsLoading(false);
  //     //   });
  //   } else {
  //     SoftwareList(
  //       accessToken,
  //       `/admin/software-assets/?type=m&page=${page || 1}&data_center=${dataCenterType || ""
  //       }&os=${OSType || ""}&department=${(hodDepartmentType && hodDepartmentType.id) || ""
  //       }`
  //     )
  //       .then(({ data, data: { results, previous, next, count }, errors }) => {
  //         setMobileApplicationData(results);
  //         setCount(count);
  //         setPreviousPage(previous);
  //         setNextPage(next);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, [searchText, hodDepartmentType, dataCenterType, OSType]);

  // useEffect(() => {
  //   if(departmentType){

  //   console.log("dpeartment changedd", departmentType);
  //   setApplicationData((prev) => {
  //     let temp = [...prev];
  //     return temp.filter((application) => {
  //       console.log(
  //         "appclition departm",
  //         application.department,
  //         departmentType.id
  //       );
  //       return application.department == departmentType.id;
  //     });
  //     // console.log("temp ager filter ", temp, filtered);

  //     // return temp;
  //   });
  // }
  // else{

  // }

  // }, [departmentType]);

  // const handlePath = (path) => {
  //   router.push({
  //     pathname: "/dashboard/assets/software",
  //     query: {
  //       dataCenter,
  //       os,
  //       department,
  //       page:
  //         (path.includes("page") && path.split("page=")[1].split("&")[0]) || 1,
  //     },
  //   });
  //   setIsLoading(true);
  //   const pageNum =
  //     (path.includes("page") && path.split("page=")[1].split("&")[0]) || 1;

  //   if (key === "application") {
  //     SoftwareList(
  //       accessToken,
  //       `/admin/software-assets/?type=a&page=${pageNum || 1}&data_center=${dataCenterType || ""
  //       }&os=${OSType || ""}&department=${(hodDepartmentType && hodDepartmentType.id) || ""
  //       }`
  //     )
  //       .then(({ data: { results, previous, next, count }, errors }) => {
  //         setApplicationData(results);
  //         setCount(count);
  //         setPreviousPage(previous);
  //         setNextPage(next);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   } else {
  //     SoftwareList(
  //       accessToken,
  //       `/admin/software-assets/?type=m&page=${page || 1}&department=${hodDepartmentType.id || ""
  //       }&data_center=${dataCenterType || ""}&os=${OSType || ""}`
  //     )
  //       .then(({ data, data: { results, previous, next, count }, errors }) => {
  //         setMobileApplicationData(results);
  //         setCount(count);
  //         setPreviousPage(previous);
  //         setNextPage(next);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // };

  const renderFilters = () => (
    <Card className="p-3 light-purple-color">
      <Form noValidate>
        <Form.Group className="mb-3">
          <Row>
            {!(type === "DEPARTMENT") && (
              <>
                <Col xs={12} md={3}>
                  <Form.Label>Name of the Department</Form.Label>
                  <Select
                    name="departmentType"
                    value={departmentType}
                    options={departmentOptions}
                    getOptionLabel={(options) => options.name}
                    getOptionValue={(options) => options.id}
                    onInputChange={(inputValue, { action, prevInputValue }) => {
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
                        getHodDepartments(newValue && newValue.id);
                      } else if (action === "clear") {
                        getDepartments("");
                        setHodDepartmentType("");
                        setDepartmentType("");
                        getHodDepartments("", "");
                      }
                    }}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <Form.Label>Project Name</Form.Label>
                  <Select
                    name="dependant_on"
                    isClearable
                    value={hodDepartmentType}
                    options={hodDepartmentOptions}
                    getOptionLabel={(options) => options.name}
                    getOptionValue={(options) => options.id}
                    isSearchable
                    closeMenuOnSelect
                    onChange={(newValue, actionMeta) => {
                      const { action } = actionMeta;
                      if (
                        action === "select-option" ||
                        action === "remove-value"
                      ) {
                        setHodDepartmentType(newValue);
                      } else if (action === "clear") {
                        setDefaultdepartmentId("");
                        setHodDepartmentType("");
                      }
                    }}
                  />
                </Col>
              </>
            )}
            <Col xs={12} md={3}>
              <Form.Label>Type of Application</Form.Label>
              <Form.Select
                id="dataCenterType"
                name="dataCenterType"
                value={dataCenterType}
                onChange={(e) => {
                  setDataCenterType(e.target.value);
                }}
              >
                <option value="">Select</option>
                {dataCenterOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={3}>
              <Form.Label>Name of the Data Center</Form.Label>
              <Form.Select
                id="OSType"
                name="OSType"
                value={OSType}
                onChange={(e) => {
                  setOSType(e.target.value);
                }}
              >
                <option value="">Select</option>
                {OSOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Card>
  );
  const getDepartmentNameFromId = (id) => {
    const de = departmentOptions.filter((dep) => dep.id === id);
    console.log("ddde", de);
    return de.length > 0 ? de[0].name : "Test";
  };

  const renderTableData = (values) => {
    const tableRows = [];
    if (values) {
      values.map((item) => {
        tableRows.push(
          <tr>
            <td className="" style={{ whiteSpace: "pre-wrap" }}>
              &nbsp;{item.id}
            </td>
            <td className="" style={{ whiteSpace: "pre-wrap" }}>
              &nbsp;{getDepartmentNameFromId(item.department)}
            </td>
            <td className="" style={{ whiteSpace: "pre-wrap" }}>
              &nbsp;
            </td>
            <td className="" style={{ whiteSpace: "pre-wrap" }}>
              &nbsp;{item.system_admin_spoc_name}
            </td>
            <td className="" style={{ whiteSpace: "pre-wrap" }}>
              &nbsp;{item.system_admin_spoc_mobileno}
            </td>

            <td className="" style={{ whiteSpace: "pre-wrap" }}>
              &nbsp;
            </td>
          </tr>
        );
      });
    }
    return tableRows;
  };

  if (isLoading) {
    return (
      <div className="tender-loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Card className="pb-3">
      <Card.Header className="bg-transparent">
        <div className="">
          <div className="">
            <Row>
              <Col xs={12} md={6}>
                <h2 className="your-cart">Applications</h2>
              </Col>
              <Col xs={12} md={6}>
                <div className="d-flex justify-content-end">
                  {/*  <InputGroup size="md">
                    <InputGroup.Text id="basic-addon1">
                      {" "}
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Search Here.."
                      aria-label="Username"
                      value={searchText}
                      onChange={(e) => {
                        router.push({
                          pathname: "/dashboard/assets/applications",
                          query: { search: e.target.value },
                        });
                        setSearchText(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />{" "}
                  </InputGroup>
                  <Button
                    variant="primary"
                    className="mx-3"
                    onClick={() => setShowFilter(!showFilters)}
                  >
                    <FontAwesomeIcon icon={faFilter} />
                  </Button> */}
                  <Button
                    variant="primary"
                    className="me-2 "
                    onClick={() =>
                      router.push(
                        "/dashboard/assets/applications/add-applications"
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add Application
                  </Button>

                  {/*  <Button
                    variant="primary"
                    onClick={() => setShowExportModal(true)}
                    className="float-end"
                  >
                    <FontAwesomeIcon
                      icon={faFileCsv}
                      className="mt-1"
                      size="lg"
                    />
                  </Button>  */}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <SecurityAuditModal
          show={securityModal}
          onHide={() => {
            setSecurityModal(false);
            setSecurityData("");
          }}
          onClose={() => {
            setSecurityModal(false);
            setSecurityData("");
          }}
          securityAuditData={securityData}
        />

        {showFilters && renderFilters()}
        {/* <WebApplicationTable
        applicationData={applicationData}
        isLoading={isLoading}
        count={count}
        previousPage={previousPage}
        nextPage={nextPage}
        handlePath={handlePath}
        setSecurityModal={(item) => {
          setSecurityModal(true);
          setSecurityData(item);
        }}
      /> */}
        <div>
          <DeleteModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            data={editData}
            onClose={() => {
              setShowDeleteModal(false);
              router.reload();
            }}
            deleteService={DeleteSoftwareService}
          />

          <Table bordered hover responsive>
            <thead>
              <tr>
                <th className="" style={{ whiteSpace: "pre-wrap" }}>
                  Id
                </th>
                <th className="" style={{ whiteSpace: "pre-wrap" }}>
                  Department
                </th>
                <th className="" style={{ whiteSpace: "pre-wrap" }}>
                  Project Name
                </th>

                <th className="" style={{ whiteSpace: "pre-wrap" }}>
                  Contact Person
                </th>

                <th className="" style={{ whiteSpace: "pre-wrap" }}>
                  Contact Number
                </th>

                <th className="" style={{ whiteSpace: "pre-wrap" }}>
                  Name of the Data Center
                </th>
              </tr>
            </thead>
            <tbody>
              {applicationData && applicationData.length ? (
                renderTableData(applicationData)
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-3 text-danger fw-bold"
                  >
                    NO DATA FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {/* <ExportModal
            show={showExportModal}
            onHide={() => setShowExportModal(false)}
            onClose={() => setShowExportModal(false)}
            path={`/admin/export/dsc/?from_date=${moment(fromDate).format(
              "YYYY-MM-DD"
            )}&to_date=${moment(toDate).format("YYYY-MM-DD")}`}
            title="DSC"
            toDate={toDate}
            setTodDate={setTodDate}
            fromDate={fromDate}
            setFromDate={setFromDate}
          /> */}
          <Pagination className="pagenation-style">
            <Pagination.Prev
              onClick={() => handlePath(previousPage)}
              disabled={!previousPage}
            >
              &laquo; Previous
            </Pagination.Prev>
            <Pagination.Next
              onClick={() => handlePath(nextPage)}
              disabled={!nextPage}
            >
              Next &raquo;
            </Pagination.Next>
          </Pagination>
        </div>
      </Card.Body>
    </Card>
  );
}
