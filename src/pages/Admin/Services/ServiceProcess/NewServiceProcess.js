import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Row,
  Col,
  FormSelect,
  Button,
} from "react-bootstrap";
import { FiMinusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  createProcessTemplate,
  getAllTemplates,
} from "../../../../redux/Admin/ServiceSlice";
import { toast } from "react-toastify";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdOutlineExpandMore } from "react-icons/md";
import {
  editOrder,
  getAllOrders,
  getOrderByOrderId,
} from "../../../../redux/User/BookingSlice";
import { IoArrowBackOutline } from "react-icons/io5";

const NewServiceProcess = ({ backToList }) => {
  const dispatch = useDispatch();
  const [processData, setProcessData] = useState([]);
  const [extraSubProcesses, setExtraSubProcesses] = useState({});
  const [orderId, setOrderId] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState();
  const [selectedProcess, setSelectedProcess] = useState();
  const [descriptionData, setDescriptionData] = useState();
  const [processList, setProcessList] = useState([]);

  const addSubProcess = (index) => {
    const updated = [...processList];

    updated[index].subProcesses.push({
      subProcessName: "",
      name: "",
      subProcessDescription: "",
      isCompleted: false,
    });

    setProcessList(updated);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedOrderId) {
        toast.error("Please select an order");
        return;
      }

      const finalPayloads = [];
      if (orderData?.processes?.length > 0) {
        orderData.processes.forEach((proc) => {
          proc.subProcesses?.forEach((sub) => {
            finalPayloads.push({
              processName: proc.processName,
              processDescription: proc.processDescription,
              name: sub.name,
              subProcessDescription: sub.subProcessDescription,
              updateData: {},
            });
          });

          const extras = extraSubProcesses[proc.processName] || [];
          extras.forEach((sub) => {
            if (sub.subProcessName) {
              finalPayloads.push({
                processName: proc.processName,
                processDescription: proc.processDescription,
                name: sub.subProcessName,
                subProcessDescription: sub.description,
                updateData: {},
              });
            }
          });
        });
      }

      processList.forEach((proc) => {
        if (!proc.selectedProcess) return;

        proc.subProcesses?.forEach((sub) => {
          if (sub.subProcessName) {
            finalPayloads.push({
              processName: proc.selectedProcess,
              processDescription: proc.descriptionData,
              name: sub.subProcessName,
              subProcessDescription: sub.description,
              updateData: {},
            });
          }
        });
      });

      if (finalPayloads.length === 0) {
        toast.error("Please add at least one process with sub-process");
        return;
      }

      await Promise.all(
        finalPayloads.map((payload) =>
          dispatch(editOrder({ orderId: selectedOrderId, payload }))
            .unwrap()
            .then(() => backToList())
        )
      );

      toast.success("Order updated successfully!");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const getColor = (index) => {
    const gradients = [
      "linear-gradient(135deg, #E8FFF5, #DFFFEA)", // 1 mint light
      "linear-gradient(135deg, #FFF4E6, #FFEBD9)", // 2 peach light (updated)
      "linear-gradient(135deg, #EFF4FF, #E4EBFF)", // 3 cool pale blue (updated)
      "linear-gradient(135deg, #FFF8E8, #FFF1D6)", // 4 mild sand (updated)
      "linear-gradient(135deg, #F3FFEA, #E8FFD7)", // 5 fresh green fog (updated)
      "linear-gradient(135deg, #FFF0F6, #FFE4F0)", // 6 soft pink (new)
      "linear-gradient(135deg, #EFFFFF, #DFFFFF)", // 7 aqua breeze (new)
    ];

    return gradients[index % gradients.length];
  };

  const getBorderColor = (index) => {
    const borderColors = [
      "#76c7a1", // 1 mint dark
      "#d79b6c", // 2 peach brownish (updated)
      "#6f8fd9", // 3 blue mid-tone (updated)
      "#d6a446", // 4 golden sand (updated)
      "#75bb64", // 5 natural green (updated)
      "#d4669e", // 6 deep rose pink (new)
      "#50b6b6", // 7 teal aqua (new)
    ];

    return borderColors[index % borderColors.length];
  };

  useEffect(() => {
    dispatch(getAllTemplates())
      .unwrap()
      .then((response) => setProcessData(response?.data || []))
      .catch((error) => toast.error(error.message));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .then((response) => setOrderId(response?.data || []))
      .catch((error) => toast.error(error.message));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedOrderId) return;

    dispatch(getOrderByOrderId(selectedOrderId))
      .unwrap()
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => toast.error(error.message));
  }, [dispatch, selectedOrderId]);

  useEffect(() => {
    if (selectedProcess) {
      const selected = processData.find(
        (item) => item.processName === selectedProcess
      );
      setDescriptionData(selected?.description || "");
    } else {
      setDescriptionData("");
    }
  }, [selectedProcess, processData]);

  return (
    <div>
      <div className="admin-pl-new-service-process">
        <h1 className="admin-pl-new-service-process-header">
          <IoArrowBackOutline
            size={20}
            cursor={"Pointer"}
            onClick={backToList}
            className="me-2"
          />
          New Service Process
        </h1>
        <div className="admin-pl-order-id">
          <FormGroup className="mb-3">
            <FormLabel className="text-muted">
              To Create New Process Select Order
            </FormLabel>
            <InputGroup>
              <Form.Select
                value={selectedOrderId}
                onChange={(e) => {
                  setSelectedOrderId(e.target.value);
                }}
              >
                <option value="">Select Order</option>
                {orderId.map((data, i) => (
                  <option key={i} value={data.orderId}>
                    {data.orderId}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </FormGroup>
        </div>

        {selectedOrderId && (
          <div>
            <div className="mt-4 d-flex flex-column align-items-center">
              {orderData.processes
                ?.slice()
                ?.sort((a, b) => a.order - b.order)
                .map((orderProc, pIndex) => (
                  <div
                    key={`proc-${pIndex}`}
                    className="d-flex align-items-center mb-4"
                    style={{ width: "100%" }}
                  >
                    <div
                      style={{
                        borderRadius: "12px",
                        background: getColor(pIndex),
                        padding: "12px 8px",
                        width: "100%",
                        border: `1px solid ${getBorderColor(pIndex)}`,
                      }}
                    >
                      <Accordion
                        style={{
                          borderRadius: "10px",
                          background: "transparent",
                          boxShadow: "none",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<MdOutlineExpandMore size={20} />}
                        >
                          <div className="d-flex flex-column ms-3">
                            <div className="d-flex align-items-center">
                              <p className="mb-1 fw-bold text-muted">
                                {selectedOrderId}
                              </p>
                              {orderProc.processName && (
                                <p className="text-muted fw-bold mx-2 mb-1">
                                  -
                                </p>
                              )}
                              <p className="text-muted fw-bold mb-1">
                                {orderProc.processName}
                              </p>
                            </div>
                            <p className="text-muted mb-1">
                              {orderProc.processDescription}
                            </p>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails
                          style={{
                            borderTop: `1px solid ${getBorderColor(pIndex)}`,
                          }}
                        >
                          <p className="fw-bold text-muted">Sub Process</p>
                          {orderProc.subProcesses?.map((subProc, sIndex) => (
                            <div
                              key={`api-sub-${pIndex}-${sIndex}`}
                              className="mb-3 d-flex align-items-center gap-3"
                            >
                              <div className="admin-pl-count mb-3">
                                {sIndex + 1}
                              </div>
                              <div className="d-flex flex-column">
                                <p className="fw-bold text-muted mb-1">
                                  {subProc.name}
                                </p>
                                <p className="text-muted">
                                  {subProc.subProcessDescription}
                                </p>
                              </div>
                            </div>
                          ))}
                          {extraSubProcesses[orderProc.processName]?.map(
                            (sub, sIndex) => (
                              <div
                                key={`new-sub-${pIndex}-${sIndex}`}
                                className="p-3 mb-3"
                                style={{
                                  background: "#fff",
                                  borderRadius: 10,
                                  border: `1px solid ${getBorderColor(pIndex)}`,
                                }}
                              >
                                <FiMinusCircle
                                  size={18}
                                  color="red"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => {
                                    const updated = { ...extraSubProcesses };
                                    const list = [
                                      ...(updated[orderProc.processName] || []),
                                    ];
                                    list.splice(sIndex, 1);
                                    updated[orderProc.processName] = list;
                                    setExtraSubProcesses(updated);
                                  }}
                                />

                                <Row className="mt-3">
                                  <Col md={3}>
                                    <Form.Group>
                                      <FormLabel className="fw-bold">
                                        Sub Process Name
                                      </FormLabel>
                                      <InputGroup>
                                        <FormSelect
                                          name="subProcessName"
                                          value={sub.subProcessName || ""}
                                          onChange={(e) => {
                                            const value = e.target.value;
                                            const updated = {
                                              ...extraSubProcesses,
                                            };
                                            const list = [
                                              ...(updated[
                                                orderProc.processName
                                              ] || []),
                                            ];
                                            list[sIndex].subProcessName = value;

                                            const selectedSub = processData
                                              .find(
                                                (item) =>
                                                  item.processName ===
                                                  orderProc.processName
                                              )
                                              ?.defaultSubProcesses?.find(
                                                (sp) => sp.name === value
                                              );

                                            list[sIndex].description =
                                              selectedSub?.description || "";

                                            updated[orderProc.processName] =
                                              list;
                                            setExtraSubProcesses(updated);
                                          }}
                                        >
                                          <option value="">
                                            Select Sub Process Name
                                          </option>
                                          {processData
                                            .find(
                                              (item) =>
                                                item.processName ===
                                                orderProc.processName
                                            )
                                            ?.defaultSubProcesses?.map(
                                              (data, i) => {
                                                const isSelectedInAPI =
                                                  orderProc.subProcesses.some(
                                                    (s) => s.name === data.name
                                                  );

                                                const isSelectedInExtra =
                                                  extraSubProcesses[
                                                    orderProc.processName
                                                  ]?.some(
                                                    (s, idx) =>
                                                      s.subProcessName ===
                                                        data.name &&
                                                      idx !== sIndex
                                                  );

                                                return (
                                                  <option
                                                    key={i}
                                                    value={data.name}
                                                    disabled={
                                                      isSelectedInAPI ||
                                                      isSelectedInExtra
                                                    }
                                                  >
                                                    {data.name}
                                                  </option>
                                                );
                                              }
                                            )}
                                        </FormSelect>
                                      </InputGroup>
                                    </Form.Group>
                                  </Col>

                                  <Col md={6}>
                                    <FormGroup>
                                      <FormLabel className="fw-bold">
                                        Description
                                      </FormLabel>
                                      <Form.Control
                                        value={sub.description || ""}
                                        disabled
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </div>
                            )
                          )}

                          <Button
                            className="mt-3"
                            variant="success"
                            onClick={() => {
                              setExtraSubProcesses((prev) => ({
                                ...prev,
                                [orderProc.processName]: [
                                  ...(prev[orderProc.processName] || []),
                                  { subProcessName: "", description: "" },
                                ],
                              }));
                            }}
                          >
                            + Add Sub Process
                          </Button>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                ))}

              {processList.length > 0 &&
                processList.map((proc, pIndex) => (
                  <div
                    key={`user-${pIndex}`}
                    className="d-flex align-items-center mb-4"
                    style={{ width: "100%" }}
                  >
                    <FiMinusCircle
                      size={22}
                      color="red"
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => {
                        const updated = [...processList];
                        updated.splice(pIndex, 1);
                        setProcessList(updated);
                      }}
                    />

                    <div
                      style={{
                        borderRadius: "12px",
                        background: getColor(pIndex),
                        padding: "12px 8px",
                        width: "100%",
                        border: `1px solid ${getBorderColor(pIndex)}`,
                      }}
                    >
                      <Accordion
                        style={{
                          borderRadius: "10px",
                          background: "transparent",
                          boxShadow: "none",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<MdOutlineExpandMore size={20} />}
                        >
                          <div className="d-flex flex-column ms-3">
                            <div className="d-flex align-items-center">
                              <p className="mb-1 fw-bold text-muted">
                                {selectedOrderId}
                              </p>
                              {proc.selectedProcess && (
                                <p className="text-muted fw-bold mx-2 mb-1">
                                  -
                                </p>
                              )}
                              <p className="text-muted fw-bold mb-1">
                                {proc.selectedProcess}
                              </p>
                            </div>
                            <p className="text-muted mb-1">
                              {proc.descriptionData}
                            </p>
                          </div>
                        </AccordionSummary>

                        <AccordionDetails
                          style={{
                            borderTop: `1px solid ${getBorderColor(pIndex)}`,
                          }}
                        >
                          <Row className="mt-3">
                            <Col md={4}>
                              <Form.Select
                                value={proc.selectedProcess}
                                onChange={(e) => {
                                  const updated = [...processList];
                                  const value = e.target.value;
                                  updated[pIndex].selectedProcess = value;

                                  const selected = processData.find(
                                    (item) => item.processName === value
                                  );
                                  updated[pIndex].descriptionData =
                                    selected?.description || "";

                                  setProcessList(updated);
                                }}
                              >
                                <option value="">Select Process Name</option>

                                {processData.map((data, i) => {
                                  const isAlreadyInOrder =
                                    orderData?.processes?.some(
                                      (orderProc) =>
                                        orderProc.processName ===
                                        data.processName
                                    );

                                  const isAlreadyInNewList = processList.some(
                                    (item, idx) =>
                                      item.selectedProcess ===
                                        data.processName && idx !== pIndex
                                  );

                                  return (
                                    <option
                                      key={i}
                                      value={data.processName}
                                      disabled={
                                        isAlreadyInOrder || isAlreadyInNewList
                                      }
                                    >
                                      {data.processName}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                            </Col>
                          </Row>

                          <div className="d-flex justify-content-end">
                            <div
                              className="admin-pl-sub-process-btn"
                              onClick={() => addSubProcess(pIndex)}
                              style={{ cursor: "pointer" }}
                            >
                              + Add Sub Process
                            </div>
                          </div>

                          {proc.subProcesses?.length > 0 &&
                            proc.subProcesses.map((sub, index) => (
                              <div
                                key={index}
                                className="d-flex align-items-center mt-4"
                              >
                                <FiMinusCircle
                                  size={22}
                                  color="red"
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "10px",
                                  }}
                                  onClick={() => {
                                    const updated = [...processList];
                                    updated[pIndex].subProcesses.splice(
                                      index,
                                      1
                                    );
                                    setProcessList(updated);
                                  }}
                                />
                                <div
                                  style={{
                                    borderRadius: "12px",
                                    background: `white`,
                                    width: "100%",
                                    border: `1px solid ${getBorderColor(
                                      pIndex
                                    )}`,
                                  }}
                                >
                                  <Accordion
                                    style={{
                                      background: "transparent",
                                      boxShadow: "none",
                                    }}
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <MdOutlineExpandMore size={20} />
                                      }
                                    >
                                      <div className="d-flex align-items-center w-100">
                                        <div className="admin-pl-count">
                                          {index + 1}
                                        </div>
                                        <div className="d-flex flex-column ms-3 p-3">
                                          <p className="mb-0 fw-bold text-muted">
                                            {sub.subProcessName ||
                                              "Select Sub Process"}
                                          </p>
                                          <p className="text-muted mb-1">
                                            {sub.description}
                                          </p>
                                        </div>
                                      </div>
                                    </AccordionSummary>

                                    <AccordionDetails
                                      style={{
                                        borderTop: `1px solid ${getBorderColor(
                                          pIndex
                                        )}`,
                                      }}
                                    >
                                      <Row className="mt-3">
                                        <Col md={3}>
                                          <Form.Group>
                                            <FormLabel>
                                              Sub Process Name
                                            </FormLabel>
                                            <InputGroup>
                                              <FormSelect
                                                name="subProcessName"
                                                value={sub.subProcessName || ""}
                                                onChange={(e) => {
                                                  const updated = [
                                                    ...processList,
                                                  ];
                                                  const value = e.target.value;
                                                  updated[pIndex].subProcesses[
                                                    index
                                                  ].subProcessName = value;

                                                  const selectedSub =
                                                    processData
                                                      .find(
                                                        (item) =>
                                                          item.processName ===
                                                          proc.selectedProcess
                                                      )
                                                      ?.defaultSubProcesses?.find(
                                                        (sp) =>
                                                          sp.name === value
                                                      );

                                                  updated[pIndex].subProcesses[
                                                    index
                                                  ].description =
                                                    selectedSub?.description ||
                                                    "";

                                                  setProcessList(updated);
                                                }}
                                              >
                                                <option value="">
                                                  Select Sub Process Name
                                                </option>
                                                {processData
                                                  .find(
                                                    (item) =>
                                                      item.processName ===
                                                      proc.selectedProcess
                                                  )
                                                  ?.defaultSubProcesses?.map(
                                                    (data, i) => {
                                                      const isSelected =
                                                        proc.subProcesses.some(
                                                          (s) =>
                                                            s.subProcessName ===
                                                            data.name
                                                        );
                                                      return (
                                                        <option
                                                          key={i}
                                                          value={data.name}
                                                          disabled={
                                                            isSelected &&
                                                            data.name !==
                                                              sub.subProcessName
                                                          }
                                                        >
                                                          {data.name}
                                                        </option>
                                                      );
                                                    }
                                                  )}
                                              </FormSelect>
                                            </InputGroup>
                                          </Form.Group>
                                        </Col>
                                      </Row>
                                    </AccordionDetails>
                                  </Accordion>
                                </div>
                              </div>
                            ))}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                ))}
            </div>

            <div className="d-flex justify-content-center mt-3">
              <div
                className="admin-pl-sub-process-btn"
                onClick={() =>
                  setProcessList([
                    ...processList,
                    {
                      selectedProcess: "",
                      descriptionData: "",
                      dateTime: "",
                      subProcesses: [],
                    },
                  ])
                }
                style={{ cursor: "pointer" }}
              >
                + Add Process
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="admin-pl-new-service-process-btns">
        <div className="admin-pl-cancel-btn" onClick={backToList}>
          Cancel
        </div>
        <div className="admin-pl-create-btn" onClick={handleSubmit}>
          Create Service Process
        </div>
      </div>
    </div>
  );
};

export default NewServiceProcess;
