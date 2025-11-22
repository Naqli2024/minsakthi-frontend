import { IoArrowBackOutline } from "react-icons/io5";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrderByOrderId } from "../../../../redux/User/BookingSlice";
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
import { scheduleVisit } from "../../../../redux/Admin/ServiceSlice";

const ViewServiceSOP = ({ backToList, orderId }) => {
  const [orderData, setOrderData] = useState([]);
  const [scheduleDateTime, setScheduleDateTime] = useState();
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const dispatch = useDispatch();

  const handleChangeDateTime = (e) => {
    const value = e.target.value;
    setScheduleDateTime(value);

    const [date, time] = value.split("T");
    setScheduleDate(date);
    setScheduleTime(time);
  };

  useEffect(() => {
    if (!orderId) return;
    dispatch(getOrderByOrderId(orderId))
      .unwrap()
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => toast.error(error.message));
  }, [dispatch, orderId]);

  const handleScheduleVisit = async () => {
    try {
      const payload = {
        scheduledDate: scheduleDate,
        scheduledTime: scheduleTime,
      };

      await dispatch(scheduleVisit({ orderId, payload }))
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

  return (
    <div className="admin-sop-container">
      <h1 className="admin-sop-header">
        <IoArrowBackOutline
          size={20}
          className="admin-sop-back-btn"
          onClick={backToList}
        />
        Service SOP
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
                        <Typography className="admin-sop-sub-title">
                          {sub.name}{" "}
                          {sub.name === "Schedule Visit" && sub.isCompleted && (
                            <span className="fw-normal">
                              ( {sub.scheduledDate}
                              {" - "}
                              {sub.scheduledTime})
                            </span>
                          )}
                        </Typography>
                        <Typography className="admin-sop-sub-desc">
                          {sub.subProcessDescription}
                        </Typography>
                        {sub.name === "Schedule Visit" && !sub.isCompleted && (
                          <div>
                            <FormGroup className="col-md-6">
                              <InputGroup>
                                <Form.Control
                                  type="datetime-local"
                                  placeholder="Schedule Date & Time"
                                  style={{ height: "35px", boxShadow: "none" }}
                                  value={scheduleDateTime}
                                  onChange={handleChangeDateTime}
                                />
                                <InputGroup.Text
                                  onClick={() => handleScheduleVisit()}
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

export default ViewServiceSOP;
