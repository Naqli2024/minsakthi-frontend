import { IoArrowBackOutline } from "react-icons/io5";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { RiProgress8Line } from "react-icons/ri";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
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
import { getOrderByOrderId } from "../../../redux/User/BookingSlice";
import {
  generateArrivalOtp,
  initialObservationReport,
  orderExecution,
  scheduleVisit,
  verifyArrivalOtp,
} from "../../../redux/Admin/ServiceSlice";

const StartJob = ({ backToList, orderId }) => {
  const [orderData, setOrderData] = useState([]);
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orderId) return;
    dispatch(getOrderByOrderId(orderId))
      .unwrap()
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => toast.error(error.message));
  }, [dispatch, orderId]);

  const handleGenerateOTP = async () => {
    try {
      await dispatch(generateArrivalOtp({ orderId }))
        .unwrap()
        .then((response) => toast.success(response.message));
    } catch (error) {
      toast.error(error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const payload = {
        otp: otp,
      };

      await dispatch(verifyArrivalOtp({ orderId, payload }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          dispatch(getOrderByOrderId(orderId))
            .unwrap()
            .then((response) => setOrderData(response.data));
        });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleInitialObservation = async () => {
    try {
      const payload = {
        technicianReport: "Completed",
      };

      await dispatch(initialObservationReport({ orderId, payload }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          dispatch(getOrderByOrderId(orderId))
            .unwrap()
            .then((response) => setOrderData(response.data));
        });
    } catch (error) {
      toast.error(error);
    }
  };

  const handleOrderExecution = async (processName) => {
    try {
      const payload = {
        updates: {
          materialProcurement:
            processName === "Material Procurement" && "completed",
          jobExecution: processName === "Job Execution" && "completed",
          workVerified: processName === "Work Verification" && true,
        },
      };

      await dispatch(orderExecution({ orderId, payload }))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          dispatch(getOrderByOrderId(orderId))
            .unwrap()
            .then((response) => setOrderData(response.data));
        });
    } catch (error) {
      toast.error(error);
    }
  };

  const formatDateTime = (date) => {
  const d = new Date(date);
  const formattedDate = d.toLocaleDateString("en-IN");
  const formattedTime = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  return `${formattedDate} - ${formattedTime}`;
};


  return (
    <div className="admin-sop-container">
      <h1 className="admin-sop-header">
        <IoArrowBackOutline
          size={20}
          className="admin-sop-back-btn"
          onClick={backToList}
        />
        Job Management
      </h1>
      <p className="text-muted mt-4">
        Order ID: <span>{orderId}</span>
      </p>
      <Box className="admin-sop-steps-wrapper">
        {orderData.processes
          ?.slice()
          ?.sort((a, b) => a.order - b.order)
          .map((step, index) => {
            const stepCompleted =
              step.subProcesses?.length > 0
                ? step.subProcesses.every((sub) => sub.isCompleted)
                : step.status === "Completed";
            const isLastStep = index === orderData.processes.length - 1;

            return (
              <div key={index} className="admin-sop-step-item">
                {!isLastStep && (
                  <div
                    className={`admin-sop-main-line ${
                      stepCompleted ? "completed" : "pending"
                    }`}
                  />
                )}

                <div
                  className={`admin-sop-main-icon ${
                    stepCompleted ? "completed" : "pending"
                  }`}
                >
                  {stepCompleted ? (
                    <IoIosCheckmarkCircleOutline size={20} />
                  ) : (
                    <RiProgress8Line size={20} />
                  )}
                </div>

                <div className="admin-sop-step-content">
                  <Typography className="admin-sop-step-title">
                    {step.processName}
                  </Typography>
                  <Typography className="admin-sop-step-desc">
                    {step.processDescription}
                  </Typography>

                  {step.subProcesses?.map((sub, sIndex) => {
                    const isLastSub = sIndex === step.subProcesses.length - 1;
                    const materialDone = step.subProcesses.some(
                      (sp) =>
                        sp.name === "Material Procurement" && sp.isCompleted
                    );

                    const jobDone = step.subProcesses.some(
                      (sp) => sp.name === "Job Execution" && sp.isCompleted
                    );

                    return (
                      <div key={sIndex} className="admin-sop-sub-item">
                        {!isLastSub && (
                          <div
                            className={`admin-sop-sub-line ${
                              sub.isCompleted ? "completed" : "pending"
                            }`}
                          />
                        )}
                        <div
                          className={`admin-sop-sub-icon ${
                            sub.isCompleted ? "completed" : "not-completed"
                          }`}
                        >
                          {sub.isCompleted ? (
                            <IoIosCheckmarkCircleOutline />
                          ) : (
                            <RiProgress8Line />
                          )}
                        </div>
                        <Typography>
                          {sub.name}{" "}{sub.completedAt && `[${formatDateTime(sub.completedAt)}]`}
                          {sub.name === "Arrival Confirmation" &&
                            !sub.isVerified && (
                              <span
                                className="technician-job-get-otp-btn"
                                onClick={() => handleGenerateOTP()}
                              >
                                Get OTP
                              </span>
                            )}
                        </Typography>
                        <Typography className="admin-sop-sub-desc">
                          {sub.subProcessDescription}
                        </Typography>
                        {sub.name === "Arrival Confirmation" &&
                          !sub.isVerified && (
                            <div className="mt-2">
                              <FormGroup className="col-md-6">
                                <InputGroup>
                                  <Form.Control
                                    type="number"
                                    placeholder="Enter OTP"
                                    style={{
                                      height: "35px",
                                      boxShadow: "none",
                                    }}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                  />
                                  <InputGroup.Text
                                    onClick={() => handleVerifyOTP()}
                                    style={{
                                      background: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <IoMdCheckmarkCircleOutline
                                      color="#2fb972"
                                      size={16}
                                    />
                                  </InputGroup.Text>
                                </InputGroup>
                              </FormGroup>
                            </div>
                          )}
                        {sub.name === "Initial Observation" &&
                          !sub.isCompleted && (
                            <div className="d-flex align-items-center mt-2">
                              Is Initial Observation Completed?
                              <span
                                className="initial-obs-yes-btn"
                                onClick={() => handleInitialObservation()}
                              >
                                Yes, Completed
                              </span>
                            </div>
                          )}
                        {sub.name === "Material Procurement" &&
                          !sub.isCompleted && (
                            <div className="d-flex align-items-center mt-2">
                              <span
                                className="initial-obs-yes-btn"
                                onClick={() =>
                                  handleOrderExecution("Material Procurement")
                                }
                              >
                                Mark as Completed
                              </span>
                            </div>
                          )}
                        {sub.name === "Job Execution" &&
                          !sub.isCompleted &&
                          materialDone && (
                            <div className="d-flex align-items-center mt-2">
                              <span
                                className="initial-obs-yes-btn"
                                onClick={() =>
                                  handleOrderExecution("Job Execution")
                                }
                              >
                                Mark as Completed
                              </span>
                            </div>
                          )}
                        {sub.name === "Work Verification" &&
                          !sub.isCompleted &&
                          jobDone && (
                            <div className="d-flex align-items-center mt-2">
                              <span
                                className="initial-obs-yes-btn"
                                onClick={() =>
                                  handleOrderExecution("Work Verification")
                                }
                              >
                                Mark as Completed
                              </span>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </Box>
    </div>
  );
};

export default StartJob;
