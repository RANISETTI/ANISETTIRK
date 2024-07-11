import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button, Col, Container, Form, Modal, Row, Spinner,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import Api from '../../config/Api';
import getHeaders from '../../libs/utils/getHeaders';
import DeleteModal from '../common/modals/DeleteModal';

function RenderChildAndSubChild({
  mapItem, uid, headers, getChildTandC, selectedTandC, setSelectedChild,
}) {
  const [showChild, setShowChild] = useState(false);
  const [childTandCItems, setChildTandCItems] = useState([]);
  const [formLoading, setFormLoading] = useState(true);
  const [isParentSelected, setIsParentSelected] = useState(false);
  useEffect(() => {
    setSelectedChild([]);
  }, [showChild]);

  const getSubChildTandC = (id) => {
    setFormLoading(true);
    Axios.get(Api.getChildAdminTandC(id), { headers }).then(({ data }) => {
      Axios.get(Api.getTermsAndConditions(uid), { headers }).then(({ data: results }) => {
        setChildTandCItems([]);
        if (results.length) {
          data.map((dataMapItem) => {
            results.forEach((filteredItem) => {
              if (mapItem.id === filteredItem.terms_and_condition.id) {
                setIsParentSelected(true);
              } else {
                setIsParentSelected(false);
              }
              if (filteredItem.terms_and_condition.id === dataMapItem.id) {
                dataMapItem.checked = true;
                dataMapItem.deleteId = filteredItem.id;
              }
            });
            return dataMapItem;
          });
        }
        setChildTandCItems(data);
        setFormLoading(false);
        // setClauseModal(true);
      })
        .catch((err) => {
          console.log('err', err);
          setFormLoading(false);
        });
      // setClauseModal(true);
    })
      .catch((err) => {
        console.log('err', err);
        setFormLoading(false);
      });
  };
  useEffect(() => {
    if (showChild) {
      if (mapItem.id) {
        getSubChildTandC(mapItem.id);
      }
    }
  }, [showChild]);

  return (
    <div>
      <div className="d-flex my-5">
        <div style={{ marginRight: '30px' }}>

          <Button
            variant="primary"
            className="w-100"
            onClick={() => {
              setShowChild(!showChild);
              if (showChild) {
                setChildTandCItems([]);
              }
            }}
          >
            {showChild ? '-' : '+' }

          </Button>
        </div>
        {
          mapItem.checked ? (
            <Form.Check
              type="checkbox"
              checked={mapItem.checked}
              onClick={() => {
                Axios.delete(Api.deleteTermsAndConditions(uid, mapItem.deleteId), { headers })
                  .then((res) => {
                    getChildTandC(selectedTandC.id);
                  // getSelectedTandC();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />

          ) : (
            <Form.Check
              type="checkbox"
              onClick={() => {
                setSelectedChild((prevState) => {
                  if (prevState.filter((filterItem) => filterItem === mapItem.id).length) {
                    return prevState.filter((filterItem) => filterItem !== mapItem.id);
                  }
                  return [...prevState, mapItem.id];
                });
              }}
            />

          )
        }
        <div>
          <p className="mx-3 font-weight-bold">{mapItem.name}</p>
          <p className="mx-3">{mapItem.description}</p>
        </div>
      </div>
      {showChild ? formLoading ? (
        <div className="no-height-loading">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : childTandCItems.map((subChildmapitems) => (
        <div className="mx-5 px-5">
          <div className="d-flex">
            {
            subChildmapitems.checked ? (
              <Form.Check
                type="checkbox"
                checked={subChildmapitems.checked}
                onClick={() => {
                  Axios.delete(Api.deleteTermsAndConditions(uid, subChildmapitems.deleteId), { headers })
                    .then((res) => {
                      getChildTandC(selectedTandC.id);
                    // getSelectedTandC();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />

            ) : (
              <Form.Check
                type="checkbox"
                onClick={() => {
                  setSelectedChild((prevState) => {
                    if (prevState.filter((filterItem) => filterItem === subChildmapitems.id).length) {
                      return prevState.filter((filterItem) => filterItem !== subChildmapitems.id);
                    }
                    return [...prevState, subChildmapitems.id];
                  });
                }}
              />

            )
          }
            <div>
              <p className="mx-3 font-weight-bold">{subChildmapitems.name}</p>
              <p className="mx-3">{subChildmapitems.description}</p>
            </div>
          </div>
        </div>
      )) : null}
    </div>
  );
}
function MyVerticallyCenteredModal(props) {
  const { questions } = props;
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const formValuesHandler = (attribute, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [attribute]: value,
    }));
    if (formErrors[attribute]) {
      delete formErrors[attribute];
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-dark text-primary">
        <Modal.Title id="contained-modal-title-vcenter">
          Terms and Conditions Questions
        </Modal.Title>
        <button type="button" className="btn-close btn-close-white" onClick={props.onHide} aria-label="Close" />
      </Modal.Header>
      <Modal.Body>
        <div className="mx-5 my">
          {
            questions.map((mapItem) => (
              <div>
                <p>{mapItem.name}</p>
                <Form.Control value={formValues[mapItem.id]} type="text" placeholder={mapItem.name} onChange={(e) => formValuesHandler(mapItem.id, e.target.value)} />
                {/* <p style={{ color: 'red' }}>{formErrors.mapItem.id}</p> */}
              </div>
            ))
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
function ClausesModal(props) {
  const {
    show, onHide, selectedTandC, headers, uid, getAllTandC,
    // handleSubmit, childTandCItems,
  } = props;
  const [selectedChild, setSelectedChild] = useState([]);
  const [childTandCItems, setChildTandCItems] = useState([]);
  const [formLoading, setFormLoading] = useState(true);
  const [isParentSelected, setIsParentSelected] = useState(false);
  useEffect(() => {
    setSelectedChild([]);
  }, [show]);

  const getChildTandC = (id) => {
    setFormLoading(true);
    Axios.get(Api.getChildAdminTandC(id), { headers }).then(({ data }) => {
      Axios.get(Api.getTermsAndConditions(uid), { headers }).then(({ data: results }) => {
        setChildTandCItems([]);
        if (results.length) {
          data.map((mapItem) => {
            results.forEach((filteredItem) => {
              if (selectedTandC.id === filteredItem.terms_and_condition.id) {
                setIsParentSelected(true);
              } else {
                setIsParentSelected(false);
              }
              if (filteredItem.terms_and_condition.id === mapItem.id) {
                mapItem.checked = true;
                mapItem.deleteId = filteredItem.id;
              }
            });
            return mapItem;
          });
        }
        setChildTandCItems(data);
        setFormLoading(false);
        // setClauseModal(true);
      })
        .catch((err) => {
          console.log('err', err);
          setFormLoading(false);
        });
      // setClauseModal(true);
    })
      .catch((err) => {
        console.log('err', err);
        setFormLoading(false);
      });
  };
  useEffect(() => {
    if (show) {
      if (selectedTandC.id) {
        getChildTandC(selectedTandC.id);
        setChildTandCItems([]);
      }
    }
  }, [show]);
  const handleSubmit = () => {
    // document.body.style.cursor = 'wait';

    Axios.post(
      Api.postTermsAndConditions(uid),
      { terms_and_condition: selectedTandC.id },
      { headers },
    )
      .then(() => {
        getAllTandC();
        onHide();
        // getSelectedTandC();
      })
      .catch((err) => {
        console.log(err);
      });
    const promises = [];

    selectedChild.forEach((mapItem) => {
      promises.push(
        Axios.post(Api.postTermsAndConditions(uid), { terms_and_condition: mapItem }, { headers }),
      );
    });
    Promise.all(promises)
      .then(() => {
        getAllTandC();
        onHide();
        // getSelectedTandC();
      })
      .catch((err) => {
        console.log(err);
      });
    // getChildTandC(selectedTandC.id);
  };
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-dark text-primary">
        <Modal.Title id="contained-modal-title-vcenter">
          {selectedTandC.name}
          {' '}
          Clauses
        </Modal.Title>
        <button type="button" className="btn-close btn-close-white" onClick={onHide} aria-label="Close" />
      </Modal.Header>
      <Modal.Body>
        <div className="mx-2">
          {/* <div className="d-flex justify-content-end">
            {
              isParentSelected ? (
                <Button onClick={() => handleSubmit(selectedChild, selectedTandC)}>Delete</Button>
              ) : (
                <Button onClick={() => handleSubmit(selectedChild, selectedTandC)}>Select</Button>
              )
            }

          </div> */}
          {
            formLoading ? (
              <div className="tender-loading">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )
              : (
                <div>
                  <div className="d-flex">
                    <p className=" mx-3font-weight-bold">{selectedTandC.name}</p>
                  </div>
                  <p className="">{selectedTandC.description}</p>
                  <div className="px-3">
                    {childTandCItems && childTandCItems.map((mapItem) => (
                      <RenderChildAndSubChild
                        mapItem={mapItem}
                        uid={uid}
                        headers={headers}
                        getChildTandC={getChildTandC}
                        selectedTandC={selectedTandC}
                        setSelectedChild={setSelectedChild}
                      />

                    ))}
                  </div>
                </div>
              )
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="text" onClick={onHide}>Close</Button>
        <Button onClick={() => handleSubmit(selectedChild, selectedTandC)}>{childTandCItems && childTandCItems.length ? 'Submit' : 'Select'}</Button>
      </Modal.Footer>
    </Modal>
  );
}

function TAndC() {
  const [getDataLoading, setGetDataLoading] = useState(true);
  const [allTandC, setAllTandC] = useState([]);
  const [selectedTandC, setSelectedTandC] = useState([]);
  const [activeTandC, setActiveTandC] = useState({});
  const [questions, setQuestions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTermsAndCondition, setDeleteTermsAndCondition] = useState({});

  const router = useRouter();
  const { query: { categoryId } } = router;

  const [formErrors, setFormErrors] = useState({});
  const [nonFieldErrors, setNonFieldErrors] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [clauseModal, setClauseModal] = useState(false);

  const { uid } = useSelector((state) => state.quotation);
  const { accessToken } = useSelector((state) => state.user);
  const headers = getHeaders(accessToken);

  const getSelectedTandC = () => {
    Axios.get(Api.postTandC(uid), { headers }).then(({ data }) => {
      // setQuestions(data);
      setSelectedTandC(data.results);
      document.body.style.cursor = 'auto';
    })
      .catch((err) => {
        console.log('err', err);
      });
  };
  const deleteSelectedTandC = (deleteId) => {
    document.body.style.cursor = 'wait';
    Axios.delete(Api.deleteTandC(uid, deleteId), { headers }).then(() => {
    })
      .catch((err) => {
        console.log('err', err);
      });
  };
  const getAllTandC = () => {
    setGetDataLoading(true);
    Axios.get(Api.getAdminTandC, { headers }).then(({ data }) => {
      // console.log(data);
      Axios.get(Api.getTermsAndConditions(uid), { headers }).then(({ data: results }) => {
        data.map((mapItem) => {
          results.forEach((filteredItem) => {
            if (filteredItem.terms_and_condition.id === mapItem.id) {
              mapItem.checked = true;
              mapItem.deleteId = filteredItem.id;
            }
          });
          return mapItem;
        });
        setAllTandC(data);
        // setClauseModal(true);
        setGetDataLoading(false);
      })
        .catch((err) => {
          console.log('err', err);
          setGetDataLoading(false);
        });
    })
      .catch((err) => {
        console.log('err', err);
        setGetDataLoading(false);
      });
  };
  useEffect(() => {
    getAllTandC();
    setFormErrors({});
    setNonFieldErrors();
    // getSelectedTandC();
  }, []);

  const callQuestion = (id) => {
    Axios.get(Api.getAdminTandCQuestion(id), { headers }).then(({ data }) => {
      setQuestions(data);
      setModalShow(true);
    })
      .catch((err) => {
        console.log('err', err);
      });
  };
  const handleSubmit = () => {
    // document.body.style.cursor = 'wait';
    const formDataValues = new FormData();

    Axios.post(Api.postTermsAndConditions(uid), formDataValues, { headers })
      .then((res) => {
        getSelectedTandC();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="p-3">
      <Col className="mb-3 d-flex justify-content-between">
        <Button
          variant="primary"
          onClick={() => router.push({
            pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
            query: { step: 4 },
          })}
        >
          Back

        </Button>
        <Button
          variant="primary"
          onClick={() => router.push({
            pathname: `/dashboard/procurement/new/customized-product/${categoryId}`,
            query: { step: 6 },
          })}
        >
          Next

        </Button>
      </Col>
      {
        getDataLoading ? (
          <div style={{ height: '70vh' }}>
            <div className="cust-spinner h-100">
              <Spinner animation="border" />
            </div>
          </div>

        ) : (
          <div className="m-5 border border-dark">
            <div className=" p-3 text-white font-weight-bold">
              <strong className="text-black">
                Additional Terms and Conditions
                ( Click on the appropriate Group below and add the ATC specific to that Group )
              </strong>
            </div>
            <div className="p-3">
              <div>
                <Container>
                  <Row className="m-2">
                    {
                    allTandC && allTandC.map((mapItem) => mapItem.parent === null && (
                      <Col xs={4}>
                        <div className="d-flex">

                          <Button
                            type="button"
                            variant={mapItem.checked ? 'success' : 'primary'}
                            className="text-white text-center p-1 my-2 border-0 w-100"
                            onClick={() => {
                              setActiveTandC(mapItem);
                              setClauseModal(true);
                              // handleSubmit(mapItem.id);
                            }}
                          >
                            {mapItem.name}
                          </Button>
                          {
                            mapItem.checked && (
                              <div className="d-flex">
                                {
                                  mapItem.question_required && (
                                  <button
                                    type="button"
                                    variant="text"
                                    className="my-auto mx-1  bg-white border-0 "
                                    onClick={() => {
                                      callQuestion(mapItem.id);
                                    }}
                                  >
                                    <FontAwesomeIcon className="my-auto  text-primary" icon={faPenToSquare} />
                                  </button>

                                  )
                                }
                                <Button
                                  variant="text"
                                  onClick={() => {
                                    // setGetDataLoading(true);
                                    setShowDeleteModal(true);
                                    setDeleteTermsAndCondition(mapItem);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    className="my-auto  text-danger"
                                    icon={faTrash}
                                  />
                                </Button>
                              </div>

                            )
                          }
                        </div>
                      </Col>
                    ))
                  }
                  </Row>
                </Container>
              </div>
              {
              selectedTandC && selectedTandC.map((mapItem) => (
                <div className="p-4 w-100">
                  <div
                    className="position-relative w-100 border border-dark p-4"
                  >
                    <button
                      type="button"
                      disabled
                      className="bg-dark  text-white text-center p-1 my-2 border-0 w-25"
                    >
                      {mapItem.terms_and_condition.name}
                    </button>
                    <p>{mapItem.terms_and_condition.description}</p>
                    <div className="position-absolute end-0 bottom-0 d-flex flex-column">
                      {
                        mapItem.terms_and_condition.question_required && (
                          <div className="d-flex">
                            <button
                              type="button"
                              className="bg-primary text-white border-0 my-1"
                              onClick={() => {
                                callQuestion(mapItem.terms_and_condition.id);
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                          </div>

                        )
                      }
                      <button
                        type="button"
                        className="bg-danger text-white border-0"
                        onClick={() => {
                          deleteSelectedTandC(mapItem.id);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }

              {/* <Button onClick={() => handleSubmit()}>Submit</Button> */}
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => {
                  setModalShow(false);
                  setQuestions([]);
                }}
                questions={questions}
              />
              <ClausesModal
                show={clauseModal}
                selectedTandC={activeTandC}
                onHide={() => setClauseModal(false)}
                uid={uid}
                handleSubmit={handleSubmit}
                headers={headers}
                getAllTandC={getAllTandC}
              />
            </div>
          </div>

        )
      }

      <DeleteModal
        show={showDeleteModal}
        onHide={() => { setShowDeleteModal(false); }}
        onClose={() => { setShowDeleteModal(false); }}
        id={deleteTermsAndCondition.id}
        type="this Terms and Condition"
        handleDelete={() => {
          Axios.delete(
            Api.deleteTermsAndConditions(uid, deleteTermsAndCondition.deleteId),
            { headers },
          )
            .then((res) => {
              getAllTandC();
              setShowDeleteModal(false);
            // getSelectedTandC();
            })
            .catch((err) => {
              console.log(err);
              setGetDataLoading(false);
            });
        }}
      />
    </div>
  );
}

export default TAndC;
